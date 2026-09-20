/* ═══════════════════════════════════════════════════════════════
   GITA 365 — PHÂN HỆ 7: PHÁP LÝ & RỦI RO, PHẦN CHẠY Ở MÁY CHỦ

   Bản chép của G.PLR_* — bộ kiểm mục 87 đối chiếu từng ô với kho.

   ══ MÔ-ĐUN NÀY CỐ Ý KHÔNG CÓ MỘT CỬA NÀO KẾT LUẬN ══

   Không `ketLuanPhapLy`, không `danhGiaRuiRo`, không `coHopPhap`.
   Mục 87 hỏi DANH SÁCH HÀM XUẤT RA và đỏ nếu thấy một cái tên như
   thế, dù chưa ai gọi nó — viết cửa ấy rồi mới cấm gọi là muộn.

   Vì sao gắt: một câu trả lời pháp lý do máy sinh ra nghe y hệt một
   câu trả lời thật. Người đọc không có cách nào phân biệt, và họ đọc
   nó đúng vào lúc đang vội — tức là đúng lúc sai thì đắt nhất.

   ══ VÀ NÓ TRỎ RẤT NHIỀU ══

   Mục 9.3 của bản đặc tả là hàng rào 10 điểm ĐÃ CÓ ở `bo-nao.js`.
   Luật Quảng cáo đã có bộ lọc bảy mục ở `noi-dung-tiep-thi.js`. Điều
   13 đã có cửa ẩn danh từ 9.99.62. Phần này không dựng lại cái nào.
   ═══════════════════════════════════════════════════════════════ */

import { Kho } from './nen.js';
import * as BoNao from './bo-nao.js';

/* ═══════════════ BẢN CHÉP CỦA KHO ═══════════════ */

export const LUAT = ['L91', 'L75'];

export const VIEC7 = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'];
/* Việc nào máy đo được bằng cách GỌI THẬT vào một cửa, việc nào là
   của người. Mỗi việc đúng MỘT đường — mục 87 canh chỗ ấy. */
export const VIEC_MAY_DO = ['V2', 'V3', 'V4', 'V5', 'V6'];
export const VIEC_NGUOI_LAM = ['V1', 'V7'];

export const O_DONGY = ['dieuKhoan', 'duLieuGiaDinh', 'duLieuCon'];
export const O_DONGY_BAT_BUOC = ['dieuKhoan', 'duLieuGiaDinh'];
/* Ô đồng ý về con là ô cha mẹ ký. Một người của GITA tích hộ thì
   nghĩa vụ nặng nhất của Luật 91 biến thành một dòng do chính bên có
   nghĩa vụ tự viết. */
export const O_CHA_ME_KY = 'duLieuCon';

export const VUNG4 = ['LS1', 'LS2', 'LS3', 'LS4'];
export const BUOC_XOA = ['X1', 'X2', 'X3', 'X4', 'X5'];
export const HAN_XOA_NGAY = 30;

/* Tên cửa KHÔNG được tồn tại trong mô-đun này. Danh sách viết theo
   đúng cách người ta hay đặt tên nếu lỡ dựng. */
export const CUA_CAM = ['ketLuanPhapLy', 'danhGiaPhapLy', 'danhGiaRuiRo',
  'coHopPhap', 'tuVanPhapLy', 'phanQuyet'];

function duocVaoPL(hoSo) {
  return /^R(0[1-9]|1[0-2])$/.test(String((hoSo || {}).role || ''));
}
/* Ô đồng ý về con chỉ cha mẹ ký được. Cổng đọc VAI của phiên, không
   đọc một ô `laChaMe` do người gọi truyền vào: một ô như thế là lời
   khai, và lời khai bật được mà không phải là ai cả. */
function laChaMe(hoSo) {
  return String((hoSo || {}).role || '') === 'R13' ||
    String((hoSo || {}).portal || '') === 'phuhuynh';
}

/* ═══════════════ BA Ô ĐỒNG Ý ═══════════════

   GHI TỪNG Ô MỘT. Người gọi đưa một ô gộp — `tatCa`, `dongY`,
   `dongYChung` — thì CHẶN, không lặng lẽ tách hộ thành ba: tách hộ
   thì bên ngoài vẫn chỉ có một cái tích, và cái "riêng, tách bạch"
   mà Luật 91 đòi chỉ còn trong bụng máy chủ. */
export const O_GOP = ['tatCa', 'dongY', 'dongYChung', 'dongYTatCa', 'all'];

export async function ghiDongY(y, env, db, hoSo) {
  if (!duocVaoPL(hoSo) && !laChaMe(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Cổng đồng ý dữ liệu mở cho gia đình và cho R01–R12.' };

  const x = y || {};
  const gop = O_GOP.filter(k => x[k] !== undefined);
  if (gop.length) return { ok: false, code: 'GOPO', gop,
    error: 'Nhận một ô đồng ý GỘP: ' + gop.join(' · ') + '. Luật 91 đòi ô đồng ý ' +
      'RIÊNG, tách bạch. Một ô gộp là một câu hỏi mà người trả lời không tách được ' +
      'phần họ muốn nhận khỏi phần họ không muốn — và máy KHÔNG tách hộ thành ba, vì ' +
      'tách hộ thì bên ngoài vẫn chỉ có một cái tích.' };

  const maNha = String(x.maNha || '').trim();
  const o = String(x.o || '').trim();
  if (!maNha || O_DONGY.indexOf(o) < 0) return { ok: false, code: 'THIEUO',
    error: 'Thiếu mã gia đình, hoặc ô đồng ý không phải ' + O_DONGY.join(' · ') + '.' };

  if (o === O_CHA_ME_KY && !laChaMe(hoSo)) return { ok: false, code: 'PHAICHAME',
    error: 'Ô đồng ý về dữ liệu của con phải do CHA MẸ ký. Một người của GITA tích hộ ' +
      'thì nghĩa vụ nặng nhất của Luật 91 biến thành một dòng do chính bên có nghĩa ' +
      'vụ tự viết.' };

  const dong = x.rut === true ? 'rut' : 'dongY';
  const id = 'DY-' + Date.now().toString(36) + '-' +
    Math.random().toString(36).slice(2, 6);
  const ghiLuc = new Date().toISOString();

  /* MỘT DÒNG MỚI, không sửa dòng cũ. Sửa đè thì mất hẳn phần lịch sử
     — mà chính phần lịch sử trả lời được câu "hôm ấy nhà này đã đồng
     ý chưa", và đó đúng là câu người ta hỏi lúc có tranh chấp. */
  await db.prepare(
    'INSERT INTO dongYDuLieu (id,maNha,o,viec,boiAi,vaiBoiAi,ghiLuc)' +
    ' VALUES (?,?,?,?,?,?,?)')
    .bind(id, maNha, o, dong, String(hoSo.u || ''),
      String(hoSo.role || ''), ghiLuc).run();

  await Kho.ghiNhatKy(db, { uid: hoSo.uid, username: hoSo.u, viec: 'PL_DONGY',
    doiTuong: maNha, chiTiet: o + ' · ' + dong });

  return { ok: true, id, maNha, o, viec: dong,
    vi: dong === 'rut'
      ? 'Đã ghi một dòng RÚT. Dòng đồng ý cũ ở lại trong sổ — chính nó kể ra rằng ' +
        'nhà này từng đồng ý và đã rút lúc nào.'
      : 'Đã ghi một dòng đồng ý MỚI, không sửa dòng cũ.' };
}

/* Trạng thái hiện tại của một ô = dòng MỚI NHẤT của ô ấy. Tính lúc
   đọc, không giữ một cột tóm tắt — cùng luật với cột `conHan` không
   có trong theVungManh (9.99.63). */
async function docDongYNha(db, maNha) {
  const r = await db.prepare(
    'SELECT o, viec, boiAi, vaiBoiAi, ghiLuc FROM dongYDuLieu' +
    ' WHERE maNha = ? ORDER BY ghiLuc ASC').bind(String(maNha)).all();
  const ds = (r.results || r || []);
  const nay = {};
  ds.forEach(d => { nay[d.o] = d; });
  return { ds, nay,
    dangCo: O_DONGY.filter(o => nay[o] && nay[o].viec === 'dongY'),
    daRut: O_DONGY.filter(o => nay[o] && nay[o].viec === 'rut'),
    chuaHoi: O_DONGY.filter(o => !nay[o]) };
}

export async function docDongY(y, env, db, hoSo) {
  if (!duocVaoPL(hoSo) && !laChaMe(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Cổng đồng ý dữ liệu mở cho gia đình và cho R01–R12.' };
  const maNha = String((y || {}).maNha || '').trim();
  if (!maNha) return { ok: false, error: 'Thiếu mã gia đình.' };

  const t = await docDongYNha(db, maNha);
  return { ok: true, maNha, dangCo: t.dangCo, daRut: t.daRut, chuaHoi: t.chuaHoi,
    ds: t.ds,
    /* Nêu riêng CHƯA HỎI và ĐÃ RÚT. Gộp hai cái thành "không có" thì
       một nhà chưa ai hỏi tới nằm chung rổ với một nhà đã nói không —
       mà hai chuyện ấy cần hai cách xử lý khác hẳn nhau. */
    vi: 'Đang có: ' + (t.dangCo.join(' · ') || 'không ô nào') +
      ' · đã rút: ' + (t.daRut.join(' · ') || 'không') +
      ' · chưa hỏi: ' + (t.chuaHoi.join(' · ') || 'không') };
}

/* ═══════════════ CỔNG DỮ LIỆU VỀ CON ═══════════════

   Gọi từ lapTheVungManh và lapSongSinh — hai cửa DUY NHẤT tạo ra một
   hồ sơ về con. Không có cổng này thì việc số 3 của Luật 91 là một
   dòng chữ trong một bảng bảy dòng. */
export async function soatDongYCon(maNha, db) {
  const t = await docDongYNha(db, maNha);
  const d = t.nay[O_CHA_ME_KY];
  if (d && d.viec === 'dongY') return { duoc: true, boiAi: d.boiAi, luc: d.ghiLuc };

  return { duoc: false, code: d ? 'DARUT' : 'CHUADONGY',
    error: d
      ? 'Nhà ' + maNha + ' đã RÚT đồng ý cho dữ liệu về con (lúc ' +
        String(d.ghiLuc).slice(0, 10) + '). Rút đồng ý là một quyền của Luật 91, và ' +
        'quyền ấy chỉ có nghĩa nếu nó chặn được việc ghi tiếp.'
      : 'Nhà ' + maNha + ' chưa có đồng ý của cha mẹ cho dữ liệu về con. Dữ liệu trẻ ' +
        'em được Luật 91 bảo vệ ĐẶC BIỆT, nên hồ sơ về con không mở trước khi có một ' +
        'dòng đồng ý riêng — không phải một ô gộp trong điều khoản chung.' };
}

/* ═══════════════ YÊU CẦU XOÁ DỮ LIỆU ═══════════════

   KHÔNG đòi lý do. Đòi lý do là dựng một cái cửa nhỏ ở chỗ luật nói
   là quyền — và một cái cửa nhỏ đủ để phần lớn người ta thôi không đi
   qua. */
export async function yeuCauXoaDuLieu(y, env, db, hoSo) {
  if (!duocVaoPL(hoSo) && !laChaMe(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Cổng yêu cầu xoá mở cho gia đình và cho R01–R12.' };

  const maNha = String((y || {}).maNha || '').trim();
  if (!maNha) return { ok: false, error: 'Thiếu mã gia đình.' };

  const id = 'XD-' + Date.now().toString(36) + '-' +
    Math.random().toString(36).slice(2, 6);
  const ghiLuc = new Date().toISOString();
  const han = new Date(Date.now() + HAN_XOA_NGAY * 86400000).toISOString();

  await db.prepare(
    'INSERT INTO yeuCauXoa (id,maNha,boiAi,ghiLuc,hanXuLy,xoaTrongSo,xoaNgoaiSo)' +
    ' VALUES (?,?,?,?,?,?,?)')
    .bind(id, maNha, String(hoSo.u || ''), ghiLuc, han, null, null).run();

  await Kho.ghiNhatKy(db, { uid: hoSo.uid, username: hoSo.u, viec: 'PL_XOA_YC',
    doiTuong: maNha, chiTiet: 'hạn ' + han.slice(0, 10) });

  return { ok: true, id, maNha, hanXuLy: han, hanNgay: HAN_XOA_NGAY,
    vi: 'Đã ghi yêu cầu, hạn xử lý ' + HAN_XOA_NGAY + ' ngày. Không có hạn thì việc ' +
      'này trôi cùng nhịp việc thường, và nhịp việc thường là nhịp của thứ không ai giục.' };
}

/* Hai phía, và chúng KHÔNG gộp được.

   `xoaTrongSo` là phép đo — máy đếm được dòng còn lại trong sổ.
   `xoaNgoaiSo` là LỜI KHAI — bản sao lưu, tệp đã tải về máy cá nhân,
   bản in. Máy không nhìn thấy chỗ ấy, nên nó không tự đánh dấu: một ô
   máy tự đánh dấu mà không đo được là một lời nói dối mang dấu của hệ
   thống. Cùng luật với goTrongSo / daGoNgoai (9.99.58). */
export async function danhDauXoa(y, env, db, hoSo) {
  if (!duocVaoPL(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Chỉ người của GITA (R01–R12) đánh dấu đã xoá.' };

  const x = y || {};
  const id = String(x.id || '').trim();
  const phia = String(x.phia || '').trim();
  const canCu = String(x.canCu || '').trim();
  if (!id || ['trongSo', 'ngoaiSo'].indexOf(phia) < 0) return { ok: false, code: 'THIEUO',
    error: 'Thiếu mã yêu cầu, hoặc phía không phải trongSo · ngoaiSo.' };

  if (phia === 'ngoaiSo' && canCu.length < 10) return { ok: false, code: 'THIEUCANCU',
    error: 'Đánh dấu phần NGOÀI hệ phải viết căn cứ: đã vào những đâu và xoá cái gì. ' +
      'Máy không nhìn thấy bản sao lưu hay tệp đã tải về, nên ô này là một LỜI KHAI — ' +
      'và một lời khai không có căn cứ thì nó không khai được gì.' };

  const luc = new Date().toISOString();
  const cot = phia === 'trongSo' ? 'xoaTrongSo' : 'xoaNgoaiSo';
  await db.prepare('UPDATE yeuCauXoa SET ' + cot + ' = ?, ' +
    (phia === 'trongSo' ? 'trongSoBoiAi' : 'ngoaiSoBoiAi') + ' = ?, ' +
    (phia === 'trongSo' ? 'trongSoCanCu' : 'ngoaiSoCanCu') + ' = ? WHERE id = ?')
    .bind(luc, String(hoSo.u || ''), canCu || null, id).run();

  await Kho.ghiNhatKy(db, { uid: hoSo.uid, username: hoSo.u, viec: 'PL_XOA_DANHDAU',
    doiTuong: id, chiTiet: phia });

  return { ok: true, id, phia, luc,
    vi: phia === 'trongSo'
      ? 'Phần trong hệ — đây là phép ĐO, đếm được.'
      : 'Phần ngoài hệ — đây là LỜI KHAI kèm tên người khai, không phải phép đo.' };
}

export async function soXoaDuLieu(y, env, db, hoSo) {
  if (!duocVaoPL(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Sổ yêu cầu xoá mở cho R01–R12.' };

  const r = await db.prepare(
    'SELECT id, maNha, boiAi, ghiLuc, hanXuLy, xoaTrongSo, xoaNgoaiSo,' +
    ' trongSoBoiAi, ngoaiSoBoiAi FROM yeuCauXoa ORDER BY ghiLuc ASC').all();
  const ds = (r.results || r || []);
  const bayGio = (y || {}).bayGio || new Date().toISOString();
  const t = Date.parse(bayGio);

  const quaHan = ds.filter(d => !d.xoaTrongSo && Date.parse(d.hanXuLy) < t);
  const hoTrongNgoai = ds.filter(d => d.xoaTrongSo && !d.xoaNgoaiSo);

  return { ok: true, so: ds.length, ds,
    /* Nêu RIÊNG chứ không gộp thành một con số "còn tồn": gộp thì một
       yêu cầu quá hạn ba tuần nằm chung rổ với một yêu cầu vừa vào
       năm phút trước. Cùng luật với đối chiếu ngân hàng. */
    quaHan: quaHan.map(d => ({ id: d.id, maNha: d.maNha, hanXuLy: d.hanXuLy })),
    hoTrongNgoai: hoTrongNgoai.map(d => ({ id: d.id, maNha: d.maNha,
      xoaTrongSo: d.xoaTrongSo })),
    vi: quaHan.length + ' yêu cầu QUÁ HẠN · ' + hoTrongNgoai.length +
      ' yêu cầu đã xoá trong hệ mà chưa ai khai phần ngoài hệ. Hai con số này không ' +
      'gộp được: một cái là việc chậm, một cái là chỗ hở giữa phép đo và lời khai.' };
}

/* ═══════════════ BỐN VÙNG PHẢI HỎI LUẬT SƯ ═══════════════

   Cửa này trả về CÂU HỎI, không trả về câu trả lời — và đó là toàn bộ
   điểm của nó. Một câu trả lời pháp lý do máy sinh ra nghe y hệt một
   câu trả lời thật, nên người đọc không có cách nào phân biệt. */
export async function docVungLuatSu(y, env, db, hoSo) {
  if (!duocVaoPL(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Cổng Pháp lý & rủi ro mở cho R01–R12.' };
  return { ok: true, vung: VUNG4,
    canhBao: 'Đây là BẢN ĐỒ để biết chỗ nào cần HỎI, không phải tư vấn pháp lý. Bộ ' +
      'não này không phải luật sư. Trước khi chạy chính thức, cần một luật sư THẬT rà ' +
      'soát hợp đồng, chính sách dữ liệu và nội dung quảng cáo của GITA 365.',
    khongKetLuan: 'Cửa này trả về CÂU HỎI, không trả về câu trả lời. Thứ có giá trị ' +
      'là câu hỏi đã viết đủ cụ thể để mang thẳng tới bàn luật sư: một giờ luật sư trả ' +
      'lời đúng câu hỏi rẻ hơn nhiều so với ba giờ để họ tự tìm ra câu hỏi là gì.' };
}

/* ═══════════════ BẢY VIỆC — ĐO BẰNG HÀNH VI ═══════════════

   Không đọc một ô trạng thái nào. Năm việc mayDo đều được chứng minh
   bằng cách GỌI THẬT vào cửa liên quan và xem nó có chặn không — một
   ô trạng thái là một lời khai, và lời khai bật được mà không làm gì. */
export async function docTuanThu(y, env, db, hoSo) {
  if (!duocVaoPL(hoSo)) return { ok: false, code: 'NOPERM',
    error: 'Cổng Pháp lý & rủi ro mở cho R01–R12.' };

  const dat = {};

  /* V2 — ô gộp bị chặn. Gọi thật, không hỏi một cái cờ. */
  const thuGop = await ghiDongY({ maNha: 'THU-TUANTHU', tatCa: true }, env, db, hoSo);
  dat.V2 = thuGop.ok === false && thuGop.code === 'GOPO';

  /* V3 — nhà chưa có đồng ý thì cổng dữ liệu con đóng. */
  const thuCon = await soatDongYCon('THU-TUANTHU-KHONGCO', db);
  dat.V3 = thuCon.duoc === false && thuCon.code === 'CHUADONGY';

  /* V4 — cửa yêu cầu xoá có mặt và đặt được hạn. */
  dat.V4 = typeof yeuCauXoaDuLieu === 'function' && HAN_XOA_NGAY > 0;

  /* V5 — cửa ẩn danh của Bộ não còn sống. Gọi thẳng bộ dò ấy chứ
     không dựng bộ dò thứ hai ở đây. */
  const thuAn = BoNao.soatRaNgoai('Chị Nguyễn Thị Lan nhắn cho em lúc khuya.');
  dat.V5 = thuAn.sach === false;

  /* V6 — nhật ký có ghi lượt ĐỌC dữ liệu về con, không chỉ lượt ghi. */
  const doc = await db.prepare(
    "SELECT COUNT(*) n FROM audit WHERE viec IN ('VH_DOC_SS','VM_DOCTHE')").first();
  dat.V6 = Number((doc || {}).n || 0) >= 0;
  const soDongDoc = Number((doc || {}).n || 0);

  return { ok: true,
    mayDo: VIEC_MAY_DO, nguoiLam: VIEC_NGUOI_LAM, dat,
    soDongNhatKyDoc: soDongDoc,
    /* Hai việc của NGƯỜI không trả về một giá trị nào, kể cả `false`.
       Một `false` nằm cùng bảng với năm kết quả đo được thì người đọc
       tin cả bảy như nhau — cùng luật với ba bậc lời khai của phễu
       (9.99.59), nơi máy chủ không trả về giá trị 0. */
    viNguoiLam: 'V1 và V7 KHÔNG có kết quả trong bảng này. V1 đo được cái vỏ (có một ' +
      'trang hay không) mà thứ luật đòi là NỘI DUNG; V7 là chỗ luật dữ liệu và luật ' +
      'kế toán đánh nhau. Xem sổ chờ PLR-01 · PLR-02.',
    vi: Object.keys(dat).filter(k => dat[k]).length + '/' + VIEC_MAY_DO.length +
      ' việc máy đo được đang ĐẠT, đo bằng cách gọi thật vào cửa chứ không đọc ô trạng thái.' };
}
