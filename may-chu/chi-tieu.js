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
import { ghiDieuChinh, dungKy } from './bao-cao.js';

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

   ══ TRẦN CHU KỲ — LỖ THỦNG CỦA CHÍNH PHÉP SOI TRÊN ══

   Chốt của chủ hệ thống bản 9.95: "Tổng các khoản chi cần tổng hợp
   lại. Tổng chi theo chu kỳ là 10 triệu đồng là phải báo cáo xác minh,
   duyệt chi đầy đủ, để ngăn chặn thất thoát tự do các khoản chi nhỏ."

   Chủ hệ thống chỉ đúng một lỗ thủng trong phép soi chia nhỏ mà tôi
   dựng ở 9.92: NÓ CHỈ CỘNG TRONG MỘT KHOẢN MỤC.

     1,4 triệu văn phòng
     1,4 triệu tiếp thị
     1,4 triệu đào tạo
     1,4 triệu hạ tầng …

   Mỗi khoản đều dưới ngưỡng, mỗi khoản mục đều sạch, và cả bốn đi lối
   tự ghi. Cứ thế thì một người tiêu bao nhiêu cũng được, không ai ký
   một chữ nào. Đó đúng là "thất thoát tự do các khoản chi nhỏ", và
   phép soi 9.92 không nhìn thấy nó vì nó nhìn theo cột dọc.

   Nên thêm một trần nhìn theo cột NGANG:

     TỔNG MỌI KHOẢN CHI của MỘT NGƯỜI trong MỘT CHU KỲ, cộng qua tất cả
     khoản mục. Chạm 10 triệu thì LỐI TỰ GHI ĐÓNG LẠI với người ấy cho
     hết chu kỳ — mọi khoản sau đó, dù nhỏ đến đâu, đều phải có người
     thứ hai ký.

   Hai phép soi bắt hai kiểu khác nhau và không thay được nhau:

     gộp 7 ngày theo khoản mục — bắt CHIA NHỎ, nhanh, ngưỡng thấp
     trần chu kỳ theo người   — bắt KHỐI LƯỢNG, chậm, ngưỡng cao

   ══ BA CHỖ TÔI CHỌN, KHAI RA ĐỂ CHỦ HỆ CHỐT LẠI ══

   1. CHU KỲ LÀ THÁNG. Chủ hệ nói "chu kỳ" mà không nói tháng hay tuần.
      Chọn tháng vì kỳ kế toán và báo cáo chi đều mặc định theo tháng,
      và một trần ngân sách theo tháng là cách mọi nơi vẫn làm.

   2. TRẦN TÍNH THEO NGƯỜI, không theo cả Học viện. Mười triệu cho toàn
      Học viện một tháng thì chạm trần ngay ngày đầu và cái trần thành
      vô nghĩa. Câu "thất thoát tự do" cũng nói về một người tiêu vặt,
      không nói về tổng chi của tổ chức.

   3. CỘNG MỌI KHOẢN CHI, không chỉ cộng khoản đi lối tự ghi. Đọc hẹp
      hơn thì chỉ cộng phần chưa ai ký; đọc rộng thì cộng tất. Chọn
      cách rộng vì nó chặt hơn, và vì một người đã tiêu mười triệu
      trong tháng chính là người mà khoản hai trăm nghìn tiếp theo
      đáng có thêm một cặp mắt.

   Trần neo vào GIÁ MỘT GÓI T3, cùng cái neo với nấc N3: một người tiêu
   hết học phí cả năm của một nhà trong một chu kỳ thì phải giải trình.
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

/* Trần chu kỳ — chốt của chủ hệ thống bản 9.95. Neo vào giá gói T3,
   cùng cái neo với nấc N3. */
const TRAN_CHU_KY = NAC_THANG[2].tu;

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
  if (Number(TRAN_CHU_KY) !== Number(GIA_TANG[3]))
    lech.push({nac: 'TRẦN CHU KỲ', thangDangDe: TRAN_CHU_KY,
      giaGoiBayGio: GIA_TANG[3], neo: 'một gói T3'});
  return {khop: lech.length === 0, lech,
    vi: 'Mỗi nấc neo vào giá một gói học phí, và trần chu kỳ neo vào gói T3. ' +
        'Giá gói đổi thì thang phải được CHỦ HỆ THỐNG chốt lại — phép này nêu ra ' +
        'chỗ lệch, không tự dời thang.'};
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

  /* ── TRẦN CHU KỲ: PHÉP SOI NHÌN THEO CỘT NGANG ──

     Phép gộp ở trên nhìn theo cột DỌC — một khoản mục. Nó không thấy
     người rải tiền ngang qua nhiều khoản mục, mỗi chỗ một ít. Trần này
     cộng MỌI khoản mục của một người trong chu kỳ. */
  const chuKy = await tongChuKy(db, hoSo.u, ngayChi);
  const chamTran = (chuKy.tong + tien) >= TRAN_CHU_KY;

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

  /* Chạm trần chu kỳ thì LỐI TỰ GHI ĐÓNG, dù khoản này nhỏ đến đâu.
     Nấc thang không đổi — bằng chứng vẫn theo số tiền của khoản này —
     chỉ cái lối vào sổ đổi: từ đây phải có người thứ hai ký. */
  const tuGhiDuoc = nac.soDuyet === 0 && !chamTran;

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
      (gop ? ' · gộp 7 ngày ' + dinhDang(gop + tien) : '') +
      (chamTran ? ' · CHẠM TRẦN CHU KỲ ' + dinhDang(chuKy.tong + tien) : '')});

  return {ok: true, id, khoanMuc: muc, soTien: tien,
    trangThai: tuGhiDuoc ? 'daDuyet' : 'choDuyet',
    tuGhi: tuGhiDuoc,
    nac: nac.ma, tenNac: nac.ten,
    /* Chạm trần thì cần ÍT NHẤT một chữ ký, kể cả khi nấc của khoản là
       N1. Nói con số thật ra đây để màn hình không phải tự suy. */
    canMayNguoiDuyet: Math.max(nac.soDuyet, chamTran ? 1 : 0),
    gopBayNgay: gop + tien,
    chuKy: {ky: chuKy.ky, daChi: chuKy.tong + tien, tran: TRAN_CHU_KY,
      chamTran, conLai: Math.max(0, TRAN_CHU_KY - chuKy.tong - tien)},
    biDongLoiTuGhiVi: (chamTran && nac.soDuyet === 0)
      ? 'Khoản này ' + dinhDang(tien) + ' vốn thuộc lối tự ghi, nhưng tổng chi ' +
        'của bạn trong ' + chuKy.ky + ' đã là ' + dinhDang(chuKy.tong + tien) +
        ' — chạm trần chu kỳ ' + dinhDang(TRAN_CHU_KY) + '. Từ đây tới hết chu kỳ, ' +
        'mọi khoản đều phải có người thứ hai ký.'
      : undefined,
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
/* ── TỔNG CHI CỦA MỘT NGƯỜI TRONG MỘT CHU KỲ ──

   Cộng MỌI khoản mục, khác hẳn phép gộp bảy ngày ở dưới. Chu kỳ là
   THÁNG theo giờ Việt Nam — dùng chung phép dựng kỳ với cả sổ báo cáo,
   nên "tháng 9" ở đây và "tháng 9" ở bản kế toán là cùng một khoảng.

   Chỉ cộng khoản còn hiệu lực: khoản bị từ chối hay bị huỷ không phải
   tiền đã ra, nên không được đẩy người ta chạm trần vì một khoản đã bỏ. */
async function tongChuKy(db, nguoi, ngayChi) {
  const k = dungKy('thang', new Date(new Date(ngayChi).getTime() + 7 * 3600e3)
    .toISOString().slice(0, 10));
  const r = await db.prepare(
    'SELECT COALESCE(SUM(soTien),0) t, COUNT(*) n FROM chiPhi ' +
    'WHERE nguoiDeXuat = ? AND ngayChi >= ? AND ngayChi <= ? ' +
    "AND trangThai IN ('daDuyet','choDuyet')"
  ).bind(nguoi, k.tuLuc, k.denLuc).first();
  return {ky: k.ky, tong: Number(r.t), so: Number(r.n), tuLuc: k.tuLuc, denLuc: k.denLuc};
}

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

/* ═══════════════════════════════════════════════════════════════
   BÁO CÁO CHI — CHỐT CỦA CHỦ HỆ THỐNG BẢN 9.94

   "Chi phí từ 1,5 triệu trở lên phải báo cáo."

   ══ DUYỆT VÀ BÁO CÁO LÀ HAI VIỆC KHÁC NHAU ══

   Duyệt là một cái CỔNG: nó đứng trước, và nó chặn. Báo cáo là một tấm
   GƯƠNG: nó đứng sau, và nó cho người ta nhìn thấy tất cả những gì đã
   đi qua cổng.

   Chỉ có cổng mà không có gương thì mỗi khoản đều đúng luật lúc nó đi
   qua, mà không ai nhìn thấy hình dạng của cả dòng tiền. Người duyệt
   khoản thứ mười bảy trong tháng không biết đó là khoản thứ mười bảy.

   ══ BÁO CÁO NÀY KHÔNG PHẢI MỘT CON SỐ TỔNG ══

   Một con số tổng thì bản kế toán đã có. Cái người đọc báo cáo chi cần
   là DẤU VẾT: mỗi khoản ai đề xuất, ai ký, ký mấy chữ, chứng từ đủ
   chưa, có bị đẩy nấc vì chia nhỏ không.

   Nên nó trả về TỪNG KHOẢN, và nêu lên đầu bốn thứ đáng hỏi:

     · khoản đi lối tự ghi mà lẽ ra phải duyệt (không được có cái nào)
     · khoản còn treo chưa ai duyệt
     · khoản thiếu hoá đơn ở nấc đòi hoá đơn
     · khoản bị ĐẨY NẤC vì cộng dồn — dấu hiệu chia nhỏ
   ═══════════════════════════════════════════════════════════════ */
export async function baoCaoChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 3) return {ok: false, code: 'NOPERM',
    error: 'Chỉ R01–R03 xem được báo cáo chi.'};

  const k = dungKy(String(y.loai || 'thang'),
    String(y.moc || new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10)));
  if (!k) return {ok: false, error: 'Kỳ báo cáo không hợp lệ.'};

  /* NGƯỠNG BÁO CÁO ĐÚNG BẰNG NGƯỠNG PHẢI DUYỆT. Hai con số ấy là một:
     cái phải xin phép trước khi tiêu là cái phải trưng ra sau khi tiêu.
     Để chúng thành hai hằng số riêng là để chúng có ngày lệch nhau. */
  const r = await db.prepare(
    'SELECT * FROM chiPhi WHERE soTien >= ? AND ngayChi >= ? AND ngayChi <= ? ' +
    'ORDER BY soTien DESC'
  ).bind(TRAN_PHAI_DUYET, k.tuLuc, k.denLuc).all();
  const ds = r.results || [];

  const khoan = ds.map(x => {
    const nac = NAC_THANG.find(n => n.ma === x.nac) || nacCua(Number(x.soTien));
    const kyDu = (x.nguoiDuyet ? 1 : 0) + (x.nguoiDuyet2 ? 1 : 0);
    return {
      id: x.id, ngayChi: x.ngayChi, khoanMuc: x.khoanMuc,
      tenKhoanMuc: KHOAN_MUC[x.khoanMuc] || x.khoanMuc,
      soTien: Number(x.soTien), nac: x.nac, tenNac: nac.ten,
      dienGiai: x.dienGiai, nhaCungCap: x.nhaCungCap || undefined,
      hinhThuc: x.hinhThuc, trangThai: x.trangThai,
      nguoiDeXuat: x.nguoiDeXuat,
      nguoiDuyet: x.nguoiDuyet || undefined,
      nguoiDuyet2: x.nguoiDuyet2 || undefined,
      daKy: kyDu, canKy: nac.soDuyet,
      coHoaDon: !!Number(x.coHoaDon), maHoaDon: x.maHoaDon || undefined,
      soBaoGia: Number(x.soBaoGia), soHopDong: x.soHopDong || undefined,
      /* Khoản có nấc CAO HƠN nấc của riêng số tiền nó = đã bị đẩy lên vì
         cộng dồn bảy ngày. Đây là dấu hiệu chia nhỏ, và nó phải hiện
         lên mặt báo cáo chứ không nằm trong một cột người ta phải tự
         suy ra. */
      biDayNac: NAC_THANG.indexOf(nac) >
                NAC_THANG.indexOf(nacCua(Number(x.soTien))) || undefined
    };
  });

  const daDuyet = khoan.filter(x => x.trangThai === 'daDuyet');
  const theoMuc = {};
  for (const x of daDuyet) {
    const m = theoMuc[x.khoanMuc] || (theoMuc[x.khoanMuc] =
      {khoanMuc: x.khoanMuc, ten: x.tenKhoanMuc, so: 0, tien: 0});
    m.so++; m.tien += x.soTien;
  }

  /* ── BỐN THỨ ĐÁNG HỎI, NÊU LÊN ĐẦU ──
     Chôn chúng trong danh sách là để người đọc tự tìm, mà người đọc
     một báo cáo dài thì không tìm. */
  const canHoi = {
    lotLoiTuGhi: khoan.filter(x => ds.find(d => d.id === x.id && Number(d.tuGhi))),
    conTreoChuaDuyet: khoan.filter(x => x.trangThai === 'choDuyet'),
    thieuHoaDon: daDuyet.filter(x => !x.coHoaDon &&
      (NAC_THANG.find(n => n.ma === x.nac) || {}).canHoaDon),
    biDayNacViGopDon: khoan.filter(x => x.biDayNac)
  };

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'BAOCAO_CHI',
    doiTuong: k.ky, chiTiet: khoan.length + ' khoản từ ' + dinhDang(TRAN_PHAI_DUYET)});

  return {ok: true, ky: k.ky, loai: k.loai, tuNgay: k.tuNgay, denNgay: k.denNgay,
    tuNguong: TRAN_PHAI_DUYET,
    so: khoan.length,
    tongDaDuyet: daDuyet.reduce((a, x) => a + x.soTien, 0),
    tongConTreo: canHoi.conTreoChuaDuyet.reduce((a, x) => a + x.soTien, 0),
    theoKhoanMuc: Object.values(theoMuc).sort((a, b) => b.tien - a.tien),
    theoNac: NAC_THANG.filter(n => n.soDuyet > 0).map(n => {
      const cua = daDuyet.filter(x => x.nac === n.ma);
      return {nac: n.ma, ten: n.ten, so: cua.length,
        tien: cua.reduce((a, x) => a + x.soTien, 0)};
    }),
    canHoi: {
      sach: !canHoi.lotLoiTuGhi.length && !canHoi.thieuHoaDon.length,
      lotLoiTuGhi: canHoi.lotLoiTuGhi,
      conTreoChuaDuyet: canHoi.conTreoChuaDuyet,
      thieuHoaDon: canHoi.thieuHoaDon,
      biDayNacViGopDon: canHoi.biDayNacViGopDon
    },
    khoan,
    vi: 'Chốt của chủ hệ thống: chi phí TỪ ' + dinhDang(TRAN_PHAI_DUYET) +
        ' TRỞ LÊN phải báo cáo. Ngưỡng báo cáo đúng bằng ngưỡng phải duyệt — ' +
        'cái phải xin phép trước khi tiêu là cái phải trưng ra sau khi tiêu.'};
}

/* ═══════════════════════════════════════════════════════════════
   TỔNG HỢP CHI THEO NGƯỜI VÀ THEO CHU KỲ

   "Tổng các khoản chi cần tổng hợp lại." Đây là bản tổng hợp ấy, và nó
   nhìn theo CỘT NGANG: mỗi người một dòng, cộng qua mọi khoản mục.

   Báo cáo chi ở trên nhìn theo từng khoản; bản này nhìn theo người.
   Hai câu hỏi khác nhau:

     baoCaoChi   — khoản nào đã đi ra, ai ký, chứng từ đủ chưa
     tongHopChi  — AI đang tiêu bao nhiêu, và ai sắp chạm trần

   Câu thứ hai là câu chặn thất thoát. Một người rải bốn khoản một
   triệu tư qua bốn khoản mục thì mọi bản kê theo khoản mục đều sạch,
   và chỉ bản kê theo NGƯỜI mới thấy.
   ═══════════════════════════════════════════════════════════════ */
export async function tongHopChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 3) return {ok: false, code: 'NOPERM',
    error: 'Chỉ R01–R03 xem được bản tổng hợp chi.'};

  const k = dungKy(String(y.loai || 'thang'),
    String(y.moc || new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10)));
  if (!k) return {ok: false, error: 'Kỳ tổng hợp không hợp lệ.'};

  const r = await db.prepare(
    'SELECT nguoiDeXuat, ' +
    '  COUNT(*) so, COALESCE(SUM(soTien),0) tong, ' +
    '  COALESCE(SUM(CASE WHEN tuGhi = 1 THEN soTien END),0) tuGhi, ' +
    '  SUM(CASE WHEN tuGhi = 1 THEN 1 ELSE 0 END) soTuGhi, ' +
    "  COALESCE(SUM(CASE WHEN trangThai = 'choDuyet' THEN soTien END),0) treo, " +
    '  MIN(soTien) nhoNhat, MAX(soTien) lonNhat, ' +
    '  COUNT(DISTINCT khoanMuc) soKhoanMuc ' +
    'FROM chiPhi WHERE ngayChi >= ? AND ngayChi <= ? ' +
    "  AND trangThai IN ('daDuyet','choDuyet') " +
    'GROUP BY nguoiDeXuat ORDER BY tong DESC'
  ).bind(k.tuLuc, k.denLuc).all();

  const nguoi = (r.results || []).map(x => {
    const tong = Number(x.tong);
    return {
      nguoi: x.nguoiDeXuat, soKhoan: Number(x.so), tong,
      tuGhi: Number(x.tuGhi), soKhoanTuGhi: Number(x.soTuGhi),
      conTreo: Number(x.treo),
      soKhoanMuc: Number(x.soKhoanMuc),
      nhoNhat: Number(x.nhoNhat), lonNhat: Number(x.lonNhat),
      /* Trung bình một khoản. Số này nhỏ mà tổng lớn là hình dạng của
         chuyện rải tiền vặt — đúng thứ trần chu kỳ sinh ra để chặn. */
      trungBinh: Math.round(tong / Number(x.so)),
      chamTran: tong >= TRAN_CHU_KY,
      conLaiTruocTran: Math.max(0, TRAN_CHU_KY - tong),
      /* Sắp chạm là lúc đáng nói, không phải lúc đã chạm: chạm rồi thì
         cổng đã tự đóng, còn sắp chạm thì người phụ trách còn kịp hỏi. */
      sapChamTran: tong < TRAN_CHU_KY && tong >= TRAN_CHU_KY * 0.8
    };
  });

  const tong = nguoi.reduce((a, x) => a + x.tong, 0);

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'TONGHOP_CHI',
    doiTuong: k.ky, chiTiet: nguoi.length + ' người · ' + dinhDang(tong)});

  return {ok: true, ky: k.ky, loai: k.loai, tuNgay: k.tuNgay, denNgay: k.denNgay,
    tranChuKy: TRAN_CHU_KY,
    soNguoi: nguoi.length,
    tongChi: tong,
    tongTuGhi: nguoi.reduce((a, x) => a + x.tuGhi, 0),
    tongConTreo: nguoi.reduce((a, x) => a + x.conTreo, 0),
    theoNguoi: nguoi,
    daChamTran: nguoi.filter(x => x.chamTran),
    sapChamTran: nguoi.filter(x => x.sapChamTran),
    vi: 'Trần chu kỳ ' + dinhDang(TRAN_CHU_KY) + ' cho MỘT NGƯỜI trong MỘT CHU KỲ, ' +
        'cộng qua MỌI khoản mục. Chạm trần thì lối tự ghi đóng lại với người ấy tới ' +
        'hết chu kỳ. Bản này nhìn theo NGƯỜI; một người rải bốn khoản nhỏ qua bốn ' +
        'khoản mục thì mọi bản kê theo khoản mục đều sạch, chỉ bản này thấy.'};
}

export async function xemThangDuyetChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 5) return {ok: false, code: 'NOPERM', error: 'Vai này không xem được thang duyệt chi.'};
  const neo = soatNeoThang();
  return {ok: true, thang: thangDuyetChi(), cuaSoGopNgay: NGAY_GOP,
    tranChuKy: TRAN_CHU_KY, chuKy: 'tháng',
    neoConKhop: neo.khop, neoLech: neo.khop ? undefined : neo.lech,
    vi: 'Cấp duyệt tính theo TỔNG GỘP ' + NGAY_GOP + ' ngày (chặn chia nhỏ); ' +
        'bằng chứng tính theo số tiền của TỪNG khoản (không ai lấy được ba báo ' +
        'giá cho cả tuần). Và trần chu kỳ ' + dinhDang(TRAN_CHU_KY) + ' một người ' +
        'một tháng, cộng qua MỌI khoản mục: chạm trần thì lối tự ghi đóng lại.'};
}

export { KHOAN_MUC, TRAN_PHAI_DUYET, TRAN_CHU_KY, NGAY_GOP, NAC_THANG };
