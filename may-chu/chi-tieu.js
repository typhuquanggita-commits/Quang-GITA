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

/* Quá ngưỡng này thì chỉ R01 duyệt. Con số là quyết định của chủ hệ
   thống; để ở đây thành MỘT dòng để đổi được mà không phải đi tìm. */
const TRAN_R03_DUYET = 20000000;

/* ═══════════════ ĐỀ XUẤT MỘT KHOẢN CHI ═══════════════ */
export async function deXuatChi(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 5) return {ok: false, code: 'NOPERM',
    error: 'Từ R01–R05 mới đề xuất được khoản chi.'};

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

  const id = 'CP-' + tokenMoi().slice(0, 14);
  const luc = new Date().toISOString();
  const coHoaDon = c.coHoaDon ? 1 : 0;

  await db.prepare(
    'INSERT INTO chiPhi (id,khoanMuc,soTien,ngayChi,hinhThuc,nhaCungCap,coHoaDon,' +
    'maHoaDon,minhChung,dienGiai,nguoiDeXuat,deXuatLuc,trangThai) ' +
    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'choDuyet')"
  ).bind(id, muc, tien, ngayChi, hinhThuc,
    String(c.nhaCungCap || '').slice(0, 200) || null, coHoaDon,
    coHoaDon ? (String(c.maHoaDon || '').slice(0, 100) || null) : null,
    String(c.minhChung || '').slice(0, 300) || null,
    dienGiai.slice(0, 1000), hoSo.u, luc).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'CHI_DEXUAT',
    doiTuong: id, chiTiet: KHOAN_MUC[muc] + ' · ' + dinhDang(tien) +
      (coHoaDon ? ' · có hoá đơn' : ' · KHÔNG hoá đơn')});

  return {ok: true, id, khoanMuc: muc, soTien: tien, trangThai: 'choDuyet',
    canR01: tien > TRAN_R03_DUYET,
    /* Nói ngay ở bước đề xuất rằng khoản này phải lên tới đâu, để người
       đề xuất không chờ một cấp duyệt sẽ không bao giờ duyệt được. */
    vi: tien > TRAN_R03_DUYET
      ? 'Khoản trên ' + dinhDang(TRAN_R03_DUYET) + ' chỉ Giám đốc điều hành (R01) duyệt.'
      : undefined};
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
  if (Number(cp.soTien) > TRAN_R03_DUYET && lv > 1)
    return {ok: false, code: 'VUOTTRAN',
      error: 'Khoản ' + dinhDang(cp.soTien) + ' vượt ngưỡng ' +
        dinhDang(TRAN_R03_DUYET) + '. Chỉ Giám đốc điều hành (R01) duyệt được.'};

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
       so: 0, tien: 0, coHoaDon: 0, khongHoaDon: 0});
    m.so++; m.tien += Number(x.soTien);
    if (Number(x.coHoaDon)) m.coHoaDon += Number(x.soTien);
    else m.khongHoaDon += Number(x.soTien);
  }

  return {ok: true, so: ds.length,
    tongDaDuyet: daDuyet.reduce((a, x) => a + Number(x.soTien), 0),
    choDuyet: ds.filter(x => x.trangThai === 'choDuyet')
      .reduce((a, x) => a + Number(x.soTien), 0),
    theoKhoanMuc: Object.values(theoMuc).sort((a, b) => b.tien - a.tien),
    ds,
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

export { KHOAN_MUC, TRAN_R03_DUYET };
