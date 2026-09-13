/* ═══════════════════════════════════════════════════════════════
   GITA 365 — BỘ NÃO, PHẦN CHẠY Ở MÁY CHỦ

   Bản chép của G.BN_* — máy chủ không đọc được kho đã mã hoá. Bộ kiểm
   mục 78 đối chiếu từng ô với bản gốc.

   ══ TỆP NÀY LÀM ĐÚNG BA VIỆC ══

     soatRao10()    chạy hàng rào mười điểm trên một đoạn chữ
     soatRaNgoai()  dò dữ liệu NHẬN DẠNG ĐƯỢC trước khi thứ gì rời hệ
     vungCuaViec()  một việc rơi vào vùng uỷ quyền nào

   Không có việc thứ tư. Bảy phân hệ của bản đặc tả sẽ gọi ba hàm này
   chứ không viết lại chúng — viết lại là dựng bản thứ hai của một luật,
   và bản thứ hai thì sau vài bản nói khác bản gốc.
   ═══════════════════════════════════════════════════════════════ */

/* ── DÒ THEO BIÊN ÂM TIẾT, TRỪ CỤM GHÉP ──
   Bẫy thứ ba của phép dò chữ tiếng Việt: khoảng trắng ngăn ÂM TIẾT chứ
   không ngăn TỪ. "bé" đứng riêng trong "bé tập bò", "em bé", "bé nhỏ" —
   mà "bé tập bò" chính là tên Điều 4, nên không trừ thì hàng rào bắt oan
   ngay chính hiến pháp của nó. */
const TRU_CHUNG = ['bé tập bò', 'em bé', 'bé nhỏ', 'bé xíu', 'nhỏ bé',
  'cháu bé', 'trẻ nhỏ'];

function coTuBN(chu, cum, tru) {
  let t = ' ' + String(chu || '').toLowerCase().replace(/\s+/g, ' ') + ' ';
  (tru || []).forEach(x => { t = t.split(x).join(' '); });
  return t.indexOf(' ' + cum + ' ') >= 0 ||
         t.indexOf(' ' + cum + ',') >= 0 ||
         t.indexOf(' ' + cum + '.') >= 0 ||
         t.indexOf(' ' + cum + '!') >= 0 ||
         t.indexOf(' ' + cum + '?') >= 0;
}

/* ═══════════════ BẢN CHÉP CỦA KHO ═══════════════ */

export const HIENPHAP = [
  [1, 'HP01', 'SỰ THẬT', 'may'], [2, 'HP02', 'ĐỨA TRẺ', 'nguoi'],
  [3, 'HP03', 'XƯNG HÔ', 'may'], [4, 'HP04', 'BÉ TẬP BÒ', 'may'],
  [5, 'HP05', 'TRI KỶ', 'may'], [6, 'HP06', 'KHÔNG PHÁN XÉT', 'may'],
  [7, 'HP07', 'LẰN RANH', 'may'], [8, 'HP08', 'MỘT NGUỒN SỰ THẬT', 'may'],
  [9, 'HP09', 'DẤU VẾT', 'may'], [10, 'HP10', 'CHỐNG THỔI PHỒNG', 'may'],
  [11, 'HP11', 'QUYỀN TỰ CHỦ', 'nguoi'], [12, 'HP12', 'CÔNG BẰNG', 'nguoi'],
  [13, 'HP13', 'THƯỢNG TÔN PHÁP LUẬT', 'may']
];

export const RAO10 = [
  ['R1', 1, true, 1], ['R2', 2, true, 1], ['R3', 3, true, 7], ['R4', 4, true, 6],
  ['R5', 5, true, 3], ['R6', 6, true, 4], ['R7', 7, true, 5], ['R8', 8, true, 10],
  ['R9', 9, false, 8], ['R10', 10, true, 13]
];

export const VUNG = [['XANH', 60], ['VANG', 25], ['DO', 15]];

export const GHE = [
  ['G1', 'Tham mưu trưởng', false], ['G2', 'Người giữ tiền', false],
  ['G3', 'Người kéo khách', false], ['G4', 'Người giữ khách', false],
  ['G5', 'Người giữ chất lượng', true], ['G6', 'Người giữ đội ngũ', false],
  ['G7', 'Người giữ luật', true]
];

export const ANDANH = ['AD-TEN', 'AD-SDT', 'AD-MAIL', 'AD-DIACHI', 'AD-CCCD',
  'AD-TRUONG'];

/* ── BẢNG DÒ CỦA TỪNG ĐIỂM HÀNG RÀO ── */
const CAM_KET = ['cam kết', 'đảm bảo', 'chắc chắn đạt', 'bảo đảm kết quả',
  'hoàn tiền nếu không', 'chắc chắn thành'];
const LAN_RANH = ['chẩn đoán', 'kê đơn', 'liều dùng', 'phác đồ điều trị',
  'tự kỷ', 'tăng động', 'trầm cảm', 'lãi suất', 'lợi nhuận đầu tư',
  'khởi kiện', 'truy tố'];
const PHAN_XET = ['cha mẹ sai', 'bố mẹ sai', 'anh chị sai', 'nuôi con sai cách',
  'thua người khác', 'kém hơn', 'không biết dạy'];
const XUNG_HO_SAI = ['bé', 'cháu'];
const THOI_PHONG = ['tốt nhất', 'số một', 'duy nhất', 'thần kỳ', 'đột phá',
  'vượt trội', 'gấp 10 lần', 'gấp mười lần', 'thiên tài hoá', 'kỳ diệu',
  'bí quyết vàng', 'cam kết 100%'];
const TRI_KY = [
  ['nghe', ['em nghe', 'em đọc', 'em hiểu', 'anh chị kể']],
  ['goiTen', ['mệt', 'lo', 'sốt ruột', 'buồn', 'bất lực', 'nản']],
  ['hyVong', ['nhiều nhà', 'thường gặp', 'có cách', 'đã có nhà']],
  ['buocNho', ['tối nay', 'ngày mai', 'thử', 'ghi một dòng', 'làm một việc']],
  ['hen', ['hẹn', 'mấy hôm nữa', 'tuần sau', 'em nhắn lại', 'báo em']]
];

/* Con số KHÔNG CÓ NGUỒN. Bắt số phần trăm và số lớn đứng trần — chúng
   là hình của một lời khoe, còn "3 bước" hay "21 ngày" thì không.
   Bỏ qua số có nguồn đi kèm trong cùng câu. */
const DAU_NGUON = ['theo', 'nguồn', 'khảo sát', 'nghiên cứu', 'luật', 'nghị định',
  'điều', 'thông tư', 'báo cáo'];

function soKhongNguon(chu) {
  const cau = String(chu || '').split(/[.!?\n]+/);
  const ra = [];
  cau.forEach(c => {
    const t = c.toLowerCase();
    const coNguon = DAU_NGUON.some(d => t.indexOf(d) >= 0);
    if (coNguon) return;
    /* Phần trăm, hoặc số từ bốn chữ số trở lên — hai hình của một con
       số đi khoe. Số nhỏ trần ("3 bước", "21 ngày") là số CHỈ DẪN, và
       bắt chúng thì hàng rào đỏ ở mọi bài tử tế. */
    const m = c.match(/\b\d+([.,]\d+)?\s*%|\b\d{4,}\b/g);
    if (m) ra.push(...m.map(x => x.trim()));
  });
  return ra;
}

/* ═══════════════ HÀNG RÀO MƯỜI ĐIỂM ═══════════════

   Trả về TỪNG ĐIỂM một, không trả một con số tổng. Một con số tổng thì
   chín điểm sạch và một điểm phạm nặng ra cùng kết quả với mười điểm
   hơi phạm — mà hai chuyện ấy cần hai cách xử lý khác hẳn nhau.

   Điểm R9 luôn trả về `nguoiDoc: true`: máy không biết GITA đang có
   năng lực gì. Trình nó ra như đã kiểm là chỗ tệ nhất của cả hàng rào. */
export function soatRao10(chu, y) {
  const t = String(chu || '');
  const o = y || {};
  const pham = [];
  const ghi = (ma, thay) => pham.push({ ma, thay });

  const so = soKhongNguon(t);
  if (so.length) ghi('R1', so.slice(0, 6));

  const ck = CAM_KET.filter(c => t.toLowerCase().indexOf(c) >= 0);
  if (ck.length) ghi('R2', ck);

  const lr = LAN_RANH.filter(c => t.toLowerCase().indexOf(c) >= 0);
  if (lr.length) ghi('R3', lr);

  const px = PHAN_XET.filter(c => t.toLowerCase().indexOf(c) >= 0);
  if (px.length) ghi('R4', px);

  const xh = XUNG_HO_SAI.filter(c => coTuBN(t, c, TRU_CHUNG));
  if (xh.length) ghi('R5', xh);

  /* R6 — ba phép đếm, nêu riêng từng phép: cắt một câu dài khác hẳn
     cắt một con số thừa. */
  const r6 = [];
  const cauDai = t.split(/[.!?\n]+/).map(c => c.trim()).filter(Boolean)
    .filter(c => c.split(/\s+/).length > 20);
  if (cauDai.length) r6.push(cauDai.length + ' câu quá 20 chữ');
  const doanDai = t.split(/\n\s*\n/).filter(d => d.split(/\n/).length > 4);
  if (doanDai.length) r6.push(doanDai.length + ' đoạn quá 4 dòng');
  const demSo = (t.match(/\b\d+([.,]\d+)?\b/g) || []).length;
  if (demSo > 2) r6.push(demSo + ' con số, quá 2');
  if (r6.length) ghi('R6', r6);

  /* R7 — đo CÓ MẶT năm phần của vòng Tri kỷ, không đo chất lượng. Chỉ
     chạy khi bài tự khai là một câu TRẢ LỜI KHÁCH: một bài giới thiệu
     sản phẩm không có lý do phải mang đủ năm bước, và bắt nó là làm
     hàng rào đỏ ở chỗ không có lỗi. */
  if (o.laTraLoiKhach) {
    const thieu = TRI_KY.filter(([, dau]) =>
      !dau.some(d => t.toLowerCase().indexOf(d) >= 0)).map(([b]) => b);
    if (thieu.length) ghi('R7', thieu);
  }

  const tp = THOI_PHONG.filter(c => t.toLowerCase().indexOf(c) >= 0);
  if (tp.length) ghi('R8', tp);

  const ra = soatRaNgoai(t);
  if (!ra.sach) ghi('R10', ra.ngo.map(n => n.ma + ': ' + n.thay));

  return {
    dat: pham.length === 0,
    pham,
    /* R9 KHÔNG bao giờ nằm trong `pham` và cũng không bao giờ nằm trong
       phần sạch — nó luôn là việc của người, và nói ra ở một ô riêng. */
    nguoiPhaiDoc: ['R9'],
    viR9: 'Máy không biết GITA đang có năng lực gì — danh sách ấy đổi mỗi bản, ' +
      'và một bản chép của nó trong bộ dò sẽ cũ đi lặng lẽ. Người duyệt đọc.',
    soDiemMayDo: RAO10.filter(r => r[2]).length
  };
}

/* ═══════════════ LUẬT VẬN HÀNH SỐ 1 — ẨN DANH TRƯỚC KHI RA NGOÀI ═══════════════

   Cửa đi ra của kho (guiDeBaiRaNgoai) kiểm quyền, kiểm bậc, kiểm cổng —
   và tới 9.99.61 KHÔNG kiểm một chữ nào về dữ liệu người. Nghĩa là một
   cái tên trẻ con lọt vào đề bài thì nó đi thẳng ra bộ tạo ảnh đặt ở
   nước ngoài, và Luật số 91/2025/QH15 gọi đó là xử lý dữ liệu xuyên
   biên giới.

   NGỜ LÀ ĐỦ ĐỂ CHẶN. Một cái tên bị bắt oan thì tốn của người gửi ba
   mươi giây sửa lại; một cái tên lọt thì nó đã ra khỏi hệ và không gọi
   về được. Phép cân ấy lệch hẳn về một phía, nên bộ dò được phép thà
   bắt oan.

   VÀ MÁY KHÔNG TỰ XOÁ HỘ. Tự xoá thì người gửi không biết mình vừa
   suýt gửi cái gì, và lần sau viết y hệt; tệ hơn nữa, một phép xoá tự
   động sót một chỗ thì người gửi đã yên tâm rồi. */

/* Họ người Việt — đứng trước một chữ viết hoa thì gần như chắc là tên
   người. Danh sách ngắn, phủ phần lớn dân số, và không cần dài hơn:
   bắt sót một họ hiếm thì vẫn còn năm phép dò kia. */
const HO_VIET = ['nguyễn', 'trần', 'lê', 'phạm', 'hoàng', 'huỳnh', 'phan', 'vũ',
  'võ', 'đặng', 'bùi', 'đỗ', 'hồ', 'ngô', 'dương', 'lý', 'trương', 'đinh',
  'lâm', 'mai', 'tạ', 'chu', 'đoàn', 'cao', 'thái'];

export function soatRaNgoai(chu) {
  const t = String(chu || '');
  const ngo = [];

  /* AD-TEN — họ Việt theo sau bởi ít nhất một chữ viết hoa nữa. Chữ đầu
     câu viết hoa không lọt vào vì phép dò đòi HỌ đứng trước. */
  const reTen = new RegExp(
    '\\b(' + HO_VIET.join('|') + ')\\s+[A-ZĐÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯ][^\\s,.;:!?]*', 'gi');
  const ten = t.match(reTen);
  if (ten) ngo.push({ ma: 'AD-TEN', thay: Array.from(new Set(ten)).slice(0, 5).join(' · ') });

  /* AD-SDT — số máy Việt Nam: bắt đầu bằng 0, chín hoặc mười chữ số,
     cho phép dấu cách hoặc chấm ở giữa như người ta hay gõ. */
  const sdt = t.match(/\b0\d[\d\s.\-]{7,12}\d\b/g);
  if (sdt) ngo.push({ ma: 'AD-SDT', thay: sdt.slice(0, 3).join(' · ') });

  const mail = t.match(/\b[\w.+-]+@[\w-]+\.[\w.]{2,}\b/g);
  if (mail) ngo.push({ ma: 'AD-MAIL', thay: mail.slice(0, 3).join(' · ') });

  /* AD-DIACHI — số nhà kèm tên đường. "số 12 Nguyễn Trãi", "12/3 đường Lê Lợi". */
  const dc = t.match(/\b(số\s*)?\d+([\/-]\d+)*\s+(đường|phố|ngõ|hẻm|ấp|thôn)\s+\S+/gi);
  if (dc) ngo.push({ ma: 'AD-DIACHI', thay: dc.slice(0, 3).join(' · ') });

  /* AD-CCCD — dãy liền từ chín số trở lên. Không đề bài nào cần tới
     chúng, nên bắt hết là an toàn. */
  const day = t.match(/\b\d{9,}\b/g);
  if (day) ngo.push({ ma: 'AD-CCCD', thay: day.slice(0, 3).join(' · ') });

  /* AD-TRUONG — tên trường cụ thể. Trường cộng lớp cộng tuổi đủ chỉ ra
     một đứa trẻ dù không có tên nào. */
  const tr = t.match(/\b(trường|thcs|thpt|tiểu học)\s+[A-ZĐ][^\s,.;:!?]*(\s+[A-ZĐ][^\s,.;:!?]*)?/gi);
  if (tr) ngo.push({ ma: 'AD-TRUONG', thay: tr.slice(0, 3).join(' · ') });

  return {
    sach: ngo.length === 0, ngo,
    vi: ngo.length
      ? 'Ngờ có dữ liệu nhận dạng được. Máy CHẶN và nói ra chỗ ngờ, KHÔNG tự xoá ' +
        'hộ — tự xoá thì người gửi không biết mình vừa suýt gửi cái gì, và lần sau ' +
        'viết y hệt. Ẩn danh rồi gửi lại: "phụ huynh A, con 9 tuổi, vào qua cửa ' +
        'làm, sợ bị cười".'
      : 'Không thấy dữ liệu nhận dạng được. Đây là phép DÒ, không phải lời bảo ' +
        'đảm — người gửi vẫn là người chịu trách nhiệm cuối.'
  };
}

/* ═══════════════ MỘT VIỆC RƠI VÀO VÙNG NÀO ═══════════════

   Không đoán. Việc không có trong bảng thì trả về VÙNG VÀNG — phía an
   toàn: máy soạn, người duyệt. Rơi về Xanh là để máy tự làm một việc
   chưa ai xếp hạng, và đó đúng là cách một hệ lặng lẽ mở rộng quyền
   của chính nó. */
const VIEC_XANH = ['traLoiBangDaDuyet', 'guiWowTheoLich', 'nhanDenVang',
  'capNhatHoSo', 'tinhDenBaMau', 'sinhBayNhanhNhap', 'tongHopBayConSo',
  'sinhDeThiDoiNgu', 'soanLoTrinhNhap'];
/* Mười quyết định không bao giờ giao cho máy. XUẤT RA từ 9.99.71 vì
   câu lệnh "Tôi vắng 3 ngày" của Hệ điều hành phải lấy ngưỡng gọi
   TỪ ĐÂY chứ không chép sang — hai danh sách ngưỡng thì cái nào cũng
   tự tin, và lúc gấp người ta đọc cái nào gần tay hơn. */
export const DO10 = ['kyHopDong', 'tuyenNguoi', 'datGia', 'duyetChiVuotNguong',
  'suaHienPhap', 'xuLyKhungHoang', 'quyetDuLieuCaNhan', 'hoanTien',
  'moSanPham', 'anToanTreEm'];

export function vungCuaViec(ma) {
  const m = String(ma || '');
  if (DO10.indexOf(m) >= 0) return { vung: 'DO', uyQuyen: false,
    vi: 'Chỉ chủ hệ. Sai thì không sửa lại được, hoặc sai thì có người bị thiệt ' +
      'hại thật — luật vàng của bản đặc tả.' };
  if (VIEC_XANH.indexOf(m) >= 0) return { vung: 'XANH', uyQuyen: true,
    vi: 'Máy chạy, không cần hỏi: việc đã có khuôn duyệt trước, hoặc việc ghi ' +
      'chép, hoặc bản nháp chưa ai thấy.' };
  return { vung: 'VANG', uyQuyen: false, macDinh: true,
    vi: 'Việc chưa ai xếp hạng thì rơi về VÀNG — máy soạn, người duyệt. Rơi về ' +
      'Xanh là để máy tự làm một việc chưa ai xếp hạng, và đó đúng là cách một ' +
      'hệ lặng lẽ mở rộng quyền của chính nó.' };
}

/* ═══════════════ CỬA CHO MÀN HÌNH ═══════════════ */

/* `hoSo.role`, KHÔNG phải `hoSo.vai`. Cùng cái bẫy đã cắn ở 9.99.55 với
   `hoSo.username`: hồ sơ phiên của kho này mang tên ô riêng, và gõ tên
   khác thì JavaScript không báo gì cả — nó trả undefined, phép thử sai,
   và cổng đóng với MỌI người trong im lặng. Bộ thử bắt ngay lần chạy
   đầu, bằng bốn dòng đỏ ở bốn cửa cùng lúc. */
function duocVaoBN(hoSo) {
  return /^R(0[1-5])$/.test(String((hoSo || {}).role || ''));
}

export async function soatBoNao(y, env, db, hoSo) {
  if (!duocVaoBN(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Cổng bộ não mở cho R01–R05.' };
  const chu = String((y || {}).chu || '').trim();
  if (chu.length < 15) return { ok: false,
    error: 'Dưới mười lăm chữ thì chưa đủ để soi hàng rào.' };
  const r = soatRao10(chu, { laTraLoiKhach: !!(y || {}).laTraLoiKhach });
  return { ok: true, ...r,
    vi: r.dat
      ? 'Qua được ' + r.soDiemMayDo + ' điểm máy đo được. Điểm R9 vẫn là việc của ' +
        'người duyệt, và năm điều của Hiến pháp máy không đo được thì máy không chấm.'
      : 'Phạm ' + r.pham.length + ' điểm. Hàng rào nêu TỪNG ĐIỂM một, không gộp ' +
        'thành một con số — chín điểm sạch và một điểm phạm nặng cần cách xử lý ' +
        'khác hẳn mười điểm hơi phạm.' };
}

export async function soatAnDanh(y, env, db, hoSo) {
  if (!duocVaoBN(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Cổng bộ não mở cho R01–R05.' };
  return { ok: true, ...soatRaNgoai(String((y || {}).chu || '')) };
}
