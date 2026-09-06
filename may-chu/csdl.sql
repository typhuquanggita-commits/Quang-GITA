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

-- ═════════════════════════════════════════════════════════════
--  TỆP KHÁCH HÀNG CHUẨN
--
--  Tới bản 9.87, dữ liệu một nhà nằm rải ở bốn chỗ: tài khoản phụ
--  huynh ở users, hồ sơ con ở students, ruột hồ sơ ở kho tệp, và lượt
--  đăng ký ở dangKyCho. Không chỗ nào trả lời được câu đơn giản nhất
--  của người làm nghề: "nhà này vào từ bao giờ, ai tư vấn, ai kèm,
--  đang ở tầng mấy, đã đóng tới đâu, còn nợ gì".
--
--  Bảng này là chỗ trả lời. MỘT DÒNG MỘT NHÀ, khoá là mã khách hàng —
--  cùng cái mã mà phiếu thu và hoa hồng đều trỏ vào, nên ba sổ nối
--  được với nhau mà không phải đoán.
--
--  KHÔNG CHÉP LẠI THỨ ĐÃ CÓ. Tên phụ huynh nằm ở users, tên con nằm ở
--  students; ở đây chỉ giữ CHỖ TRỎ. Chép lại là dựng bản thứ hai của
--  một sự thật, và hai bản thì sẽ có ngày lệch nhau.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS hoSoKhach (
  maKhachHang TEXT PRIMARY KEY,
  uidPhuHuynh TEXT NOT NULL,      -- trỏ users.id
  maHocVien   TEXT,               -- trỏ students.id
  tuyen       TEXT NOT NULL DEFAULT 'GITA365',
  tang        INTEGER NOT NULL DEFAULT 0,
  band        TEXT,               -- XANH · VANG · DO · XAM, theo G.MT_BANG
  coach       TEXT,               -- tên đăng nhập người kèm
  tuVan       TEXT,               -- tên đăng nhập người tư vấn
  boTro       TEXT,               -- mã nhà giới thiệu — gốc của hoa hồng
  trangThai   TEXT NOT NULL DEFAULT 'dangHoc',  -- dangHoc · tamDung · nghi · xong
  vaoLuc      TEXT,
  suaLuc      TEXT,
  ghiChu      TEXT
);

CREATE INDEX IF NOT EXISTS ix_hsk_ph    ON hoSoKhach (uidPhuHuynh);
CREATE INDEX IF NOT EXISTS ix_hsk_coach ON hoSoKhach (coach, tang);
CREATE INDEX IF NOT EXISTS ix_hsk_tuvan ON hoSoKhach (tuVan, trangThai);
-- Hoa hồng đi ngược từ nhà được kèm về nhà bảo trợ, nên đường ấy phải
-- tra được. MỘT PHẦN, vì phần lớn nhà không có ai bảo trợ.
CREATE INDEX IF NOT EXISTS ix_hsk_botro ON hoSoKhach (boTro)
  WHERE boTro IS NOT NULL AND boTro <> '';

-- Mỗi lần đổi tầng một dòng. Không sửa cột tang rồi thôi: câu "nhà này
-- lên tầng ba lúc nào, ai duyệt, KPI bao nhiêu" là câu người làm nghề
-- hỏi hằng tuần, và nó chỉ trả lời được nếu hôm ấy đã ghi.
CREATE TABLE IF NOT EXISTS lichSuTang (
  id          TEXT PRIMARY KEY,
  maKhachHang TEXT NOT NULL,
  tuTang      INTEGER,
  denTang     INTEGER NOT NULL,
  kpi         REAL,
  boi         TEXT,
  luc         TEXT NOT NULL,
  lyDo        TEXT
);

CREATE INDEX IF NOT EXISTS ix_lst_nha ON lichSuTang (maKhachHang, luc DESC);

-- ═════════════════════════════════════════════════════════════
--  TÀI CHÍNH — PHẢI THU TÁCH KHỎI ĐÃ THU
--
--  ĐÂY LÀ CHỖ NỀN CŨ KHÔNG DIỄN TẢ ĐƯỢC.
--
--  Bảng thanhToan cũ có MỘT dòng cho mỗi (nhà × tầng), với trangThai
--  'daXacNhan'. Tức là nó chỉ nói được "tầng này đã trả tiền hay
--  chưa" — một câu đúng/sai.
--
--  Nhưng chính bảng học phí của Học viện khai nhịp thu KHÁC hẳn:
--
--    T1  thu một lần
--    T2  một lần, hoặc HAI kỳ (trước ngày 1, trước ngày 11)
--    T3  BA kỳ — trước ngày 1, ngày 43, ngày 64
--    T4  BỐN kỳ theo quý, "không thu trước cho cả năm"
--    T5  bốn kỳ như T4
--
--  Với một dòng đúng/sai thì một nhà tầng bốn đóng xong kỳ MỘT đã được
--  tính là "đã thanh toán tầng bốn" — và ba kỳ còn lại biến mất khỏi
--  sổ. Không phải sai một con số; là không có chỗ để ghi con số ấy.
--
--  Nên tách hai bảng:
--    kyThu    — PHẢI THU: mỗi kỳ một dòng, sinh ra lúc vào tầng
--    phieuThu — ĐÃ THU: mỗi lần nhận tiền một dòng, trỏ về một kỳ
--
--  Công nợ = kyThu chưa đủ phieuThu. Không tách thì không có phép trừ
--  ấy, và "còn nợ bao nhiêu" là câu không trả lời được bằng dữ liệu.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS kyThu (
  id          TEXT PRIMARY KEY,
  maKhachHang TEXT NOT NULL,
  tang        INTEGER NOT NULL,
  ky          INTEGER NOT NULL,    -- 1, 2, 3, 4
  soKy        INTEGER NOT NULL,    -- tổng số kỳ của tầng này
  ngayThu     INTEGER NOT NULL,    -- ngày thứ mấy của tầng thì tới kỳ
  phaiThu     REAL NOT NULL,
  hanLuc      TEXT,                -- mốc thật, tính từ ngày vào tầng
  congTruoc   TEXT,                -- kỳ này chỉ thu khi cổng nào đã nghiệm thu
  taoLuc      TEXT NOT NULL
);

-- Một nhà một tầng một kỳ — đúng một dòng. Sinh lịch hai lần là nhân
-- đôi công nợ của một nhà, và không ai nhìn ra cho tới lúc đối chiếu.
CREATE UNIQUE INDEX IF NOT EXISTS ix_kythu_mot ON kyThu (maKhachHang, tang, ky);
CREATE INDEX IF NOT EXISTS ix_kythu_han ON kyThu (hanLuc);

CREATE TABLE IF NOT EXISTS phieuThu (
  id          TEXT PRIMARY KEY,
  maKhachHang TEXT NOT NULL,
  idKy        TEXT,                -- trỏ kyThu.id; để trống là khoản thu ngoài lịch
  soTien      REAL NOT NULL,
  hinhThuc    TEXT NOT NULL,       -- chuyenKhoan · tienMat · the
  maThamChieu TEXT,                -- số giao dịch ngân hàng
  minhChung   TEXT,                -- mã tệp trên Drive
  nguoiGhi    TEXT NOT NULL,
  ghiLuc      TEXT NOT NULL,
  nguoiDuyet  TEXT,                -- NGƯỜI KHÁC người ghi — xem chú giải ở tai-chinh.js
  duyetLuc    TEXT,
  trangThai   TEXT NOT NULL DEFAULT 'choDuyet',  -- choDuyet · daDuyet · tuChoi
  lyDo        TEXT,
  ghiChu      TEXT
);

CREATE INDEX IF NOT EXISTS ix_pt_nha ON phieuThu (maKhachHang, ghiLuc DESC);
CREATE INDEX IF NOT EXISTS ix_pt_ky  ON phieuThu (idKy, trangThai);
CREATE INDEX IF NOT EXISTS ix_pt_tt  ON phieuThu (trangThai, ghiLuc);

-- Hoàn tiền. Mỗi tầng có luật hoàn riêng, khai ở HP_TANG[].hoan; luật
-- ấy là CHỮ, không phải công thức, nên số tiền hoàn do người quyết và
-- bảng này ghi lại AI quyết, THEO LUẬT NÀO. Máy không tự tính hoàn.
CREATE TABLE IF NOT EXISTS hoanTien (
  id          TEXT PRIMARY KEY,
  maKhachHang TEXT NOT NULL,
  idPhieuThu  TEXT,
  soTien      REAL NOT NULL,
  theoLuat    TEXT NOT NULL,       -- nguyên văn luật hoàn của tầng ấy
  lyDo        TEXT NOT NULL,
  nguoiDeXuat TEXT NOT NULL,
  nguoiDuyet  TEXT,
  deXuatLuc   TEXT NOT NULL,
  duyetLuc    TEXT,
  trangThai   TEXT NOT NULL DEFAULT 'choDuyet'
);

CREATE INDEX IF NOT EXISTS ix_ht_nha ON hoanTien (maKhachHang, deXuatLuc DESC);
CREATE INDEX IF NOT EXISTS ix_ht_tt  ON hoanTien (trangThai);

-- Hoa hồng PHẢI TRẢ. Sinh ra khi nhà được kèm vượt tầng và hai KPI đủ
-- điều kiện; trả ra là một lượt chi riêng, có người duyệt.
CREATE TABLE IF NOT EXISTS hoaHongTra (
  id           TEXT PRIMARY KEY,
  nhaKem       TEXT NOT NULL,      -- mã nhà được hưởng
  nhaDuocKem   TEXT NOT NULL,
  tangVuot     INTEGER NOT NULL,
  bac          TEXT NOT NULL,      -- B5 · B10, theo G.HH_BAC
  phanTram     REAL NOT NULL,
  goiCanCu     REAL NOT NULL,      -- giá gói của nhà ĐƯỢC KÈM
  soTien       REAL NOT NULL,
  kpiNhaKem    REAL,
  kpiNhaDuocKem REAL,
  maChungCu    TEXT,               -- trỏ chungCu.ma
  trangThai    TEXT NOT NULL DEFAULT 'phaiTra',  -- phaiTra · daTra · huy
  sinhLuc      TEXT NOT NULL,
  traLuc       TEXT,
  -- Huỷ PHẢI có mốc, không chỉ có trạng thái. Sổ hoa hồng cân theo kỳ
  -- bằng đẳng thức "đầu kỳ + sinh − trả − huỷ = cuối kỳ"; không biết
  -- khoản ấy huỷ NGÀY NÀO thì không xếp được nó vào kỳ nào, và đẳng
  -- thức không bao giờ cân. Ba trạng thái, ba mốc — thiếu một là thiếu
  -- một chiều của sổ.
  huyLuc       TEXT,
  nguoiDuyet   TEXT,
  lyDo         TEXT
);

-- Một lượt vượt tầng của một nhà sinh ĐÚNG MỘT khoản hoa hồng cho nhà
-- kèm. Không có chỉ mục duy nhất này thì bấm hai lần là trả hai lần.
CREATE UNIQUE INDEX IF NOT EXISTS ix_hh_mot
  ON hoaHongTra (nhaKem, nhaDuocKem, tangVuot);
CREATE INDEX IF NOT EXISTS ix_hh_tt ON hoaHongTra (trangThai, sinhLuc);

-- ═════════════════════════════════════════════════════════════
--  SỔ CHI — NỬA CÒN LẠI CỦA CUỐN SỔ
--
--  Tới bản 9.90 hệ này chỉ có tiền VÀO. Bản kê kế toán phải ghi thẳng
--  ra rằng nó không cộng được một dòng lợi nhuận nào, vì chi phí vận
--  hành không nằm ở đâu cả.
--
--  Một cuốn sổ chỉ có một nửa thì mọi câu hỏi thật đều không trả lời
--  được: tháng này lãi hay lỗ, tầng nào nuôi được chính nó, thêm một
--  Coach thì hoà vốn ở bao nhiêu nhà. Ba câu ấy là ba câu quyết định
--  chiến lược, và không câu nào trả lời được bằng doanh thu.
--
--  HOÁ ĐƠN có hay không là một cột RIÊNG, không phải một ghi chú. Khoản
--  chi không có hoá đơn vẫn là tiền đã ra thật — vẫn phải vào sổ chi —
--  nhưng nó đứng khác khi tính thuế. Gộp hai loại vào một con số là
--  buộc kế toán mở lại cơ sở dữ liệu để tách ra, và lúc ấy bản kê vô
--  dụng.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS chiPhi (
  id          TEXT PRIMARY KEY,
  khoanMuc    TEXT NOT NULL,      -- danh sách trắng, khai ở chi-tieu.js
  soTien      REAL NOT NULL,
  ngayChi     TEXT NOT NULL,      -- mốc TIỀN RA, không phải mốc nhập liệu
  hinhThuc    TEXT NOT NULL,      -- chuyenKhoan · tienMat · the
  nhaCungCap  TEXT,
  coHoaDon    INTEGER NOT NULL DEFAULT 0,
  maHoaDon    TEXT,
  minhChung   TEXT,
  dienGiai    TEXT NOT NULL,
  nguoiDeXuat TEXT NOT NULL,
  deXuatLuc   TEXT NOT NULL,
  nguoiDuyet  TEXT,               -- NGƯỜI KHÁC người đề xuất
  duyetLuc    TEXT,
  -- Nấc trên cùng đòi HAI chữ ký, không phải một chữ ký cao hơn. Tầng
  -- tài chính của Học viện chỉ có ba vai (R01–R03), nên leo cấp bên
  -- trong ba vai ấy không thêm được lớp nào thật; thêm một người thì có.
  nguoiDuyet2 TEXT,
  duyetLuc2   TEXT,
  -- BA ô chữ ký, không phải hai. Hai thang chồng lên nhau: nấc của
  -- KHOẢN đòi tối đa 2 chữ ký, mốc của CHU KỲ đòi thêm 1. Một khoản 60
  -- triệu trong một tuần đã chi 100 triệu cần đủ ba.
  --
  -- Bản đầu tôi chỉ dựng hai ô, và cổng ghi chữ ký thứ hai lại đòi ô
  -- thứ nhất còn trống — nên chữ ký thứ hai của một khoản cần ba ô
  -- không ghi được vào đâu cả, và khoản ấy đứng im mãi. Bộ thử bắt
  -- được ngay ở phép đo "người thứ hai ký thì khoản mới vào sổ".
  nguoiDuyet3 TEXT,
  duyetLuc3   TEXT,
  nac         TEXT,               -- N1…N5, nấc THẬT đã áp (gồm cả gộp 7 ngày)
  baoGia      TEXT,               -- danh sách báo giá, JSON
  soBaoGia    INTEGER NOT NULL DEFAULT 0,
  soHopDong   TEXT,
  trangThai   TEXT NOT NULL DEFAULT 'choDuyet',  -- choDuyet · daDuyet · tuChoi · huy
  -- Khoản đi LỐI TỰ GHI: dưới ngưỡng phải-xin-duyệt, một người ghi
  -- thẳng vào sổ. Phải đánh dấu thành CỘT chứ không lẫn vào ghi chú:
  -- câu đầu tiên người đi kiểm tra hỏi là "khoản nào có hai người ký,
  -- khoản nào chỉ một" — và câu ấy phải trả lời được bằng phép lọc.
  tuGhi       INTEGER NOT NULL DEFAULT 0,
  huyLuc      TEXT,
  lyDo        TEXT
);

CREATE INDEX IF NOT EXISTS ix_cp_ngay ON chiPhi (ngayChi DESC);
CREATE INDEX IF NOT EXISTS ix_cp_tt   ON chiPhi (trangThai, ngayChi);
CREATE INDEX IF NOT EXISTS ix_cp_muc  ON chiPhi (khoanMuc, ngayChi);
-- Phép soi chia nhỏ cộng dồn theo (khoản mục × người đề xuất) trong
-- một cửa sổ bảy ngày. Không có chỉ mục này thì mỗi lượt ghi một khoản
-- chi lặt vặt là một lượt quét cả bảng chi phí.
CREATE INDEX IF NOT EXISTS ix_cp_gop  ON chiPhi (khoanMuc, nguoiDeXuat, ngayChi);
-- Trần chu kỳ cộng MỌI khoản mục của MỘT người, nên nó không dùng được
-- ix_cp_gop ở trên: cột dẫn đầu của chỉ mục ấy là khoanMuc, mà câu này
-- không lọc theo khoanMuc. Phép tính này chạy ở MỖI lượt ghi một khoản
-- chi, nên nó đáng có đường riêng.
CREATE INDEX IF NOT EXISTS ix_cp_nguoi ON chiPhi (nguoiDeXuat, ngayChi);

-- ═════════════════════════════════════════════════════════════
--  QUYỀN TÀI CHÍNH — VÌ SAO LÀ QUYỀN ĐƯỢC CẤP, KHÔNG PHẢI MỘT VAI MỚI
--
--  Chủ hệ thống chốt bản 9.97: khoản dưới 1,5 triệu do BỘ PHẬN KẾ TOÁN
--  nhận báo cáo và phê duyệt; và quyền quản lý dòng tiền lớn có thể
--  CHUYỂN CHO KẾ TOÁN TRƯỞNG khi Super Admin hoặc Admin hệ thống cấp
--  quyền.
--
--  Nhưng bảng vai của Học viện (G.ROLES, R01–R15) KHÔNG CÓ vai kế toán
--  nào cả. Quyền tài chính hiện dừng ở R01 Super Admin, R02 Admin hệ
--  thống, R03 Giám đốc.
--
--  Chèn hai vai mới vào giữa bảng ấy là đánh số lại cả thang: mọi cổng
--  trong hệ neo vào lv, từ trần xem hồ sơ khách tới bậc mở kho nghề.
--  Một lượt chèn là một lượt dịch hàng chục chỗ chặn, và chỗ nào quên
--  thì im lặng mở ra.
--
--  Nên kế toán và kế toán trưởng là CHỨC NĂNG ĐƯỢC CẤP, chồng lên vai
--  đang có. Đó cũng đúng chữ chủ hệ dùng: "cấp quyền cho kế toán
--  trưởng" — cấp quyền, không phải đổi vai.
--
--  HẠN MỨC LÀ MỘT MỐC CÓ TÊN, không phải một con số tự do. Cấp bằng số
--  tự do thì sáu tháng sau có bảy hạn mức khác nhau không ai giải thích
--  được; cấp bằng mốc thì mỗi lượt cấp là một câu trả lời cho câu hỏi
--  "người này đứng ở nấc nào".
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS quyenTaiChinh (
  id         TEXT PRIMARY KEY,
  username   TEXT NOT NULL,
  chucNang   TEXT NOT NULL,      -- keToan · keToanTruong
  mocToiDa   TEXT,               -- C1…C6, chỉ có nghĩa với keToanTruong
  lyDo       TEXT NOT NULL,
  boiAi      TEXT NOT NULL,      -- chỉ R01–R02 cấp được
  capLuc     TEXT NOT NULL,
  hetHan     TEXT,               -- vắng nghĩa là không hết hạn
  thuHoiLuc  TEXT,
  thuHoiBoi  TEXT
);

-- Một người một chức năng — đúng một dòng CÒN HIỆU LỰC. Chỉ mục một
-- phần: dòng đã thu hồi không tính, nên cấp lại sau khi thu hồi vẫn
-- được mà không đụng khoá.
CREATE UNIQUE INDEX IF NOT EXISTS ix_qtc_mot ON quyenTaiChinh (username, chucNang)
  WHERE thuHoiLuc IS NULL;
CREATE INDEX IF NOT EXISTS ix_qtc_ten ON quyenTaiChinh (username);

-- ═════════════════════════════════════════════════════════════
--  GIAO DỊCH NGÂN HÀNG — CÁI ĐỨNG NGOÀI LÀM CHỨNG
--
--  Chủ hệ thống chốt bản 9.98: "Liên kết hệ thống kế toán với tài khoản
--  ngân hàng."
--
--  Tới bản 9.97, mọi con số thu đều do NGƯỜI TRONG HỆ nói ra: một người
--  ghi phiếu, một người duyệt. Hai lớp ấy chặn được nhầm lẫn và chặn
--  được một người làm sai một mình — nhưng chúng không chặn được HAI
--  người cùng nói một câu không đúng, vì cả hai đều ở trong hệ.
--
--  Sao kê ngân hàng là thứ DUY NHẤT trong cả kiến trúc này đứng NGOÀI.
--  Ngân hàng không biết Học viện muốn sổ trông thế nào. Đối chiếu với
--  nó là phép kiểm duy nhất mà không ai bên trong sửa được.
--
--  BẢNG NÀY KHÔNG BAO GIỜ SỬA MỘT DÒNG ĐÃ NHẬN. Dòng ngân hàng đưa
--  sang là lời của người ngoài; sửa nó là bỏ mất chính cái làm nó có
--  giá trị. Khớp hay không khớp ghi ở cột riêng.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS giaoDichNganHang (
  id          TEXT PRIMARY KEY,
  soTaiKhoan  TEXT NOT NULL,
  maGiaoDich  TEXT NOT NULL,      -- mã ngân hàng cấp, duy nhất theo tài khoản
  huong       TEXT NOT NULL,      -- vao · ra
  soTien      REAL NOT NULL,
  noiDung     TEXT,               -- nội dung chuyển khoản, chữ của người gửi
  luc         TEXT NOT NULL,      -- mốc ngân hàng ghi
  nhanLuc     TEXT NOT NULL,      -- mốc hệ nhận được
  nguon       TEXT NOT NULL,      -- webhook · nhapTay
  nguoiNhap   TEXT,               -- chỉ có khi nhapTay
  idPhieuThu  TEXT,               -- khớp với phiếu nào
  idChiPhi    TEXT,               -- hoặc khoản chi nào
  khopLuc     TEXT,
  khopBoi     TEXT
);

-- Ngân hàng gửi lại cùng một giao dịch là chuyện thường (thử lại, nổ
-- hai lần). Khoá duy nhất theo tài khoản × mã giao dịch là chỗ chặn
-- ghi trùng — không có nó thì một lượt gửi lại thành một khoản tiền
-- thứ hai chưa từng có.
CREATE UNIQUE INDEX IF NOT EXISTS ix_gdnh_mot
  ON giaoDichNganHang (soTaiKhoan, maGiaoDich);
CREATE INDEX IF NOT EXISTS ix_gdnh_luc  ON giaoDichNganHang (luc);
CREATE INDEX IF NOT EXISTS ix_gdnh_khop ON giaoDichNganHang (idPhieuThu);

-- ═════════════════════════════════════════════════════════════
--  BẢNG TIN PHÒNG TÀI CHÍNH
--
--  Chủ hệ chốt 9.99.3: kế toán trưởng chủ động cập nhật lên hệ, và có
--  phương án xử lý ngay khi thấy thông tin quan trọng; tin phân cấp
--  bằng MÀU để biết xử lý cái nào trước.
--
--  ══ CHỖ HỎNG CỦA MỌI HỆ PHÂN CẤP MÀU ══
--
--  Mức độ do người đăng tự chọn thì ai cũng chọn ĐỎ. Sau ba tháng cả
--  bảng đỏ, và màu thôi mang nghĩa gì — lúc ấy người ta đọc từ trên
--  xuống như một danh sách thường, đúng cái mà phân cấp sinh ra để
--  tránh.
--
--  Nên ba lớp chặn, và không lớp nào cấm người ta đặt ĐỎ:
--
--    1. Tin do MÁY sinh lấy mức từ LUẬT, không ai chọn được.
--    2. Tin người đặt ĐỎ phải ghi VÌ SAO GẤP — một câu, và câu ấy ở
--       lại trong dòng cho người sau đọc.
--    3. Tỷ lệ tin đỏ hiện ngay trên bảng. Đỏ hết thì con số ấy nói ra,
--       và nó nói với chính người đang đặt màu.
--
--  ══ MỘT TIN CÓ MÀU MÀ KHÔNG CÓ NGƯỜI VÀ KHÔNG CÓ HẠN LÀ MỘT CÁI MÀU ══
--
--  Bảng này đòi hai thứ ấy ở mức ĐỎ và CAM: ai xử lý, và hạn tới bao
--  giờ. Không có chúng thì tin nằm đó, ai đọc cũng nghĩ người khác lo,
--  và cái màu chỉ làm mọi người cùng lo mà không ai làm.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS tinTaiChinh (
  id         TEXT PRIMARY KEY,
  mucDo      TEXT NOT NULL,      -- do · cam · vang · xanh
  loai       TEXT NOT NULL,      -- máy sinh: mã luật; người đăng: 'nguoiDang'
  tieuDe     TEXT NOT NULL,
  than       TEXT NOT NULL,
  viSaoGap   TEXT,               -- BẮT BUỘC khi người đặt mức 'do'
  doiTuong   TEXT,               -- id chứng từ liên quan
  tuMay      INTEGER NOT NULL DEFAULT 0,
  nguoiDang  TEXT NOT NULL,      -- 'may-chu' khi máy sinh
  luc        TEXT NOT NULL,
  giaoCho    TEXT,               -- ai xử lý
  hanXuLy    TEXT,
  trangThai  TEXT NOT NULL DEFAULT 'moi',   -- moi · dangXuLy · daXuLy · boQua
  cachXuLy   TEXT,               -- BẮT BUỘC khi đóng
  nguoiXuLy  TEXT,
  xuLyLuc    TEXT
);

-- Bảng tin mở ra mỗi sáng, lọc theo trạng thái rồi xếp theo mức độ.
CREATE INDEX IF NOT EXISTS ix_tin_tt  ON tinTaiChinh (trangThai, luc DESC);
CREATE INDEX IF NOT EXISTS ix_tin_han ON tinTaiChinh (hanXuLy) WHERE trangThai IN ('moi','dangXuLy');
CREATE INDEX IF NOT EXISTS ix_tin_giao ON tinTaiChinh (giaoCho, trangThai);

-- ═════════════════════════════════════════════════════════════
--  HỆ SỐ LƯƠNG — CÂU TRẢ LỜI CỦA CHỦ HỆ CHO L-01
--
--  TC_LUONG khai BA TẦNG lương và bốn bậc điểm, nhưng nói thẳng rằng
--  máy đo được ĐIỂM và không quy được điểm ra tiền: quy đổi là quyết
--  định về thị trường lao động và về ngân sách.
--
--  Nên bảng này để TRỐNG khi cài đặt, và bảng lương từ chối tính tiền
--  cho tới khi có người điền. Đặt một con số mặc định ở đây là máy tự
--  quyết một chuyện máy đã tự khai là mình không quyết được — và con
--  số mặc định ấy sẽ thành lương thật của một người thật.
--
--  KHÔNG SỬA MỘT DÒNG ĐÃ ĐẶT. Đổi hệ số là ghi một dòng MỚI có hiệu
--  lực từ một kỳ; dòng cũ ở lại. Sửa đè thì một bảng lương đã chốt ba
--  tháng trước không giải thích được nữa, và đó đúng là lúc người ta
--  cần giải thích nó.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS heSoLuong (
  id         TEXT PRIMARY KEY,
  viTri      TEXT NOT NULL,      -- keToanThu · keToanChi · keToanTruong
  tuKy       TEXT NOT NULL,      -- có hiệu lực từ kỳ này trở đi (YYYY-MM)
  luongCung  INTEGER NOT NULL,   -- tầng 1
  tranKpi    INTEGER NOT NULL,   -- tầng 2 khi đạt 100 điểm
  lyDo       TEXT NOT NULL,
  boiAi      TEXT NOT NULL,      -- chỉ R01
  datLuc     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_hsl_vt ON heSoLuong (viTri, tuKy DESC);

-- ═════════════════════════════════════════════════════════════
--  BẢNG LƯƠNG — VÀ VÌ SAO NÓ ĐÔNG CỨNG SỐ ĐO CHỨ KHÔNG ĐÔNG CỨNG SỐ TIỀN
--
--  Luật cứng của TC_LUONG: "Điểm của một kỳ ĐÃ CHỐT thì không tính lại
--  — cùng luật với sổ."
--
--  Nên dòng này giữ SỐ ĐO THÔ của từng thước tại lúc chốt, không phải
--  chỉ giữ con số điểm cuối. Hai lý do, và lý do thứ hai mới là lý do
--  thật:
--
--    · giữ số đo thì ba tháng sau còn dựng lại được vì sao ra điểm ấy
--    · và người bị trừ lương CÃI LẠI ĐƯỢC. Một bảng lương chỉ có một
--      con số điểm là một bản án không có hồ sơ; người ta ký vào vì
--      không có gì để chỉ ra chỗ sai.
--
--  Trạng thái 'nhap' là bản nháp tính lại được mỗi lượt mở. 'daChot'
--  thì đóng cứng và không hàm nào tính lại nó.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS bangLuong (
  id          TEXT PRIMARY KEY,
  ky          TEXT NOT NULL,      -- YYYY-MM
  username    TEXT NOT NULL,
  viTri       TEXT NOT NULL,
  diem        REAL,               -- null nghĩa là KHÔNG CÓ GÌ ĐỂ ĐO trong kỳ
  bacDiem     TEXT,
  soDo        TEXT NOT NULL,      -- JSON số đo thô của từng thước, đông cứng
  trongBoQua  REAL,               -- phần trọng số rơi vào thước không đo được
  luongCung   INTEGER NOT NULL DEFAULT 0,
  phanKpi     INTEGER NOT NULL DEFAULT 0,
  ghiNhan     INTEGER NOT NULL DEFAULT 0,   -- tầng 3, do Giám đốc quyết
  ghiNhanVi   TEXT,
  duoi60      TEXT,               -- BẮT BUỘC khi điểm < 60: quyết định của người chốt
  idHeSo      TEXT,               -- dòng hệ số đã dùng, để dựng lại được
  trangThai   TEXT NOT NULL DEFAULT 'nhap',  -- nhap · daChot
  nguoiChot   TEXT,
  chotLuc     TEXT
);

-- Một người một kỳ đúng một dòng.
CREATE UNIQUE INDEX IF NOT EXISTS ix_bl_mot ON bangLuong (ky, username);
CREATE INDEX IF NOT EXISTS ix_bl_ky ON bangLuong (ky, trangThai);

-- ═════════════════════════════════════════════════════════════
--  THÔNG BÁO TRONG HỆ
--
--  Chủ hệ chốt 9.98: "có thông báo lên hệ thống giám đốc, Super Admin."
--
--  Thư điện tử đi ra NGOÀI hệ — qua nhà gửi thư, qua Google, nằm lại
--  trong hộp thư. Thông báo trong hệ ở LẠI TRONG hệ, dưới khoá của Học
--  viện, và đọc được ngay trong ứng dụng.
--
--  Hai đường, hai việc: thư để biết khi không mở máy; thông báo trong
--  hệ để làm việc.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS thongBao (
  id       TEXT PRIMARY KEY,
  denVai   TEXT,                  -- gửi theo VAI: R01, R03…
  denAi    TEXT,                  -- hoặc gửi đích danh một tên đăng nhập
  loai     TEXT NOT NULL,
  mucDo    TEXT NOT NULL,         -- tin · canXem · gap
  tieuDe   TEXT NOT NULL,
  than     TEXT NOT NULL,
  doiTuong TEXT,                  -- id chứng từ liên quan
  luc      TEXT NOT NULL,
  docLuc   TEXT,
  docBoi   TEXT
);

CREATE INDEX IF NOT EXISTS ix_tb_vai ON thongBao (denVai, luc DESC);
CREATE INDEX IF NOT EXISTS ix_tb_ai  ON thongBao (denAi, luc DESC);

-- ═════════════════════════════════════════════════════════════
--  MIỄN GIẢM — VÌ SAO KHÔNG SỬA THẲNG phaiThu
--
--  Học bổng, giảm cho anh chị em cùng học, giảm theo hoàn cảnh: đều là
--  chuyện có thật hằng tháng. Tới 9.90 không có đường nào ghi, nên cách
--  duy nhất là hoặc sửa phaiThu của kỳ, hoặc ghi một phiếu thu giả.
--
--  Cả hai đều hỏng, và hỏng theo hai kiểu khác nhau:
--
--    · sửa phaiThu  — xoá mất cam kết gốc. Sang năm không ai trả lời
--                     được "nhà này đáng lẽ đóng bao nhiêu, được giảm
--                     bao nhiêu, ai duyệt".
--    · phiếu thu giả — thổi phồng TIỀN THỰC THU. Sổ báo đã thu một
--                     khoản chưa từng vào tài khoản nào, và nó lọt
--                     thẳng vào bản đối chiếu sao kê.
--
--  Nên: một dòng riêng. Cam kết gốc ở kyThu giữ nguyên; công nợ trừ đi
--  phần miễn giảm ĐÃ DUYỆT.
--
--  Miễn giảm có hiệu lực từ LÚC DUYỆT, không lùi ngược. Một khoản giảm
--  duyệt hôm nay không được làm đổi bản báo cáo quý trước — cùng một
--  luật với mốc huỷ hoa hồng.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS mienGiam (
  id          TEXT PRIMARY KEY,
  maKhachHang TEXT NOT NULL,
  idKy        TEXT NOT NULL,      -- trỏ kyThu.id — miễn giảm gắn vào MỘT kỳ
  soTien      REAL NOT NULL,
  loai        TEXT NOT NULL,      -- hocBong · anhChiEm · hoanCanh · khuyenMai · khac
  theoLuat    TEXT NOT NULL,      -- nguyên văn luật hay quyết định cho giảm
  lyDo        TEXT NOT NULL,
  nguoiDeXuat TEXT NOT NULL,
  deXuatLuc   TEXT NOT NULL,
  nguoiDuyet  TEXT,
  duyetLuc    TEXT,
  trangThai   TEXT NOT NULL DEFAULT 'choDuyet'
);

CREATE INDEX IF NOT EXISTS ix_mg_ky  ON mienGiam (idKy, trangThai);
CREATE INDEX IF NOT EXISTS ix_mg_nha ON mienGiam (maKhachHang, deXuatLuc DESC);
CREATE INDEX IF NOT EXISTS ix_mg_tt  ON mienGiam (trangThai, duyetLuc);

-- ═════════════════════════════════════════════════════════════
--  NHẮC THU — DANH SÁCH QUÁ HẠN MÀ KHÔNG AI LÀM ĐƯỢC
--
--  dsQuaHan trả về những nhà đang nợ. Nhưng người đi đòi cần câu tiếp
--  theo, và câu ấy không có chỗ nào trả lời: nhà này đã nhắc mấy lần,
--  lần cuối bao giờ, họ nói gì, có hẹn ngày nào không.
--
--  Không có bảng này thì mỗi người phụ trách giữ câu trả lời trong đầu
--  mình, và ngày họ nghỉ là ngày câu trả lời biến mất.
--
--  VÀ ĐÂY LÀ CHỖ LUẬT "LÀM VIỆC TRÊN HỆ THỐNG" CÓ HIỆU LỰC THẬT.
--  Coach và Tư vấn không được lấy thông tin cá nhân của khách ra làm
--  việc riêng. Một lượt nhắc thu ghi ở đây là một lượt làm việc đúng
--  quy định; không ghi thì không có bằng chứng nào rằng nó đã xảy ra
--  trên hệ thống.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS nhacThu (
  id          TEXT PRIMARY KEY,
  maKhachHang TEXT NOT NULL,
  idKy        TEXT,
  kenh        TEXT NOT NULL,      -- goiDien · nhanTin · email · gapMat
  noiDung     TEXT NOT NULL,
  ketQua      TEXT NOT NULL,      -- huaTra · khongLienLac · xinKhatNo · tuChoi · daTra
  henLuc      TEXT,               -- nhà hẹn trả ngày nào, nếu có hẹn
  boi         TEXT NOT NULL,
  luc         TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_nt_nha ON nhacThu (maKhachHang, luc DESC);
CREATE INDEX IF NOT EXISTS ix_nt_hen ON nhacThu (henLuc);

-- ═════════════════════════════════════════════════════════════
--  CHỐT KÉT — TIỀN MẶT LÀ CHỖ DUY NHẤT MẤT MÀ KHÔNG DÒNG NÀO BIẾT
--
--  Chuyển khoản có sao kê ngân hàng đứng ngoài làm chứng: sổ nói thu
--  mười triệu mà ngân hàng nói tám thì lệch lộ ra. Tiền mặt không có
--  ai đứng ngoài cả — sổ nói bao nhiêu thì chỉ có sổ nói.
--
--  Nên phải ĐẾM. Mỗi ngày một dòng: sổ nói bao nhiêu, đếm thật được
--  bao nhiêu, lệch bao nhiêu. Lệch khác 0 thì bắt buộc có lý do.
--
--  Một két không bao giờ lệch là một két chưa bao giờ được đếm.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS chotKet (
  ngay     TEXT PRIMARY KEY,       -- ngày giờ Việt Nam
  theoSo   REAL NOT NULL,
  demThuc  REAL NOT NULL,
  chenh    REAL NOT NULL,
  lyDo     TEXT,
  boi      TEXT NOT NULL,
  luc      TEXT NOT NULL
);

-- ═════════════════════════════════════════════════════════════
--  SỔ CHỐT — VÌ SAO MỘT BÁO CÁO CẦN ĐƯỢC ĐÓNG LẠI
--
--  Mọi con số ở trên đều tính bằng phép cộng chạy trên sổ SỐNG. Chạy
--  hôm nay ra một số, chạy lại tháng sau ra số khác — không phải vì
--  phép cộng sai, mà vì dưới nó có dòng đã đổi: một phiếu bị huỷ, một
--  khoản hoàn được duyệt, một phiếu ghi lùi ngày.
--
--  Nghĩa là bản báo cáo tuần trước KHÔNG DỰNG LẠI ĐƯỢC. Người ta in
--  ra, mang đi họp, rồi tháng sau mở lại thì số đã khác, và không ai
--  nói được vì sao. Đó không phải một bất tiện; đó là một sổ sách
--  không dùng được để đối chất.
--
--  Nên: CHỐT. Mỗi tuần đóng lại một dòng ở đây, ghi số như nó đứng
--  lúc ấy. Dòng đã chốt không tính lại nữa.
--
--  VÂN TAY là chỗ làm cho việc chốt có nghĩa. Nó là dấu của TẬP DÒNG
--  đã đếm, không phải của con số tổng. Chốt xong mà sau này có dòng
--  nào trong khoảng ấy đổi đi, tính lại vân tay sẽ ra khác — và
--  soatChot nêu tên kỳ ấy ra. Không có vân tay thì "đã chốt" chỉ là
--  một con số được chép lại, và một con số chép lại không chứng minh
--  được gì cả.
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS soChot (
  ky          TEXT PRIMARY KEY,   -- '2026-W36' · '2026-09' · '2026-Q3' · '2026'
  loai        TEXT NOT NULL,      -- tuan · thang · quy · nam
  tuNgay      TEXT NOT NULL,      -- ngày đầu kỳ, giờ Việt Nam
  denNgay     TEXT NOT NULL,
  tuLuc       TEXT NOT NULL,      -- cùng mốc ấy quy về UTC — xem chú giải múi giờ
  denLuc      TEXT NOT NULL,
  thu         REAL NOT NULL DEFAULT 0,   -- tiền thực thu
  soPhieu     INTEGER NOT NULL DEFAULT 0,
  hoan        REAL NOT NULL DEFAULT 0,
  soHoan      INTEGER NOT NULL DEFAULT 0,
  ghiNhan     REAL NOT NULL DEFAULT 0,   -- doanh thu ghi nhận: kỳ thu TỚI HẠN trong kỳ
  soKyToiHan  INTEGER NOT NULL DEFAULT 0,
  hhSinh      REAL NOT NULL DEFAULT 0,
  hhTra       REAL NOT NULL DEFAULT 0,
  chi         REAL NOT NULL DEFAULT 0,   -- chi phí vận hành đã duyệt trong tuần
  soChungTuChi INTEGER NOT NULL DEFAULT 0,
  mienGiam    REAL NOT NULL DEFAULT 0,
  conNoCuoiKy REAL NOT NULL DEFAULT 0,   -- luỹ kế tới cuối kỳ, không phải riêng kỳ
  nhaMoi      INTEGER NOT NULL DEFAULT 0,
  luotVuotTang INTEGER NOT NULL DEFAULT 0,
  vanTay      TEXT NOT NULL,
  chotLuc     TEXT NOT NULL,
  boiAi       TEXT NOT NULL,
  moLaiLuc    TEXT,               -- có mặt nghĩa là kỳ này đã bị mở lại
  moLaiBoi    TEXT,
  moLaiLyDo   TEXT
);

CREATE INDEX IF NOT EXISTS ix_chot_loai ON soChot (loai, tuNgay DESC);

-- Bút toán điều chỉnh. Một khoản tiền động vào kỳ ĐÃ CHỐT thì không
-- được sửa dòng đã chốt — sổ đã đóng là đã đóng. Nó ghi ở đây, và rơi
-- vào kỳ đang mở, có trỏ ngược về kỳ bị ảnh hưởng.
--
-- Đây là cách sổ sách thật xử lý chuyện ấy, và cũng là cách duy nhất
-- để câu "tháng trước báo đủ, sao giờ thiếu" có câu trả lời bằng dòng
-- chứ bằng trí nhớ.
CREATE TABLE IF NOT EXISTS dieuChinh (
  id           TEXT PRIMARY KEY,
  kyBiAnhHuong TEXT NOT NULL,     -- kỳ đã chốt mà khoản này thuộc về
  loai         TEXT NOT NULL,     -- huyPhieu · duyetHoan · ganPhieu · duyetMuon
  idChungTu    TEXT NOT NULL,     -- phiếu thu hoặc khoản hoàn
  maKhachHang  TEXT,
  soTien       REAL NOT NULL,     -- ÂM là giảm thu của kỳ đã chốt
  luc          TEXT NOT NULL,     -- lúc ghi bút toán, tức thuộc kỳ đang mở
  lucGoc       TEXT NOT NULL,     -- mốc của chứng từ gốc, nằm trong kỳ đã chốt
  boi          TEXT NOT NULL,
  dienGiai     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_dc_ky  ON dieuChinh (kyBiAnhHuong);
CREATE INDEX IF NOT EXISTS ix_dc_luc ON dieuChinh (luc);

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
