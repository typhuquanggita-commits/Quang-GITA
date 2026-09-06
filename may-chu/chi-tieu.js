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

/* ══ BA BẬC CỦA MỘT KHOẢN CHI ══

   Chốt của chủ hệ thống, bản 9.92: "các khoản chi trên 1,5 triệu đồng
   đều phải khai báo xin cấp duyệt chi."

     dưới 1,5 triệu   — LỐI TỰ GHI. Một người ghi thẳng vào sổ, không
                        phải chờ ai. Mua giấy in, gửi xe, nước uống:
                        bắt hai người ký cho một khoản trăm nghìn là
                        làm cho cả cái cổng duyệt bị người ta né.
     từ 1,5 triệu     — PHẢI XIN DUYỆT. Người đề xuất khác người duyệt.
     từ 20 triệu      — chỉ Giám đốc điều hành (R01) duyệt.

   Hai con số là quyết định của chủ hệ thống, không phải của mã. Để
   thành hai dòng ở đây để đổi được mà không phải đi tìm.

   ══ MỘT NGƯỠNG KHÔNG CÓ PHÉP SOI CHIA NHỎ THÌ KHÔNG PHẢI NGƯỠNG ══

   Đây là chỗ mọi cổng duyệt theo số tiền đều bị né, và né bằng cách
   đơn giản nhất: một khoản ba triệu ghi thành hai khoản một triệu tư.
   Không ai phải nói dối câu nào, và cổng duyệt không hề biết.

   Nên lối tự ghi cộng dồn theo (khoản mục × người ghi) trong bảy ngày.
   Cộng lại vượt ngưỡng thì khoản ấy phải đi đường xin duyệt, dù một
   mình nó còn dưới. Bảy ngày chứ không phải một ngày: chia theo ngày
   là cách né tiếp theo, và nó dễ y như cách đầu. */
const TRAN_PHAI_DUYET = 1500000;
const TRAN_R01_DUYET  = 20000000;
const NGAY_GOP        = 7;

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

  /* ══ KHOẢN NÀY ĐI LỐI NÀO ══

     Dưới ngưỡng VÀ cộng dồn bảy ngày cũng còn dưới → tự ghi. Chạm một
     trong hai điều kiện → phải xin duyệt. */
  const gop = await gopBayNgay(db, muc, hoSo.u, ngayChi);
  const tuGhiDuoc = tien < TRAN_PHAI_DUYET && (gop + tien) < TRAN_PHAI_DUYET;

  const id = 'CP-' + tokenMoi().slice(0, 14);
  const luc = new Date().toISOString();
  const coHoaDon = c.coHoaDon ? 1 : 0;

  await db.prepare(
    'INSERT INTO chiPhi (id,khoanMuc,soTien,ngayChi,hinhThuc,nhaCungCap,coHoaDon,' +
    'maHoaDon,minhChung,dienGiai,nguoiDeXuat,deXuatLuc,trangThai,tuGhi,nguoiDuyet,duyetLuc) ' +
    'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  ).bind(id, muc, tien, ngayChi, hinhThuc,
    String(c.nhaCungCap || '').slice(0, 200) || null, coHoaDon,
    coHoaDon ? (String(c.maHoaDon || '').slice(0, 100) || null) : null,
    String(c.minhChung || '').slice(0, 300) || null,
    dienGiai.slice(0, 1000), hoSo.u, luc,
    tuGhiDuoc ? 'daDuyet' : 'choDuyet', tuGhiDuoc ? 1 : 0,
    /* Lối tự ghi vẫn ghi TÊN NGƯỜI vào cột người duyệt — nhưng cột
       tuGhi nói rõ đó là chính người ấy, nên không ai đọc nhầm thành
       một khoản có hai người ký. */
    tuGhiDuoc ? hoSo.u : null, tuGhiDuoc ? luc : null).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u,
    viec: tuGhiDuoc ? 'CHI_TUGHI' : 'CHI_DEXUAT',
    doiTuong: id, chiTiet: KHOAN_MUC[muc] + ' · ' + dinhDang(tien) +
      (coHoaDon ? ' · có hoá đơn' : ' · KHÔNG hoá đơn') +
      (tuGhiDuoc ? ' · lối tự ghi' : ' · chờ duyệt') +
      (gop ? ' · gộp 7 ngày ' + dinhDang(gop + tien) : '')});

  return {ok: true, id, khoanMuc: muc, soTien: tien,
    trangThai: tuGhiDuoc ? 'daDuyet' : 'choDuyet',
    tuGhi: tuGhiDuoc,
    canR01: tien >= TRAN_R01_DUYET,
    gopBayNgay: gop + tien,
    /* Nói NGAY ở bước ghi rằng khoản này đi lối nào và vì sao. Người
       ghi một khoản một triệu tư mà thấy nó vào "chờ duyệt" sẽ tưởng
       máy hỏng, nếu không ai nói cho họ biết tuần này họ đã ghi bao
       nhiêu ở cùng khoản mục. */
    vi: tuGhiDuoc
      ? 'Dưới ' + dinhDang(TRAN_PHAI_DUYET) + ' — ghi thẳng vào sổ, không phải chờ duyệt.'
      : (tien < TRAN_PHAI_DUYET
          ? 'Riêng khoản này ' + dinhDang(tien) + ' là dưới ngưỡng, nhưng cộng với ' +
            dinhDang(gop) + ' đã ghi ở cùng khoản mục trong ' + NGAY_GOP + ' ngày thì ' +
            'thành ' + dinhDang(gop + tien) + ' — từ ' + dinhDang(TRAN_PHAI_DUYET) +
            ' trở lên phải xin duyệt.'
          : 'Từ ' + dinhDang(TRAN_PHAI_DUYET) + ' trở lên phải xin duyệt chi.') +
        (tien >= TRAN_R01_DUYET
          ? ' Và từ ' + dinhDang(TRAN_R01_DUYET) +
            ' trở lên chỉ Giám đốc điều hành (R01) duyệt.' : '')};
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
  if (Number(cp.soTien) >= TRAN_R01_DUYET && lv > 1)
    return {ok: false, code: 'VUOTTRAN',
      error: 'Khoản ' + dinhDang(cp.soTien) + ' từ ' + dinhDang(TRAN_R01_DUYET) +
        ' trở lên. Chỉ Giám đốc điều hành (R01) duyệt được.'};

  const duyet = y.duyet !== false;
  const gio = new Date().toISOString();
  const r = await db.prepare(
    'UPDATE chiPhi SET trangThai = ?, nguoiDuyet = ?, duyetLuc = ?, lyDo = ? ' +
    "WHERE id = ? AND trangThai = 'choDuyet'"
  ).bind(duyet ? 'daDuyet' : 'tuChoi', hoSo.u, gio,
    String(y.lyDo || '').slice(0, 500) || null, cp.id).run();
  if (!((r && r.meta && r.meta.changes) || 0))
    return {ok: false, error: 'Khoản chi này đã được xử lý rồi.'};

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
    nguong: {phaiXinDuyet: TRAN_PHAI_DUYET, chiR01Duyet: TRAN_R01_DUYET,
             cuaSoGopNgay: NGAY_GOP},
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

export { KHOAN_MUC, TRAN_PHAI_DUYET, TRAN_R01_DUYET, NGAY_GOP };
