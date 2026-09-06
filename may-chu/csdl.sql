-- ═══════════════════════════════════════════════════════════════
--  GITA 365 · NỀN DỮ LIỆU MỚI
--
--  SQLite. Chạy y nguyên trên Cloudflare D1 — D1 CHÍNH LÀ SQLite, nên
--  tệp này không phải bản mô phỏng của lược đồ thật, nó LÀ lược đồ
--  thật. Bộ thử ở tools/thu-csdl-moi.js chạy đúng những câu lệnh này
--  trên node:sqlite, không phải trên một bản dựng lại gần giống.
--
--  ── VÌ SAO PHẢI RỜI SHEETS ──
--
--  Đo được ở tools/do-tai-may-chu.js, không phải phỏng đoán:
--
--    · một sổ Sheets chứa 79.033 tài khoản (trần 10 triệu ô)
--    · MỘT lượt gọi có xác thực đọc 50 ô × số tài khoản, vì Store.doc()
--      đọc CẢ TRANG mỗi lần chạm bảng
--    · ở 500.000 tài khoản, một lượt gọi đòi 25 triệu ô — nhiều hơn
--      sức chứa của cả cuốn sổ
--
--  Chỗ chữa không nằm ở việc đọc nhanh hơn. Nó nằm ở chỗ THÔI ĐỌC CẢ
--  BẢNG: mỗi đường tra cứu có một chỉ mục, và mỗi lượt gọi chạm đúng
--  vài dòng nó cần.
--
--  ── LUẬT CỦA TỆP NÀY ──
--
--  1. MỌI ĐƯỜNG TRA CỨU CÓ THẬT TRONG MÃ ĐỀU PHẢI CÓ CHỈ MỤC.
--     Thiếu một cái là SQLite quét cả bảng, và cả lượt chuyển nền này
--     mất sạch ý nghĩa ở đúng đường ấy. Danh sách đường tra cứu đọc từ
--     server/*.gs, không nghĩ ra.
--
--  2. CHỖ NÀO SO CHỮ THƯỜNG THÌ CHỈ MỤC CŨNG PHẢI THEO CHỮ THƯỜNG.
--     Mã cũ so String(x.email).toLowerCase(). Chỉ mục trên cột gốc
--     KHÔNG dùng được cho phép so ấy — SQLite bỏ qua chỉ mục và quét
--     cả bảng, im lặng, đúng cái hại mà chỉ mục sinh ra để tránh.
--
--  3. HỒ SƠ NGƯỜI DÙNG KHÔNG NẰM TRONG BẢNG NÀY.
--     Xem chú giải ở hosoApp.
-- ═══════════════════════════════════════════════════════════════

PRAGMA foreign_keys = ON;

-- ─────────────────────────────────────────────────────────────
--  NGƯỜI DÙNG
--
--  Không xoá dòng bao giờ: nghỉ việc thì đặt deletedAt. Cùng luật với
--  GITA_KHONG_DON của bộ dọn.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  username      TEXT NOT NULL,
  hoTen         TEXT,
  email         TEXT,
  dienThoai     TEXT,
  role          TEXT NOT NULL,
  portal        TEXT,
  studentId     TEXT,
  pwSalt        TEXT,
  pwHash        TEXT,
  active        INTEGER NOT NULL DEFAULT 1,
  createdAt     TEXT,
  updatedAt     TEXT,
  deletedAt     TEXT,
  maKhachHang   TEXT,
  boTro         TEXT,
  mustChangePw  INTEGER NOT NULL DEFAULT 0,
  pwDoiLuc      TEXT
);

-- Đăng nhập tra bằng tên đăng nhập HOẶC email, cả hai đều hạ chữ
-- thường trước khi so. Chỉ mục phải hạ y hệt — xem luật 2 ở đầu tệp.
CREATE UNIQUE INDEX IF NOT EXISTS ix_users_username ON users (lower(username));
CREATE INDEX        IF NOT EXISTS ix_users_email    ON users (lower(email));

-- Mã khách hàng. MỘT PHẦN, vì phần lớn tài khoản nội bộ không có mã và
-- chỉ mục một phần thì không phải mang theo hàng trăm nghìn dòng trống.
--
-- Và DUY NHẤT, không chỉ để tra cho nhanh. Mã số khách hàng là thứ việc
-- nâng tầng dùng để dò phiếu thanh toán, nên hai nhà chung một mã là
-- tiền nhà này mở tầng cho nhà kia. Bộ đếm ở maKhachHangMoi() đã lo
-- chuyện sinh mã không trùng; chỉ mục này là lớp chặn thứ hai, ở tầng
-- dữ liệu, cho ngày bộ đếm sai vì một lý do chưa ai nghĩ ra.
CREATE UNIQUE INDEX IF NOT EXISTS ix_users_makh ON users (maKhachHang)
  WHERE maKhachHang IS NOT NULL AND maKhachHang <> '';

-- ─────────────────────────────────────────────────────────────
--  HỌC VIÊN
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id          TEXT PRIMARY KEY,
  hoTen       TEXT,
  lop         TEXT,
  tinh        TEXT,
  tier        INTEGER,
  status      TEXT,
  kpi         REAL,
  phuHuynhId  TEXT,
  coach       TEXT,
  createdAt   TEXT,
  deletedAt   TEXT
);

-- Mỗi lượt gọi có xác thực đều tra tầng của học viên gắn với tài khoản.
CREATE INDEX IF NOT EXISTS ix_students_ph   ON students (phuHuynhId);
-- Màn quyền-xem-khách lọc theo tầng và bỏ hồ sơ đã xoá.
CREATE INDEX IF NOT EXISTS ix_students_tier ON students (tier) WHERE deletedAt IS NULL;

-- ─────────────────────────────────────────────────────────────
--  PHIÊN
--
--  Bảng NÓNG NHẤT của cả hệ: mọi yêu cầu có xác thực đều tra nó đúng
--  một lần, theo token. Token là khoá chính nên phép tra ấy là một
--  lượt tìm trên cây, không phụ thuộc số dòng.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id         TEXT PRIMARY KEY,          -- chính là token
  uid        TEXT NOT NULL,
  username   TEXT,
  role       TEXT,
  portal     TEXT,
  studentId  TEXT,
  exp        INTEGER NOT NULL,
  createdAt  TEXT
);

-- Đổi mật khẩu thì ĐÁ mọi phiên khác của cùng người — kẻ giữ token cũ
-- mất quyền ngay. Không có chỉ mục này thì mỗi lần đổi mật khẩu là một
-- lượt quét cả bảng phiên.
CREATE INDEX IF NOT EXISTS ix_sessions_uid ON sessions (uid);
-- Bộ dọn tìm phiên đã quá hạn.
CREATE INDEX IF NOT EXISTS ix_sessions_exp ON sessions (exp);

-- ─────────────────────────────────────────────────────────────
--  ĐĂNG KÝ CHỜ
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dangKyCho (
  id             TEXT PRIMARY KEY,
  email          TEXT,
  hoTen          TEXT,
  dienThoai      TEXT,
  tenCon         TEXT,
  lop            TEXT,
  tinh           TEXT,
  maGioiThieu    TEXT,
  otpSalt        TEXT,
  otpHash        TEXT,
  otpHan         INTEGER,
  otpSai         INTEGER DEFAULT 0,
  tokenKichHoat  TEXT,
  tokenHan       INTEGER,
  trangThai      TEXT,
  createdAt      TEXT
);

CREATE INDEX IF NOT EXISTS ix_dkc_email ON dangKyCho (lower(email), trangThai);
-- CHỈ MỤC ĐẦY ĐỦ, KHÔNG PHẢI CHỈ MỤC MỘT PHẦN.
--
-- Bản đầu tôi viết  ... WHERE tokenKichHoat IS NOT NULL AND tokenKichHoat <> ''
-- cho gọn. SQLite chỉ dùng một chỉ mục một phần khi nó CHỨNG MINH ĐƯỢC
-- câu truy vấn nằm trọn trong điều kiện của chỉ mục. Câu thật hỏi
-- tokenKichHoat = ? — mà tham số ấy có thể là chuỗi rỗng, nên SQLite
-- không chứng minh được vế <> '' và BỎ QUA chỉ mục.
--
-- Nó không báo lỗi. Nó quét cả bảng, im lặng — đúng cái hại mà chỉ mục
-- sinh ra để tránh, ở đúng chỗ vừa dựng ra để tránh. Phép soi EXPLAIN
-- QUERY PLAN ở tools/thu-csdl-moi.js bắt được ngay lần chạy đầu.
--
-- dangKyCho giữ 30 ngày nên bảng nhỏ; một chỉ mục đầy đủ ở đây gần như
-- không tốn gì, còn một chỉ mục "tiết kiệm" mà không ai dùng thì tốn
-- đúng bằng cả bảng.
CREATE INDEX IF NOT EXISTS ix_dkc_token ON dangKyCho (tokenKichHoat, trangThai);
CREATE INDEX IF NOT EXISTS ix_dkc_tao   ON dangKyCho (createdAt);

-- ─────────────────────────────────────────────────────────────
--  NHẬT KÝ
--
--  Chỉ ghi, gần như không đọc — trừ lúc dọn và lúc đi tra một sự cố.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit (
  id        TEXT PRIMARY KEY,
  luc       TEXT,
  uid       TEXT,
  username  TEXT,
  viec      TEXT,
  doiTuong  TEXT,
  chiTiet   TEXT
);

CREATE INDEX IF NOT EXISTS ix_audit_luc ON audit (luc);
CREATE INDEX IF NOT EXISTS ix_audit_uid ON audit (uid, luc);

-- ─────────────────────────────────────────────────────────────
--  HỒ SƠ NGƯỜI DÙNG — CHỈ GIỮ PHẦN TRA CỨU, KHÔNG GIỮ RUỘT
--
--  Ruột hồ sơ (duLieu) là một khối JSON cộng dồn theo thời gian, trần
--  đẩy lên 512 KB mỗi lượt (GITA_TRAN_DONGBO_KB).
--
--  MỘT LỖI CỦA NỀN CŨ, GHI LẠI ĐỂ KHÔNG MANG THEO: Sheets chỉ nhận
--  50.000 KÝ TỰ MỖI Ô, mà nền cũ nhét cả khối JSON ấy vào một ô. Hồ sơ
--  quá 50.000 ký tự là chạm trần của Sheets trong khi mã vẫn tin trần
--  là 512 KB — hai con số lệch nhau hơn mười lần, và chỗ hỏng rơi vào
--  đúng những người dùng LÂU NHẤT.
--
--  Nên ruột đi ra kho tệp (R2), bảng này chỉ giữ chỗ trỏ và kích cỡ.
--  Nửa triệu hồ sơ × 50 KB là 25 GB — quá sức một cơ sở dữ liệu D1
--  (trần 10 GB), vừa vặn với kho tệp (10 GB đầu miễn phí).
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hosoApp (
  id       TEXT PRIMARY KEY,
  uid      TEXT NOT NULL,
  u        TEXT,
  role     TEXT,
  khoaTep  TEXT NOT NULL,      -- chỗ trỏ tới ruột trong kho tệp
  coByte   INTEGER DEFAULT 0,  -- cỡ ruột, để soi người lưu quá nhiều
  moc      TEXT,
  taoLuc   TEXT,
  suaLuc   TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS ix_hosoapp_uid ON hosoApp (uid);

CREATE TABLE IF NOT EXISTS hosoAppSaoLuu (
  id       TEXT PRIMARY KEY,
  uid      TEXT NOT NULL,
  khoaTep  TEXT NOT NULL,
  coByte   INTEGER DEFAULT 0,
  luc      TEXT
);

-- Giữ mười bản gần nhất MỖI NGƯỜI (GITA_HAN). Chỉ mục xếp sẵn theo
-- người rồi theo thời gian giảm dần, nên phép "lấy mười bản mới nhất
-- của người này" đọc đúng mười dòng.
CREATE INDEX IF NOT EXISTS ix_hososlu_uid ON hosoAppSaoLuu (uid, luc DESC);

-- ─────────────────────────────────────────────────────────────
--  CHỨNG TỪ THANH TOÁN — KHÔNG XOÁ, KHÔNG BAO GIỜ
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS thanhToan (
  id             TEXT PRIMARY KEY,
  maKhachHang    TEXT,
  tier           INTEGER,
  soTien         REAL,
  trangThai      TEXT,
  nguoiDuyet     TEXT,
  luc            TEXT,
  ghiChu         TEXT,
  daDung         INTEGER DEFAULT 0,
  dungChoHocVien TEXT,
  dungLuc        TEXT
);

-- Nâng tầng tra đúng bộ ba mã khách × tầng × trạng thái.
CREATE INDEX IF NOT EXISTS ix_tt_makh ON thanhToan (maKhachHang, tier, trangThai);

-- ─────────────────────────────────────────────────────────────
--  SỔ TÀI LIỆU
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tailieu (
  id         TEXT PRIMARY KEY,
  ten        TEXT,
  loai       TEXT,
  tang       TEXT,
  moTa       TEXT,
  driveId    TEXT,
  tenTep     TEXT,
  nguoiGui   TEXT,
  vaiGui     TEXT,
  luc        TEXT,
  trangThai  TEXT,
  nguoiDuyet TEXT,
  lucDuyet   TEXT,
  lyDo       TEXT
);

CREATE INDEX IF NOT EXISTS ix_tailieu_tt ON tailieu (trangThai, luc);

-- ─────────────────────────────────────────────────────────────
--  ĐẾM CỘNG ĐỒNG
--
--  Bốn sổ đếm của bảng tin. Nền cũ để chúng trong Script Properties.
--  Ở đây là một bảng khoá–giá trị, vì con số cộng đồng phải cộng được
--  bằng một câu lệnh chứ không phải đọc–sửa–ghi ba lượt.
-- ─────────────────────────────────────────────────────────────
-- ─────────────────────────────────────────────────────────────
--  CÀI ĐẶT CỦA CHỦ HỆ — BỐ CỤC, CHỮ HIỂN THỊ, PHÂN QUYỀN, HỒ SƠ CA
--
--  Bảy cụm dùng chung cho cả hệ, đồng bộ theo CẢ CỤM: ai sửa sau thì
--  bản đó thắng. Không gộp theo từng trường như hồ sơ cá nhân, vì đây
--  là bố cục và luật — nửa bố cục cũ ghép nửa bố cục mới thì ra một bố
--  cục chưa ai từng thiết kế.
--
--  MỘT TRẦN CỦA NỀN CŨ BỎ ĐƯỢC Ở ĐÂY: Script Properties chỉ nhận 9 KB
--  MỖI GIÁ TRỊ, nên cụm hồ sơ ca — thứ cộng dồn theo thời gian — chắc
--  chắn vượt sớm, và nền cũ phải tách mỗi cụm một khoá riêng rồi vẫn
--  phải từ chối cụm quá lớn. SQLite không có trần ấy.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS caiDat (
  cum  TEXT PRIMARY KEY,      -- sapxep · noidung · phanquyen · khothem · xinthem · ca · tainguyen
  du   TEXT NOT NULL,         -- khối JSON của cụm
  luc  INTEGER NOT NULL,      -- mốc mili-giây của bản đang giữ
  boi  TEXT                   -- ai ghi bản này
);

-- ─────────────────────────────────────────────────────────────
--  CHỨNG CỨ HOA HỒNG — BẢNG DUY NHẤT RA TIỀN THẬT
--
--  Mọi thứ khác sai thì sửa; chỗ này sai thì kết thúc ở toà chứ không
--  kết thúc ở một bản vá. Nên bảng này khắt khe hơn mọi bảng còn lại.
--
--  CHỈ THÊM DÒNG, KHÔNG SỬA DÒNG CŨ. Hai cột xacNhanBoi/xacNhanLuc là
--  ngoại lệ DUY NHẤT, và chúng chỉ ghi được một lần — xem chú giải ở
--  xacNhanChungCu trong may-chu/chung-cu.js.
--
--  SAI THÌ GHI BẢN ĐÍNH CHÍNH TRỎ VỀ BẢN CŨ, cả hai cùng ở lại. Xoá
--  bản sai là xoá luôn bằng chứng rằng đã từng có bản sai — đúng thứ
--  bên đối tụng sẽ hỏi.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chungCu (
  ma           TEXT PRIMARY KEY,
  nhiemVu      TEXT NOT NULL,
  ngayLam      TEXT NOT NULL,
  loai         TEXT NOT NULL,
  noiDung      TEXT NOT NULL,
  nguoiGhi     TEXT NOT NULL,     -- lấy từ PHIÊN, không lấy từ thân yêu cầu
  gioMayChu    TEXT NOT NULL,     -- giờ MÁY CHỦ; giờ máy khách không phải bằng chứng
  chuKy        TEXT NOT NULL,     -- HMAC-SHA256; khoá nằm ở secret, không ở đây
  xacNhanBoi   TEXT,
  xacNhanLuc   TEXT,
  dinhChinhCho TEXT,
  uidGhi       TEXT
);

-- Sổ chứng cứ của một người, và chuỗi đính chính của một bản.
CREATE INDEX IF NOT EXISTS ix_cc_nguoi ON chungCu (nguoiGhi, gioMayChu DESC);
CREATE INDEX IF NOT EXISTS ix_cc_dinhchinh ON chungCu (dinhChinhCho)
  WHERE dinhChinhCho IS NOT NULL;

-- ─────────────────────────────────────────────────────────────
--  GIẤY PHÉP XEM HỒ SƠ KHÁCH HÀNG
--
--  Hồ sơ khách tầng 4-5 KHÔNG nằm trong gói nào gửi về máy. Một gói đã
--  cấp thì không gọi ngược về được — gỡ giấy phép hôm nay không xoá
--  được bản sao nằm trong máy người ta từ hôm qua. Nên hồ sơ thật đi
--  qua MỘT cửa hỏi máy chủ, và cửa ấy đọc bảng này mỗi lượt.
--
--  THU HỒI LÀ ĐÁNH DẤU, KHÔNG XOÁ DÒNG. Xoá là xoá luôn bằng chứng đã
--  từng cấp — đúng thứ cần trả lời khi có chuyện.
--
--  HẾT HẠN THÌ TỰ TẮT. Một quyền chỉ mất khi có người chủ động gỡ là
--  một quyền sẽ ở lại mãi.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quyenXem (
  id            TEXT PRIMARY KEY,
  nguoiDuocCap  TEXT NOT NULL,      -- tên đăng nhập, đã hạ chữ thường
  vai           TEXT NOT NULL,      -- vai lúc cấp; lúc DÙNG vẫn đọc lại vai thật
  tangDuocXem   TEXT NOT NULL,      -- 'T4,T5'
  nguoiCap      TEXT,
  capLuc        TEXT,
  hetHan        TEXT,               -- ISO; bắt buộc, không có giấy phép vô hạn
  thuHoiLuc     TEXT,
  thuHoiBoi     TEXT,
  lyDo          TEXT
);

-- Tra giấy phép CÒN HIỆU LỰC của một người: lọc theo tên, rồi bỏ dòng
-- đã thu hồi và dòng đã hết hạn. Chỉ mục theo tên là đủ — một người có
-- rất ít dòng, kể cả sau nhiều năm cấp rồi thu hồi.
CREATE INDEX IF NOT EXISTS ix_qx_nguoi ON quyenXem (nguoiDuocCap, capLuc DESC);

-- ─────────────────────────────────────────────────────────────
--  MÃ LẤY LẠI MẬT KHẨU
--
--  Nền cũ giữ mã này trong CacheService của Apps Script. Worker không
--  có thứ ấy, và đây cũng không phải chỗ nên giữ trong bộ nhớ tạm: mã
--  lấy lại mật khẩu là thứ mở được một tài khoản, nên nó cần đúng cùng
--  một sổ với mọi thứ khác — kể cả để đếm số lần nhập sai cho đúng khi
--  Worker chạy ở hàng trăm nơi cùng lúc.
--
--  MỘT TÀI KHOẢN CHỈ CÓ MỘT MÃ SỐNG. Khoá chính là uid, nên xin mã mới
--  là mã cũ chết ngay — không để lại một chuỗi mã cùng sống mà chỉ cần
--  đoán trúng một cái là đủ.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS maLayLai (
  uid    TEXT PRIMARY KEY,
  muoi   TEXT NOT NULL,
  bam    TEXT NOT NULL,
  hetHan INTEGER NOT NULL,
  sai    INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS ix_malaylai_han ON maLayLai (hetHan);

-- ─────────────────────────────────────────────────────────────
--  CHẶN NHỊP — ĐẾM SỐ LẦN THỬ TRONG MỘT KHOẢNG THỜI GIAN
--
--  Nền cũ đếm bằng CacheService của Apps Script. Worker không có thứ
--  ấy, và đây KHÔNG phải chỗ được phép bỏ bớt khi chuyển nền: ba chỗ
--  chặn nhịp đang có đều là chặn thật, mất cái nào cũng là mở đúng một
--  cánh cửa —
--
--    · đoán mật khẩu liên tiếp thì khoá 15 phút
--    · một email không nhận quá ba thư đăng ký mỗi giờ
--    · một tài khoản không rút khoá kho quá N lượt mỗi giờ
--
--  Đếm trong cơ sở dữ liệu thì con số ĐÚNG cho mọi lượt chạy cùng lúc.
--  Bộ nhớ tạm của từng máy chủ thì mỗi máy đếm một kiểu, và kẻ đoán mật
--  khẩu chỉ cần rải đều các lượt thử là không máy nào thấy đủ số.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chanNhip (
  khoa   TEXT PRIMARY KEY,          -- loại · đối tượng, ví dụ 'dangNhapSai·admin@gita365'
  dem    INTEGER NOT NULL DEFAULT 0,
  hetHan INTEGER NOT NULL           -- mốc mili-giây; qua mốc thì đếm lại từ đầu
);

CREATE INDEX IF NOT EXISTS ix_chan_han ON chanNhip (hetHan);

CREATE TABLE IF NOT EXISTS soDem (
  khoa   TEXT PRIMARY KEY,
  gia    INTEGER NOT NULL DEFAULT 0,
  suaLuc TEXT
);
