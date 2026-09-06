/* ═══════════════════════════════════════════════════════════════
   GITA 365 · CỬA VÀO MỚI — SỔ CHI VÀ KÉT TIỀN MẶT

   ══ NỬA CÒN LẠI CỦA CUỐN SỔ ══

   Tới bản 9.90 hệ này chỉ có tiền VÀO. Bản kê kế toán phải ghi thẳng ra
   rằng nó không cộng được một dòng lợi nhuận nào, vì chi phí vận hành
   không nằm ở đâu cả — và đó là lời thú nhận đúng, nhưng không phải
   một cái đích để dừng lại.

   Ba câu hỏi quyết định chiến lược, không câu nào trả lời được bằng
   doanh thu:

     tháng này lãi hay lỗ
     tầng nào nuôi được chính nó
     thêm một Coach thì hoà vốn ở bao nhiêu nhà

   ══ HAI LUẬT CỦA MỘT KHOẢN CHI ══

   1. NGƯỜI ĐỀ XUẤT KHÔNG TỰ DUYỆT. Cùng luật với phiếu thu, và ở đây
      còn thẳng hơn: tiền đi RA. Một người vừa quyết chi vừa duyệt chi
      là một người có thể lấy tiền ra khỏi Học viện mà không ai đứng
      giữa.

   2. QUÁ MỘT NGƯỠNG THÌ CHỈ GIÁM ĐỐC DUYỆT. Không có ngưỡng thì cấp
      duyệt của một khoản một triệu bằng cấp duyệt của một khoản năm
      trăm triệu, và cái sai đắt nhất đi qua đúng cái cửa dễ nhất.
   ═══════════════════════════════════════════════════════════════ */

import { Kho, tokenMoi } from './nen.js';
import { GIA_TANG } from './tai-chinh.js';
import { ghiDieuChinh } from './bao-cao.js';

const BAC = {R01:1,R02:2,R03:3,R04:4,R05:5,R06:6,R07:7,R08:8,
             R09:9,R10:10,R11:11,R12:12,R13:13,R14:14,R15:15};

const dinhDang = n => Number(n).toLocaleString('vi-VN') + 'đ';

/* ══ KHOẢN MỤC LÀ DANH SÁCH TRẮNG ══

   Không phải danh sách cấm. Cho gõ tự do thì sáu tháng sau sổ có
   "thuê mặt bằng", "Thuê mặt bằng", "thue mat bang" và "MB" — bốn
   khoản mục cho một thứ, và không bản tổng hợp nào cộng đúng.

   Thêm khoản mục mới là sửa đúng dòng này, và đó là chỗ nên phải sửa:
   một khoản mục mới là một quyết định về cách Học viện nhìn tiền của
   mình, không phải một ô nhập liệu. */
const KHOAN_MUC = {
  luong:       'Lương và bảo hiểm',
  thuLao:      'Thù lao ngoài lương (không gồm hoa hồng đại sứ)',
  matBang:     'Thuê mặt bằng, điện nước',
  haTang:      'Hạ tầng, phần mềm, tên miền',
  tiepThi:     'Tiếp thị và truyền thông',
  daoTao:      'Đào tạo và tài liệu',
  vanPhong:    'Văn phòng phẩm và thiết bị',
  khauHao:     'Khấu hao',
  thue:        'Thuế và lệ phí đã nộp',
  khac:        'Khác'
};

const HINH_THUC = ['chuyenKhoan', 'tienMat', 'the'];

/* ═══════════════════════════════════════════════════════════════
   NĂM NẤC THANG DUYỆT CHI

   ══ MỖI NẤC NEO VÀO MỘT CON SỐ CÓ THẬT CỦA HỌC VIỆN ══

   Một thang duyệt chi bịa ra bằng những con số tròn — 10 triệu, 50
   triệu — thì sáu tháng sau không ai nhớ vì sao lại là 10 chứ không
   phải 15, và lúc cần đổi thì đổi bừa.

   Nên mỗi nấc ở đây neo vào GIÁ MỘT GÓI HỌC PHÍ, và câu hỏi của từng
   nấc trở thành câu Học viện thật sự quan tâm:

     KHOẢN CHI NÀY ĂN HẾT HỌC PHÍ CỦA BAO NHIÊU NHÀ.

     N1  dưới 1,5 triệu    ≈ ba gói T2        — tiền lặt vặt
     N2  1,5 → dưới 10tr   dưới một gói T3    — chi thường
     N3  10 → dưới 30tr    một gói T3         — bằng cả năm học của một nhà
     N4  30 → dưới 50tr    một gói T4         — bằng trọn hành trình một nhà
     N5  từ 50 triệu       một gói T5         — bằng gói cao nhất Học viện bán

   Neo như thế thì thang tự có nghĩa, và ngày Học viện đổi giá gói thì
   phép soi neo ở soatNeoThang() báo đỏ — người quyết định lại là chủ hệ
   thống, không phải cái thang tự trôi theo.

   ══ NẤC TRÊN CÙNG ĐÒI HAI CHỮ KÝ, KHÔNG PHẢI MỘT CHỮ KÝ CAO HƠN ══

   Đây là chỗ bản 9.92 làm chưa đúng và tôi sửa ở đây.

   Tầng tài chính của Học viện chỉ có BA vai: R01 Super Admin, R02 Admin
   hệ thống, R03 Giám đốc. Bắt khoản lớn phải "lên cấp cao hơn" bên
   trong ba vai ấy nghe thì chặt mà thật ra không thêm được lớp nào —
   và nó còn sai về tổ chức, vì nó đặt người quản trị kỹ thuật lên trên
   Giám đốc ở chuyện tiền.

   Thang thật leo bằng SỐ NGƯỜI và bằng BẰNG CHỨNG:

     N1  không ai duyệt          — một người ghi thẳng
     N2  một người duyệt         — khác người ghi
     N3  một người duyệt         + hoá đơn
     N4  một người duyệt         + hoá đơn + 2 báo giá
     N5  HAI người duyệt         + hoá đơn + 3 báo giá + hợp đồng

   ══ CẤP DUYỆT THEO GỘP, BẰNG CHỨNG THEO TỪNG KHOẢN ══

   Phép soi chia nhỏ ở 9.92 chỉ đẩy khoản chi qua một cái ngưỡng duy
   nhất. Nay nó chạy trên cả thang: cộng dồn bảy ngày tới nấc nào thì
   khoản ấy phải duyệt theo nấc ấy. Chia một hợp đồng 60 triệu thành
   bốn khoản 14 triệu thì cả bốn rơi vào N5, không phải N3.

   Nhưng BẰNG CHỨNG thì theo số tiền của TỪNG KHOẢN, không theo gộp:
   không ai lấy được ba báo giá cho "cả tuần". Đòi thế là đòi một thứ
   không tồn tại, và một luật không làm nổi thì người ta học cách đi
   vòng qua nó.
   ═══════════════════════════════════════════════════════════════ */

const NGAY_GOP = 7;

const NAC_THANG = [
  {ma: 'N1', ten: 'Tiền lặt vặt',      tu: 0,        den: 1500000,
   neo: 'ba gói T2',            soDuyet: 0,
   canHoaDon: false, soBaoGia: 0, canHopDong: false,
   viec: 'Một người ghi thẳng vào sổ. Không phải chờ ai.'},

  {ma: 'N2', ten: 'Chi thường',        tu: 1500000,  den: 10000000,
   neo: 'dưới một gói T3',      soDuyet: 1,
   canHoaDon: false, soBaoGia: 0, canHopDong: false,
   viec: 'Một người duyệt, khác người ghi.'},

  {ma: 'N3', ten: 'Bằng học phí một nhà cả năm', tu: 10000000, den: 30000000,
   neo: 'một gói T3',           soDuyet: 1,
   canHoaDon: true,  soBaoGia: 0, canHopDong: false,
   viec: 'Một người duyệt, và phải có hoá đơn.'},

  {ma: 'N4', ten: 'Bằng trọn hành trình một nhà', tu: 30000000, den: 50000000,
   neo: 'một gói T4',           soDuyet: 1,
   canHoaDon: true,  soBaoGia: 2, canHopDong: false,
   viec: 'Một người duyệt, hoá đơn, và ít nhất hai báo giá để so.'},

  {ma: 'N5', ten: 'Bằng gói cao nhất Học viện bán', tu: 50000000, den: Infinity,
   neo: 'một gói T5',           soDuyet: 2,
   canHoaDon: true,  soBaoGia: 3, canHopDong: true,
   viec: 'HAI người duyệt, cả hai khác người ghi, hoá đơn, ba báo giá và hợp đồng.'}
];

/* Chốt của chủ hệ thống bản 9.92: "các khoản chi trên 1,5 triệu đồng
   đều phải khai báo xin cấp duyệt chi." Đọc là TỪ 1,5 triệu trở lên —
   đọc là "lớn hơn" thì có đúng một khoản lọt qua ở mép ngưỡng, và mép
   ngưỡng là chỗ người ta nhắm vào. */
const TRAN_PHAI_DUYET = NAC_THANG[1].tu;

/** Nấc của một số tiền. Biên DƯỚI tính vào nấc trên: 10 triệu chẵn là
    N3, không phải N2. */
function nacCua(tien) {
  for (let i = NAC_THANG.length - 1; i >= 0; i--)
    if (tien >= NAC_THANG[i].tu) return NAC_THANG[i];
  return NAC_THANG[0];
}

/* ══ PHÉP SOI NEO ══

   Thang neo vào giá gói. Giá gói đổi mà thang đứng yên thì cái neo
   thành lời nói suông — và tệ hơn, chú giải ở trên thành lời nói sai.

   Phép này KHÔNG tự dời thang theo giá: dời thang là quyết định của chủ
   hệ thống. Nó chỉ nêu ra rằng neo đã lệch, để người quyết biết mà
   quyết. Bộ thử gọi nó và đỏ khi có lệch. */
export function soatNeoThang() {
  const neo = {N3: GIA_TANG[3], N4: GIA_TANG[4], N5: GIA_TANG[5]};
  const lech = [];
  for (const n of NAC_THANG) {
    if (neo[n.ma] === undefined) continue;
    if (Number(n.tu) !== Number(neo[n.ma]))
      lech.push({nac: n.ma, thangDangDe: n.tu, giaGoiBayGio: neo[n.ma], neo: n.neo});
  }
  return {khop: lech.length === 0, lech,
    vi: 'Mỗi nấc neo vào giá một gói học phí. Giá gói đổi thì thang phải được ' +
        'CHỦ HỆ THỐNG chốt lại — phép này nêu ra chỗ lệch, không tự dời thang.'};
}

/* ═══════════════ GHI MỘT KHOẢN CHI ═══════════════

   Một cửa, hai lối. Dưới ngưỡng thì khoản chi vào thẳng sổ; từ ngưỡng
   trở lên nó nằm chờ duyệt. Người ghi không phải chọn lối — máy chọn
   theo số tiền, vì để người ghi tự chọn là để họ chọn lối dễ. */
export async function ghiChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 5) return {ok: false, code: 'NOPERM',
    error: 'Từ R01–R05 mới ghi được khoản chi.'};

  const c = y.chi || {};
  const muc = String(c.khoanMuc || '').trim();
  const tien = Number(c.soTien || 0);
  const dienGiai = String(c.dienGiai || '').trim();
  const hinhThuc = String(c.hinhThuc || '').trim();

  if (!KHOAN_MUC[muc]) return {ok: false,
    error: 'Khoản mục phải là một trong: ' + Object.keys(KHOAN_MUC).join(', ') + '.'};
  if (!(tien > 0)) return {ok: false, error: 'Số tiền chi phải lớn hơn 0.'};
  if (HINH_THUC.indexOf(hinhThuc) < 0) return {ok: false,
    error: 'Hình thức chi phải là một trong: ' + HINH_THUC.join(', ') + '.'};

  /* DIỄN GIẢI LÀ BẮT BUỘC. Một khoản chi không nói rõ chi cho việc gì
     thì sang năm không ai dựng lại được câu chuyện, và lúc bị hỏi thì
     người phải trả lời là người ký duyệt chứ không phải cái sổ. */
  if (dienGiai.length < 5) return {ok: false,
    error: 'Chưa nói rõ chi cho việc gì. Một khoản tiền ra khỏi Học viện mà ' +
           'không có diễn giải thì sang năm không ai dựng lại được câu chuyện.'};

  /* NGÀY CHI LÀ MỐC TIỀN RA, KHÔNG PHẢI MỐC NHẬP LIỆU.

     Nhập bù một khoản chi của tháng trước là chuyện thường; ghi nó vào
     hôm nay là đẩy chi phí sang sai kỳ, và bản kê hai tháng đều sai. */
  const ngayChi = String(c.ngayChi || '').trim() || new Date().toISOString();
  if (isNaN(new Date(ngayChi).getTime()))
    return {ok: false, error: 'Ngày chi không đọc được.'};
  if (new Date(ngayChi).getTime() > Date.now() + 86400000)
    return {ok: false, error: 'Ngày chi nằm ở tương lai. Khoản chi ghi khi tiền đã ra.'};

  /* ══ KHOẢN NÀY Ở NẤC NÀO ══

     Hai nấc, hai vai trò khác nhau:

       nacTien  — nấc của RIÊNG khoản này. Quyết định BẰNG CHỨNG phải
                  có, vì bằng chứng gắn với một lần mua.
       nacGop   — nấc của tổng bảy ngày. Quyết định CẤP DUYỆT, vì đây
                  là chỗ chặn chia nhỏ.

     Nấc THẬT áp cho khoản này là nấc cao hơn trong hai nấc ấy. */
  const gop = await gopBayNgay(db, muc, hoSo.u, ngayChi);
  const nacTien = nacCua(tien);
  const nacGop  = nacCua(gop + tien);
  const nac = NAC_THANG.indexOf(nacGop) > NAC_THANG.indexOf(nacTien) ? nacGop : nacTien;

  /* ── BẰNG CHỨNG THEO nacTien, KHÔNG THEO nacGop ──

     Không ai lấy được ba báo giá cho "cả tuần". Đòi thế là đòi một thứ
     không tồn tại, và một luật không làm nổi thì người ta học cách đi
     vòng qua nó — rồi đi vòng luôn cả những luật làm được. */
  const baoGia = Array.isArray(c.baoGia)
    ? c.baoGia.map(x => String(x).slice(0, 300)).filter(Boolean) : [];
  const hopDong = String(c.soHopDong || '').trim();
  const thieu = [];
  if (nacTien.canHoaDon && !c.coHoaDon) thieu.push('hoá đơn');
  if (baoGia.length < nacTien.soBaoGia)
    thieu.push('đủ ' + nacTien.soBaoGia + ' báo giá (đang có ' + baoGia.length + ')');
  if (nacTien.canHopDong && !hopDong) thieu.push('số hợp đồng');
  if (thieu.length)
    return {ok: false, code: 'THIEUCHUNGTU',
      nac: nacTien.ma,
      error: 'Khoản ' + dinhDang(tien) + ' thuộc nấc ' + nacTien.ma + ' — ' +
        nacTien.ten + '. Nấc này còn thiếu: ' + thieu.join(', ') + '.',
      nacNay: {ma: nacTien.ma, ten: nacTien.ten, viec: nacTien.viec}};

  const tuGhiDuoc = nac.soDuyet === 0;

  const id = 'CP-' + tokenMoi().slice(0, 14);
  const luc = new Date().toISOString();
  const coHoaDon = c.coHoaDon ? 1 : 0;

  await db.prepare(
    'INSERT INTO chiPhi (id,khoanMuc,soTien,ngayChi,hinhThuc,nhaCungCap,coHoaDon,' +
    'maHoaDon,minhChung,dienGiai,nguoiDeXuat,deXuatLuc,trangThai,tuGhi,nguoiDuyet,' +
    'duyetLuc,nac,baoGia,soBaoGia,soHopDong) ' +
    'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  ).bind(id, muc, tien, ngayChi, hinhThuc,
    String(c.nhaCungCap || '').slice(0, 200) || null, coHoaDon,
    coHoaDon ? (String(c.maHoaDon || '').slice(0, 100) || null) : null,
    String(c.minhChung || '').slice(0, 300) || null,
    dienGiai.slice(0, 1000), hoSo.u, luc,
    tuGhiDuoc ? 'daDuyet' : 'choDuyet', tuGhiDuoc ? 1 : 0,
    /* Lối tự ghi vẫn ghi TÊN NGƯỜI vào cột người duyệt — nhưng cột
       tuGhi nói rõ đó là chính người ấy, nên không ai đọc nhầm thành
       một khoản có hai người ký. */
    tuGhiDuoc ? hoSo.u : null, tuGhiDuoc ? luc : null,
    nac.ma, baoGia.length ? JSON.stringify(baoGia) : null, baoGia.length,
    hopDong.slice(0, 100) || null).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u,
    viec: tuGhiDuoc ? 'CHI_TUGHI' : 'CHI_DEXUAT',
    doiTuong: id, chiTiet: KHOAN_MUC[muc] + ' · ' + dinhDang(tien) + ' · nấc ' + nac.ma +
      (coHoaDon ? ' · có hoá đơn' : ' · KHÔNG hoá đơn') +
      (gop ? ' · gộp 7 ngày ' + dinhDang(gop + tien) : '')});

  return {ok: true, id, khoanMuc: muc, soTien: tien,
    trangThai: tuGhiDuoc ? 'daDuyet' : 'choDuyet',
    tuGhi: tuGhiDuoc,
    nac: nac.ma, tenNac: nac.ten, canMayNguoiDuyet: nac.soDuyet,
    gopBayNgay: gop + tien,
    /* Nói NGAY ở bước ghi rằng khoản này ở nấc nào và vì sao. Người ghi
       một khoản một triệu tư mà thấy nó vào "chờ duyệt" sẽ tưởng máy
       hỏng, nếu không ai nói cho họ biết tuần này họ đã ghi bao nhiêu ở
       cùng khoản mục. */
    biDayLenNacVi: nac !== nacTien
      ? 'Riêng khoản này ' + dinhDang(tien) + ' thuộc nấc ' + nacTien.ma +
        ', nhưng cộng với ' + dinhDang(gop) + ' đã ghi ở cùng khoản mục trong ' +
        NGAY_GOP + ' ngày thì thành ' + dinhDang(gop + tien) + ' — nấc ' + nac.ma + '.'
      : undefined,
    vi: nac.viec};
}

/* ── CỘNG DỒN BẢY NGÀY THEO (KHOẢN MỤC × NGƯỜI GHI) ──

   Chỉ cộng những khoản ĐÃ VÀO SỔ và còn hiệu lực: khoản bị từ chối hay
   bị huỷ không phải tiền đã ra, nên không được đẩy người ta qua cổng
   duyệt vì một khoản đã bỏ.

   Cửa sổ trượt quanh ngayChi chứ không quanh hôm nay: nhập bù một
   khoản của tuần trước phải cộng với những khoản của TUẦN ẤY. */
async function gopBayNgay(db, khoanMuc, nguoi, ngayChi) {
  const moc = new Date(ngayChi).getTime();
  const tu = new Date(moc - NGAY_GOP * 86400000).toISOString();
  const den = new Date(moc + NGAY_GOP * 86400000).toISOString();
  const r = await db.prepare(
    'SELECT COALESCE(SUM(soTien),0) t FROM chiPhi ' +
    'WHERE khoanMuc = ? AND nguoiDeXuat = ? AND ngayChi >= ? AND ngayChi <= ? ' +
    "AND trangThai IN ('daDuyet','choDuyet')"
  ).bind(khoanMuc, nguoi, tu, den).first();
  return Number(r.t);
}

/* ═══════════════ DUYỆT MỘT KHOẢN CHI ═══════════════ */
export async function duyetChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 3) return {ok: false, code: 'NOPERM', error: 'Chỉ R01–R03 duyệt được khoản chi.'};

  const cp = await db.prepare('SELECT * FROM chiPhi WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!cp) return {ok: false, error: 'Không tìm thấy khoản chi này.'};

  if (String(cp.nguoiDeXuat) === String(hoSo.u))
    return {ok: false, code: 'TUDUYET',
      error: 'Người đề xuất chi không tự duyệt được. Tiền đi RA thì phải có ' +
             'người thứ hai đứng giữa.'};

  /* Ngưỡng đọc ở lúc DUYỆT, không đọc ở lúc đề xuất: một khoản có thể
     nằm chờ nhiều ngày, và cấp duyệt phải đúng theo số tiền thật của
     nó chứ không theo cái đã kiểm hôm đề xuất. */
  /* CẤP DUYỆT LÀ MỘT LUẬT CHUNG CHO CẢ THANG, KHÔNG PHẢI MỘT CỘT
     CỦA TỪNG NẤC.

     Bản đầu tôi cho mỗi nấc một cột capDuyet. Cả năm nấc đều là 3 —
     đúng bằng cái sàn R01–R03 đã chặn ở đầu hàm — nên cái cột ấy không
     bao giờ chặn được gì: một phép kiểm không thể đỏ. Bộ thử bắt được
     ngay lần chạy đầu, vì R05 bị chặn ở sàn chứ không bị chặn ở cột.

     Đã bỏ cột. Thang này leo bằng SỐ CHỮ KÝ và BẰNG CHỨNG; leo bằng
     cấp bậc thì không leo được, vì tầng tài chính chỉ có ba vai. */
  const nac = NAC_THANG.find(x => x.ma === cp.nac) || nacCua(Number(cp.soTien));

  /* ── NGƯỜI THỨ HAI KHÔNG ĐƯỢC TRÙNG NGƯỜI THỨ NHẤT ──

     Nấc trên cùng đòi hai chữ ký. Không chặn chỗ này thì một người bấm
     duyệt hai lần là đủ hai chữ ký, và cả cái nấc ấy thành trang trí. */
  if (cp.nguoiDuyet && String(cp.nguoiDuyet) === String(hoSo.u))
    return {ok: false, code: 'DAKY',
      error: 'Bạn đã ký duyệt khoản này rồi. Nấc ' + nac.ma + ' cần ' + nac.soDuyet +
             ' người duyệt KHÁC NHAU.'};

  const duyet = y.duyet !== false;
  const gio = new Date().toISOString();

  /* Từ chối thì dừng ngay ở chữ ký đầu tiên — không cần người thứ hai
     để nói không. Một người thấy sai là đủ để khoản ấy không đi tiếp. */
  const chuKyThu = cp.nguoiDuyet ? 2 : 1;
  const duXong = !duyet || chuKyThu >= nac.soDuyet;

  const r = duXong
    ? await db.prepare(
        'UPDATE chiPhi SET trangThai = ?, ' +
        (chuKyThu === 2 ? 'nguoiDuyet2 = ?, duyetLuc2 = ?, ' : 'nguoiDuyet = ?, duyetLuc = ?, ') +
        "lyDo = ? WHERE id = ? AND trangThai = 'choDuyet'"
      ).bind(duyet ? 'daDuyet' : 'tuChoi', hoSo.u, gio,
        String(y.lyDo || '').slice(0, 500) || null, cp.id).run()
    /* Chữ ký thứ nhất của một nấc cần hai: ghi tên nhưng GIỮ NGUYÊN
       trạng thái choDuyet. Đổi sang daDuyet ở đây là cho tiền ra với
       một chữ ký, đúng cái nấc này sinh ra để chặn. */
    : await db.prepare(
        'UPDATE chiPhi SET nguoiDuyet = ?, duyetLuc = ? ' +
        "WHERE id = ? AND trangThai = 'choDuyet' AND nguoiDuyet IS NULL"
      ).bind(hoSo.u, gio, cp.id).run();

  if (!((r && r.meta && r.meta.changes) || 0))
    return {ok: false, error: 'Khoản chi này đã được xử lý rồi.'};

  if (!duXong) {
    await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'CHI_KY1',
      doiTuong: cp.id, chiTiet: 'nấc ' + nac.ma + ' · chữ ký 1/' + nac.soDuyet});
    return {ok: true, trangThai: 'choDuyet', nac: nac.ma,
      daKy: 1, canKy: nac.soDuyet, choNguoiThuHai: true,
      vi: 'Nấc ' + nac.ma + ' cần ' + nac.soDuyet + ' người duyệt khác nhau. ' +
          'Đã có chữ ký thứ nhất; khoản chi CHƯA vào sổ.'};
  }

  /* Chi phí rơi vào tuần ĐÃ CHỐT thì để lại bút toán, cùng luật với
     phiếu thu. Số DƯƠNG vì đây là một khoản chi thêm vào kỳ ấy. */
  const dc = duyet ? await ghiDieuChinh(db, {
    lucGoc: cp.ngayChi, loai: 'duyetChi', idChungTu: cp.id,
    soTien: Number(cp.soTien), boi: hoSo.u,
    dienGiai: 'Duyệt khoản chi thuộc kỳ đã chốt · ' + cp.dienGiai.slice(0, 200)}) : null;

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u,
    viec: duyet ? 'CHI_DUYET' : 'CHI_TUCHOI',
    doiTuong: cp.id, chiTiet: KHOAN_MUC[cp.khoanMuc] + ' · ' + dinhDang(cp.soTien)});

  return {ok: true, trangThai: duyet ? 'daDuyet' : 'tuChoi',
    nac: nac.ma, daKy: chuKyThu, canKy: nac.soDuyet,
    dieuChinh: dc ? {id: dc.id, kyBiAnhHuong: dc.kyBiAnhHuong} : undefined};
}

/* ═══════════════ HUỶ MỘT KHOẢN CHI ĐÃ DUYỆT ═══════════════

   Cùng luật với phiếu thu: huỷ là ĐÁNH DẤU, không phải xoá. Xoá dòng
   là xoá luôn bằng chứng rằng khoản ấy đã từng được duyệt — mà đó
   chính là thứ phải trưng ra khi có người hỏi. */
export async function huyChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 3) return {ok: false, error: 'Chỉ R01–R03 huỷ được khoản chi.'};

  const lyDo = String(y.lyDo || '').trim();
  if (!lyDo) return {ok: false, error: 'Chưa nói vì sao huỷ khoản chi này.'};

  const cp = await db.prepare('SELECT * FROM chiPhi WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!cp) return {ok: false, error: 'Không tìm thấy khoản chi này.'};

  const gio = new Date().toISOString();
  const r = await db.prepare(
    "UPDATE chiPhi SET trangThai = 'huy', huyLuc = ?, lyDo = ?, nguoiDuyet = ? " +
    "WHERE id = ? AND trangThai IN ('daDuyet','choDuyet')"
  ).bind(gio, lyDo, hoSo.u, cp.id).run();
  if (!((r && r.meta && r.meta.changes) || 0))
    return {ok: false, error: 'Khoản chi này đã huỷ hoặc đã bị từ chối rồi.'};

  const dc = cp.trangThai === 'daDuyet' ? await ghiDieuChinh(db, {
    lucGoc: cp.ngayChi, loai: 'huyChi', idChungTu: cp.id,
    soTien: -Number(cp.soTien), boi: hoSo.u,
    dienGiai: 'Huỷ khoản chi đã duyệt thuộc kỳ đã chốt · ' + lyDo}) : null;

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'CHI_HUY',
    doiTuong: cp.id, chiTiet: dinhDang(cp.soTien) + ' · ' + lyDo});
  return {ok: true, trangThai: 'huy',
    dieuChinh: dc ? {id: dc.id, kyBiAnhHuong: dc.kyBiAnhHuong} : undefined};
}

/* ═══════════════ SỔ CHI ═══════════════ */
export async function soChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 3) return {ok: false, code: 'NOPERM', error: 'Chỉ R01–R03 xem được sổ chi.'};

  const loc = [], gt = [];
  if (y.tu)  { loc.push('ngayChi >= ?'); gt.push(String(y.tu)); }
  if (y.den) { loc.push('ngayChi <= ?'); gt.push(String(y.den)); }
  if (y.khoanMuc) { loc.push('khoanMuc = ?'); gt.push(String(y.khoanMuc)); }
  if (y.trangThai) { loc.push('trangThai = ?'); gt.push(String(y.trangThai)); }

  const r = await db.prepare(
    'SELECT * FROM chiPhi' + (loc.length ? ' WHERE ' + loc.join(' AND ') : '') +
    ' ORDER BY ngayChi DESC LIMIT 500'
  ).bind(...gt).all();

  const ds = r.results || [];
  const daDuyet = ds.filter(x => x.trangThai === 'daDuyet');

  const theoMuc = {};
  for (const x of daDuyet) {
    const m = theoMuc[x.khoanMuc] || (theoMuc[x.khoanMuc] =
      {khoanMuc: x.khoanMuc, ten: KHOAN_MUC[x.khoanMuc] || x.khoanMuc,
       so: 0, tien: 0, coHoaDon: 0, khongHoaDon: 0, tuGhi: 0});
    m.so++; m.tien += Number(x.soTien);
    if (Number(x.coHoaDon)) m.coHoaDon += Number(x.soTien);
    else m.khongHoaDon += Number(x.soTien);
    if (Number(x.tuGhi)) m.tuGhi += Number(x.soTien);
  }

  /* HAI LỐI NÊU RIÊNG. Câu đầu tiên người đi kiểm tra hỏi là "khoản nào
     có hai người ký, khoản nào chỉ một" — trả lời được bằng phép lọc,
     không phải bằng cách đọc từng dòng. */
  const tuGhi = daDuyet.filter(x => Number(x.tuGhi));

  return {ok: true, so: ds.length,
    tongDaDuyet: daDuyet.reduce((a, x) => a + Number(x.soTien), 0),
    choDuyet: ds.filter(x => x.trangThai === 'choDuyet')
      .reduce((a, x) => a + Number(x.soTien), 0),
    quaCuaDuyet: {
      so: daDuyet.length - tuGhi.length,
      tien: daDuyet.filter(x => !Number(x.tuGhi))
        .reduce((a, x) => a + Number(x.soTien), 0)},
    loiTuGhi: {
      so: tuGhi.length,
      tien: tuGhi.reduce((a, x) => a + Number(x.soTien), 0),
      vi: 'Khoản dưới ' + dinhDang(TRAN_PHAI_DUYET) + ' ghi thẳng, một người. ' +
          'Cộng dồn theo khoản mục × người ghi trong ' + NGAY_GOP + ' ngày; vượt ' +
          'ngưỡng thì phải đi đường xin duyệt.'},
    theoKhoanMuc: Object.values(theoMuc).sort((a, b) => b.tien - a.tien),
    ds,
    theoNac: NAC_THANG.map(n => {
      const cua = daDuyet.filter(x => x.nac === n.ma);
      return {nac: n.ma, ten: n.ten, tu: n.tu,
        den: n.den === Infinity ? null : n.den,
        so: cua.length, tien: cua.reduce((a, x) => a + Number(x.soTien), 0)};
    }),
    thang: thangDuyetChi(),
    khoanMucCoThe: KHOAN_MUC};
}

/* ═══════════════════════════════════════════════════════════════
   CHỐT KÉT TIỀN MẶT

   Chuyển khoản có sao kê ngân hàng đứng ngoài làm chứng: sổ nói thu
   mười triệu mà ngân hàng nói tám thì lệch lộ ra ngay. Tiền mặt không
   có ai đứng ngoài — sổ nói bao nhiêu thì chỉ có sổ nói.

   Nên phải ĐẾM, và phải ghi cả hai con số: sổ nói bao nhiêu, đếm thật
   được bao nhiêu.

   MỘT KÉT KHÔNG BAO GIỜ LỆCH LÀ MỘT KÉT CHƯA BAO GIỜ ĐƯỢC ĐẾM. Nên
   phép này KHÔNG chặn chuyện lệch — lệch là chuyện thường, đếm nhầm,
   trả lại tiền thừa, quên ghi một phiếu. Nó chỉ đòi một điều: lệch thì
   phải có lý do, và lý do ở lại trong dòng.
   ═══════════════════════════════════════════════════════════════ */

const LECH_VN = 7 * 60 * 60 * 1000;

function dauNgayVN(ngay) {
  return new Date(new Date(ngay + 'T00:00:00.000Z').getTime() - LECH_VN).toISOString();
}
function cuoiNgayVN(ngay) {
  return new Date(new Date(ngay + 'T00:00:00.000Z').getTime() - LECH_VN
    + 86400000 - 1).toISOString();
}

export async function chotKet(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 5) return {ok: false, code: 'NOPERM',
    error: 'Từ R01–R05 mới chốt được két.'};

  const ngay = String(y.ngay || new Date(Date.now() + LECH_VN).toISOString().slice(0, 10));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ngay))
    return {ok: false, error: 'Ngày phải có dạng YYYY-MM-DD.'};

  const dem = Number(y.demThuc);
  if (!(dem >= 0) || y.demThuc === undefined || y.demThuc === null)
    return {ok: false, error: 'Chưa nhập số tiền ĐẾM THẬT được trong két.'};

  const tu = dauNgayVN(ngay), den = cuoiNgayVN(ngay);

  /* SỐ THEO SỔ CỦA MỘT NGÀY = tiền mặt thu trong ngày − tiền mặt chi
     trong ngày. Không cộng dồn từ đầu: két đếm và nộp ngân hàng theo
     ngày, nên số dư mang sang là chuyện của người giữ két chứ không
     phải của phép này. */
  const thu = await db.prepare(
    "SELECT COALESCE(SUM(soTien),0) t FROM phieuThu " +
    "WHERE trangThai = 'daDuyet' AND hinhThuc = 'tienMat' AND ghiLuc >= ? AND ghiLuc <= ?"
  ).bind(tu, den).first();
  const chi = await db.prepare(
    "SELECT COALESCE(SUM(soTien),0) t FROM chiPhi " +
    "WHERE trangThai = 'daDuyet' AND hinhThuc = 'tienMat' AND ngayChi >= ? AND ngayChi <= ?"
  ).bind(tu, den).first();

  const theoSo = Number(thu.t) - Number(chi.t);
  const chenh = dem - theoSo;
  const lyDo = String(y.lyDo || '').trim();

  /* LỆCH THÌ PHẢI CÓ LÝ DO. Cho chốt một két lệch mà không nói gì là
     dựng ra một chỗ tiền biến mất hợp lệ. */
  if (Math.abs(chenh) >= 1 && !lyDo)
    return {ok: false, code: 'LECHKHONGLYDO',
      error: 'Két lệch ' + dinhDang(chenh) + ' so với sổ (' + dinhDang(theoSo) +
        '). Lệch thì phải ghi lý do.',
      theoSo, demThuc: dem, chenh};

  const luc = new Date().toISOString();
  await db.prepare(
    'INSERT INTO chotKet (ngay,theoSo,demThuc,chenh,lyDo,boi,luc) VALUES (?,?,?,?,?,?,?) ' +
    'ON CONFLICT(ngay) DO UPDATE SET theoSo=excluded.theoSo, demThuc=excluded.demThuc, ' +
    'chenh=excluded.chenh, lyDo=excluded.lyDo, boi=excluded.boi, luc=excluded.luc'
  ).bind(ngay, theoSo, dem, chenh, lyDo || null, hoSo.u, luc).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'KET_CHOT',
    doiTuong: ngay, chiTiet: 'sổ ' + dinhDang(theoSo) + ' · đếm ' + dinhDang(dem) +
      ' · lệch ' + dinhDang(chenh) + (lyDo ? ' · ' + lyDo : '')});

  return {ok: true, ngay, theoSo, demThuc: dem, chenh, khop: Math.abs(chenh) < 1,
    vi: 'Một két không bao giờ lệch là một két chưa bao giờ được đếm. ' +
        'Phép này không chặn chuyện lệch — nó chỉ đòi lệch phải có lý do.'};
}

export async function dsChotKet(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 5) return {ok: false, code: 'NOPERM', error: 'Vai này không xem được sổ két.'};

  const r = await db.prepare(
    'SELECT * FROM chotKet ORDER BY ngay DESC LIMIT ?'
  ).bind(Number(y.soNgay) > 0 ? Number(y.soNgay) : 60).all();
  const ds = r.results || [];

  return {ok: true, so: ds.length, ds,
    soNgayLech: ds.filter(x => Math.abs(Number(x.chenh)) >= 1).length,
    tongLech: ds.reduce((a, x) => a + Number(x.chenh), 0)};
}

/* ═══════════════ THANG DUYỆT CHI, TRẢ VỀ NGUYÊN BẢN ═══════════════

   Màn hình phải VẼ được cái thang này, không phải chép lại nó. Chép lại
   là dựng bản thứ hai của một luật, và hai bản thì sẽ có ngày lệch —
   lúc ấy màn hình nói cần hai báo giá còn máy chủ đòi ba. */
export function thangDuyetChi() {
  return NAC_THANG.map(n => ({
    nac: n.ma, ten: n.ten, viec: n.viec, neo: n.neo,
    tu: n.tu, den: n.den === Infinity ? null : n.den,
    soNguoiDuyet: n.soDuyet, capDuyet: 'R01–R03',
    canHoaDon: n.canHoaDon, soBaoGia: n.soBaoGia, canHopDong: n.canHopDong
  }));
}

export async function xemThangDuyetChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 5) return {ok: false, code: 'NOPERM', error: 'Vai này không xem được thang duyệt chi.'};
  const neo = soatNeoThang();
  return {ok: true, thang: thangDuyetChi(), cuaSoGopNgay: NGAY_GOP,
    neoConKhop: neo.khop, neoLech: neo.khop ? undefined : neo.lech,
    vi: 'Cấp duyệt tính theo TỔNG GỘP ' + NGAY_GOP + ' ngày (chặn chia nhỏ); ' +
        'bằng chứng tính theo số tiền của TỪNG khoản (không ai lấy được ba báo ' +
        'giá cho cả tuần).'};
}

export { KHOAN_MUC, TRAN_PHAI_DUYET, NGAY_GOP, NAC_THANG };
