/* ═══════════════════════════════════════════════════════════════
   GITA 365 · CỬA VÀO MỚI — TÀI CHÍNH

   ══ CHỖ NỀN CŨ KHÔNG DIỄN TẢ ĐƯỢC ══

   Bảng thanhToan cũ có MỘT dòng cho mỗi (nhà × tầng). Nó chỉ nói được
   một câu đúng/sai: tầng này đã trả tiền hay chưa.

   Nhưng chính bảng học phí của Học viện khai nhịp thu khác hẳn — ba kỳ
   cho tầng ba, bốn kỳ theo quý cho tầng bốn và năm, và "kỳ sau chỉ thu
   khi cổng trước đã nghiệm thu". Với một dòng đúng/sai thì một nhà
   tầng bốn đóng xong kỳ MỘT đã được tính là đã thanh toán cả tầng, và
   ba kỳ còn lại biến mất khỏi sổ.

   Đó không phải sai một con số. Là KHÔNG CÓ CHỖ để ghi con số ấy.

   ══ HAI SỔ, KHÔNG PHẢI MỘT ══

     kyThu    — PHẢI THU. Sinh ra lúc nhà vào tầng, theo lịch của tầng.
     phieuThu — ĐÃ THU. Mỗi lần nhận tiền một dòng, trỏ về một kỳ.

   Công nợ = hiệu của hai sổ. Không tách thì không có phép trừ ấy, và
   "nhà này còn nợ bao nhiêu" là câu không trả lời được bằng dữ liệu —
   chỉ trả lời được bằng trí nhớ của người phụ trách.

   ══ NGƯỜI GHI KHÔNG TỰ DUYỆT PHIẾU CỦA MÌNH ══

   Cùng một luật với chứng cứ hoa hồng, và cùng một lý do: một người
   không tự dựng được hồ sơ cho mình. Ở đây nó còn thẳng hơn — người
   ghi phiếu thu là người nói "đã nhận tiền", và nếu chính người ấy
   duyệt luôn thì không có lớp nào đứng giữa lời nói và sổ sách.
   ═══════════════════════════════════════════════════════════════ */

import { Kho, tokenMoi } from './nen.js';

const BAC = {R01:1,R02:2,R03:3,R04:4,R05:5,R06:6,R07:7,R08:8,
             R09:9,R10:10,R11:11,R12:12,R13:13,R14:14,R15:15};

/* ── GIÁ TỪNG TẦNG ──
   BẢN CHÉP của G.HP_TANG[].gia. Máy chủ không đọc được kho đã mã hoá
   nên phải chép; bộ kiểm phát hành đối chiếu hai bản mỗi lần chạy, y
   như nó vẫn làm với GITA_TUYEN và GITA_XK_TRAN.

   T1 bằng 0 chứ KHÔNG phải null — hai thứ ấy khác nhau: null là chưa
   biết giá nên mọi phép tính đứng lại, 0 là đã biết và bằng không nên
   phép tính chạy và ra 0. Chốt của chủ hệ ở HH-CC-03. */
export const GIA_TANG = {1: 0, 2: 500000, 3: 10000000, 4: 30000000, 5: 50000000};

/* ── NHỊP THU ──

   Lấy TỪNG CHỮ từ G.HP_TANG[].nhip. Chỗ nào bảng học phí nói rõ ngày
   thì ghi đúng ngày ấy; chỗ nào không nói thì khai vào SUY_RA ở dưới
   chứ không lặng lẽ chọn một con số.

     T1 'Thu một lần trước khi bắt đầu. Chặng ngắn nhất, không chia kỳ.'
     T2 'Thu một lần trước khi bắt đầu, hoặc hai kỳ: trước ngày 1 và
         trước ngày 11.'
     T3 'Ba kỳ, mỗi kỳ trước một chuỗi: K1 trước ngày 1, K2 trước ngày
         43, K3 trước ngày 64. Kỳ sau chỉ thu khi cổng trước đã nghiệm
         thu.'
     T4 'Bốn kỳ theo quý. Kỳ sau chỉ thu khi cổng quý trước đã nghiệm
         thu — không thu trước cho cả năm.'
     T5 'Bốn kỳ theo quý, như tầng 4.'

   T2 có HAI cách; hệ dựng lịch theo cách MỘT KỲ, vì đó là mặc định
   trong câu ("thu một lần ... hoặc hai kỳ") và vì chia đôi một khoản
   năm trăm nghìn thì phần việc ghi sổ đắt hơn phần tiền. Nhà nào muốn
   hai kỳ thì người phụ trách tách tay — và chỗ ấy nằm trong SUY_RA. */
const NHIP = {
  1: {soKy: 1, ngay: [1]},
  2: {soKy: 1, ngay: [1]},
  3: {soKy: 3, ngay: [1, 43, 64], congTruoc: true},
  4: {soKy: 4, ngay: [1, 91, 181, 271], congTruoc: true},
  5: {soKy: 4, ngay: [1, 91, 181, 271], congTruoc: true}
};

/* ── BA CHỖ TÔI SUY RA, KHÔNG PHẢI CHỦ HỆ KHAI ──

   Kê ra đây để chủ hệ nhìn thấy và chốt, thay vì để chúng nằm im
   trong mã dưới dạng những con số trông như đã được duyệt. Cùng lối
   với TV_LECH và HH_CHOCHU của kho. */
export const SUY_RA = [
  {ma: 'TC-01', viec: 'Ngày của bốn kỳ tầng 4 và tầng 5',
   suy: 'ngày 1 · 91 · 181 · 271',
   vi: 'Bảng học phí nói "bốn kỳ theo quý" mà không cho số ngày. Tầng 4 ' +
       'là trọn một năm nên một quý là 91 ngày. Chốt lại nếu Học viện tính ' +
       'quý theo lịch dương thay vì theo ngày vào tầng.'},

  {ma: 'TC-02', viec: 'Chia tiền giữa các kỳ',
   suy: 'chia ĐỀU cho số kỳ',
   vi: 'Bảng học phí không nói tỉ lệ. Chia đều là cách ít giả định nhất, ' +
       'nhưng nhiều nơi thu kỳ đầu nặng hơn để giữ cam kết. Đây là quyết ' +
       'định kinh doanh, không phải quyết định kỹ thuật.'},

  {ma: 'TC-03', viec: 'Tầng 2 dựng lịch một kỳ hay hai kỳ',
   suy: 'MỘT kỳ',
   vi: 'Bảng học phí cho hai cách và không nói cách nào là mặc định. Hệ ' +
       'chọn một kỳ; nhà nào muốn hai kỳ thì người phụ trách tách tay.'}
];

/* ═══════════════ DỰNG LỊCH THU KHI VÀO TẦNG ═══════════════ */
export async function dungLichThu(db, maKhachHang, tang, vaoLuc) {
  const n = NHIP[tang];
  if (!n) return 0;
  const gia = GIA_TANG[tang];
  if (gia == null) throw new Error('Chưa có giá cho tầng ' + tang);

  /* Tầng 0 tiền thì không sinh kỳ nào: một dòng "phải thu 0 đồng" là
     một dòng công nợ giả, và nó làm mọi bản kê công nợ có rác. */
  if (!gia) return 0;

  const moc = new Date(vaoLuc || new Date().toISOString()).getTime();
  const mot = Math.round(gia / n.soKy);
  let so = 0;
  for (let i = 0; i < n.soKy; i++) {
    /* Kỳ CUỐI gánh phần lẻ, để tổng các kỳ đúng bằng giá gói. Chia đều
       rồi làm tròn từng kỳ thì tổng lệch vài đồng, và một bản kê tài
       chính lệch vài đồng là một bản kê phải đi giải thích. */
    const tien = (i === n.soKy - 1) ? gia - mot * (n.soKy - 1) : mot;
    try {
      await db.prepare(
        'INSERT INTO kyThu (id,maKhachHang,tang,ky,soKy,ngayThu,phaiThu,hanLuc,congTruoc,taoLuc) ' +
        'VALUES (?,?,?,?,?,?,?,?,?,?)'
      ).bind('KT-' + tokenMoi().slice(0, 14), maKhachHang, tang, i + 1, n.soKy,
        n.ngay[i], tien,
        new Date(moc + (n.ngay[i] - 1) * 86400e3).toISOString(),
        (n.congTruoc && i > 0) ? ('cong-ky-' + i) : null,
        new Date().toISOString()).run();
      so++;
    } catch (e) {
      /* ix_kythu_mot chặn dựng lịch hai lần cho cùng một tầng. Dựng
         hai lần là NHÂN ĐÔI công nợ của một nhà, và không ai nhìn ra
         cho tới lúc đối chiếu. Đụng khoá thì bỏ qua kỳ ấy, không ném:
         lượt dựng lại là chuyện bình thường khi người ta bấm hai lần. */
      if (!/kyThu/.test(String(e && e.message || e))) throw e;
    }
  }
  return so;
}

/* ═══════════════ GHI PHIẾU THU ═══════════════ */
export async function ghiPhieuThu(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  /* Tư vấn (R11) trở lên ghi được phiếu — họ là người đứng giữa gia
     đình và Học viện, nên họ là người nhận được xác nhận chuyển khoản. */
  if (lv > 11) return {ok: false, error: 'Vai này không ghi được phiếu thu.'};

  const p = y.phieu || {};
  const nha = String(p.maKhachHang || '').trim();
  const tien = Number(p.soTien || 0);
  if (!nha) return {ok: false, error: 'Thiếu mã khách hàng.'};
  if (!(tien > 0)) return {ok: false, error: 'Số tiền phải lớn hơn 0.'};
  if (['chuyenKhoan', 'tienMat', 'the'].indexOf(String(p.hinhThuc)) < 0)
    return {ok: false, error: 'Hình thức thu phải là chuyenKhoan, tienMat hoặc the.'};

  const hs = await db.prepare('SELECT * FROM hoSoKhach WHERE maKhachHang = ?')
    .bind(nha).first();
  if (!hs) return {ok: false, error: 'Không tìm thấy hồ sơ khách hàng này.'};

  let ky = null;
  if (p.idKy) {
    ky = await db.prepare('SELECT * FROM kyThu WHERE id = ?').bind(String(p.idKy)).first();
    if (!ky) return {ok: false, error: 'Không tìm thấy kỳ thu này.'};
    if (String(ky.maKhachHang) !== nha)
      return {ok: false, error: 'Kỳ thu này thuộc về một nhà khác.'};
  }

  const id = 'PT-' + tokenMoi().slice(0, 14);
  await db.prepare(
    'INSERT INTO phieuThu (id,maKhachHang,idKy,soTien,hinhThuc,maThamChieu,minhChung,' +
    "nguoiGhi,ghiLuc,trangThai,ghiChu) VALUES (?,?,?,?,?,?,?,?,?,'choDuyet',?)"
  ).bind(id, nha, p.idKy || null, tien, String(p.hinhThuc),
    String(p.maThamChieu || '').slice(0, 80) || null,
    String(p.minhChung || '').slice(0, 120) || null,
    hoSo.u, new Date().toISOString(), String(p.ghiChu || '').slice(0, 500) || null).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'PHIEUTHU_GHI',
    doiTuong: id, chiTiet: nha + ' · ' + tien + 'đ · ' + p.hinhThuc});
  return {ok: true, id, trangThai: 'choDuyet'};
}

/* ═══════════════ DUYỆT PHIẾU THU ═══════════════ */
export async function duyetPhieuThu(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 3) return {ok: false, error: 'Chỉ R01–R03 duyệt được phiếu thu.'};

  const pt = await db.prepare('SELECT * FROM phieuThu WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!pt) return {ok: false, error: 'Không tìm thấy phiếu thu này.'};

  /* NGƯỜI GHI KHÔNG TỰ DUYỆT PHIẾU CỦA MÌNH.

     Cùng luật với chứng cứ hoa hồng, và ở đây còn thẳng hơn: người ghi
     phiếu là người nói "đã nhận tiền". Nếu chính người ấy duyệt luôn
     thì không có lớp nào đứng giữa lời nói và sổ sách, và một khoản
     tiền vào sổ mà không ai ngoài người ấy nhìn thấy. */
  if (String(pt.nguoiGhi) === String(hoSo.u))
    return {ok: false, error: 'Người ghi phiếu không tự duyệt phiếu của mình được.'};

  const duyet = y.duyet !== false;
  const gio = new Date().toISOString();

  /* Ghi có điều kiện: hai người cùng bấm thì ai đổi được dòng người ấy
     duyệt, người kia biết là đã có người làm trước. */
  const r = await db.prepare(
    'UPDATE phieuThu SET trangThai = ?, nguoiDuyet = ?, duyetLuc = ?, lyDo = ? ' +
    "WHERE id = ? AND trangThai = 'choDuyet'"
  ).bind(duyet ? 'daDuyet' : 'tuChoi', hoSo.u, gio,
    String(y.lyDo || '').slice(0, 300) || null, pt.id).run();
  if (!((r && r.meta && r.meta.changes) || 0))
    return {ok: false, error: 'Phiếu này đã được xử lý rồi.'};

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u,
    viec: duyet ? 'PHIEUTHU_DUYET' : 'PHIEUTHU_TUCHOI',
    doiTuong: pt.id, chiTiet: pt.maKhachHang + ' · ' + pt.soTien + 'đ'});
  return {ok: true, trangThai: duyet ? 'daDuyet' : 'tuChoi'};
}

/* ═══════════════ CÔNG NỢ MỘT NHÀ ═══════════════

   Hiệu của hai sổ, tính bằng MỘT câu lệnh có phép nối trái: kỳ nào
   chưa có phiếu nào duyệt thì phần đã thu bằng 0, chứ không biến mất
   khỏi bản kê. Lọc sau khi đọc về thì kỳ chưa thu đồng nào là kỳ dễ bị
   rơi ra nhất — mà đó đúng là kỳ cần nhìn thấy. */
export async function congNo(y, env, db, hoSo) {
  const nha = String(y.maKhachHang || '').trim();
  if (!nha) return {ok: false, error: 'Thiếu mã khách hàng.'};

  const lv = BAC[hoSo.role] || 99;
  /* Gia đình xem được công nợ CỦA CHÍNH MÌNH; đội ngũ từ Tư vấn trở
     lên xem được của nhà mình phụ trách. Không có lớp này thì một
     phụ huynh gõ mã nhà khác là đọc được tình hình tiền nong nhà ấy. */
  if (lv > 11) {
    const nd = await Kho.nguoiTheoId(db, hoSo.uid);
    if (!nd || String(nd.maKhachHang || '') !== nha)
      return {ok: false, code: 'NOPERM', error: 'Chỉ xem được công nợ của chính nhà mình.'};
  }

  const r = await db.prepare(
    'SELECT k.id, k.tang, k.ky, k.soKy, k.phaiThu, k.hanLuc, k.congTruoc, ' +
    '  COALESCE(SUM(CASE WHEN p.trangThai = ? THEN p.soTien END), 0) AS daThu ' +
    'FROM kyThu k LEFT JOIN phieuThu p ON p.idKy = k.id ' +
    'WHERE k.maKhachHang = ? GROUP BY k.id ORDER BY k.tang, k.ky'
  ).bind('daDuyet', nha).all();

  const ke = (r.results || []).map(x => ({
    idKy: x.id, tang: x.tang, ky: x.ky, soKy: x.soKy,
    phaiThu: Number(x.phaiThu), daThu: Number(x.daThu),
    conNo: Number(x.phaiThu) - Number(x.daThu),
    hanLuc: x.hanLuc, congTruoc: x.congTruoc || null,
    quaHan: !!(x.hanLuc && new Date(x.hanLuc) < new Date() &&
               Number(x.daThu) < Number(x.phaiThu))
  }));

  return {ok: true, maKhachHang: nha, ke,
    tongPhaiThu: ke.reduce((a, x) => a + x.phaiThu, 0),
    tongDaThu:   ke.reduce((a, x) => a + x.daThu, 0),
    tongConNo:   ke.reduce((a, x) => a + x.conNo, 0),
    soKyQuaHan:  ke.filter(x => x.quaHan).length};
}

/* ═══════════════ HOA HỒNG PHẢI TRẢ ═══════════════

   BẢN CHÉP của G.HH_BAC. Hai bậc, và bậc trên đòi CẢ HAI nhà cùng đạt
   chín mươi — vì mười phần trăm là TRẦN của cả hệ, và trả trần cho một
   phía làm tốt còn phía kia vừa đủ là dạy rằng kèm giỏi thì bù được
   cho nếp nhà mình. */
const HH_BAC = [
  {ma: 'B10', phanTram: 10, kpiNhaKem: 90, kpiNhaDuocKem: 90},
  {ma: 'B5',  phanTram: 5,  kpiNhaKem: 80, kpiNhaDuocKem: null}
];
const HH_TRAN = 10;

/** Sinh khoản hoa hồng khi một nhà vừa VƯỢT TẦNG.

    Gọi từ nangTang. Không có nhà bảo trợ thì không sinh gì — và đó là
    trường hợp thường, nên nó phải rẻ và im lặng. */
export async function sinhHoaHong(db, nhaDuocKem, tangVuot, kpiDuocKem) {
  const hs = await db.prepare('SELECT * FROM hoSoKhach WHERE maKhachHang = ?')
    .bind(nhaDuocKem).first();
  const nhaKem = hs && String(hs.boTro || '').trim();
  if (!nhaKem) return null;

  /* TẦNG MỘT KHÔNG CÓ TIỀN, VÀ ĐÓ LÀ ĐIỀU KHOẢN CHỨ KHÔNG PHẢI PHÉP
     NHÂN RA 0 — chốt HH-CC-03. Suy điều khoản từ giá thì ngày Học viện
     mở một đợt miễn phí cho tầng hai là điều khoản tầng hai lặng lẽ
     đổi theo, không ai bấm nút nào và không ai được báo. */
  if (tangVuot <= 1) return null;

  const kemHs = await db.prepare('SELECT * FROM hoSoKhach WHERE maKhachHang = ?')
    .bind(nhaKem).first();
  if (!kemHs) return null;
  const kpiKem = await kpiCuaNha(db, nhaKem);

  const bac = HH_BAC.find(b =>
    Number(kpiKem) >= b.kpiNhaKem &&
    (b.kpiNhaDuocKem === null || Number(kpiDuocKem) >= b.kpiNhaDuocKem));
  if (!bac) return null;

  const goi = GIA_TANG[tangVuot] || 0;
  const pt = Math.min(bac.phanTram, HH_TRAN);   /* trần chặn thật, không chỉ là một câu chữ */
  const tien = Math.round(goi * pt / 100);

  try {
    const id = 'HH-' + tokenMoi().slice(0, 14);
    await db.prepare(
      'INSERT INTO hoaHongTra (id,nhaKem,nhaDuocKem,tangVuot,bac,phanTram,goiCanCu,soTien,' +
      "kpiNhaKem,kpiNhaDuocKem,trangThai,sinhLuc) VALUES (?,?,?,?,?,?,?,?,?,?,'phaiTra',?)"
    ).bind(id, nhaKem, nhaDuocKem, tangVuot, bac.ma, pt, goi, tien,
      kpiKem, kpiDuocKem, new Date().toISOString()).run();
    return {id, nhaKem, bac: bac.ma, phanTram: pt, soTien: tien};
  } catch (e) {
    /* ix_hh_mot: một lượt vượt tầng sinh ĐÚNG MỘT khoản. Bấm hai lần
       là trả hai lần, và tiền đã ra thì không gọi về được. */
    if (/hoaHongTra/.test(String(e && e.message || e))) return null;
    throw e;
  }
}

async function kpiCuaNha(db, ma) {
  const r = await db.prepare(
    'SELECT s.kpi FROM hoSoKhach h JOIN students s ON s.id = h.maHocVien ' +
    'WHERE h.maKhachHang = ?'
  ).bind(ma).first();
  return Number(r && r.kpi) || 0;
}

/* ═══════════════ BẢN KÊ TÀI CHÍNH ═══════════════

   Chỉ R01–R03. Bản kê này gộp tiền của cả hệ; nó không phải thứ để mở
   ra xem cho biết. */
export async function banKeTaiChinh(y, env, db, hoSo) {
  const lv = BAC[hoSo.role] || 99;
  if (lv > 3) return {ok: false, code: 'NOPERM', error: 'Chỉ R01–R03 xem được bản kê tài chính.'};

  const tu = String(y.tu || '1970-01-01');
  const den = String(y.den || new Date().toISOString());

  const thu = await db.prepare(
    "SELECT COALESCE(SUM(soTien),0) t, COUNT(*) n FROM phieuThu " +
    "WHERE trangThai = 'daDuyet' AND ghiLuc >= ? AND ghiLuc <= ?"
  ).bind(tu, den).first();

  const cho = await db.prepare(
    "SELECT COALESCE(SUM(soTien),0) t, COUNT(*) n FROM phieuThu WHERE trangThai = 'choDuyet'"
  ).first();

  const hoan = await db.prepare(
    "SELECT COALESCE(SUM(soTien),0) t, COUNT(*) n FROM hoanTien " +
    "WHERE trangThai = 'daDuyet' AND duyetLuc >= ? AND duyetLuc <= ?"
  ).bind(tu, den).first();

  const hh = await db.prepare(
    "SELECT COALESCE(SUM(soTien),0) t, COUNT(*) n FROM hoaHongTra WHERE trangThai = 'phaiTra'"
  ).first();

  const theoTang = await db.prepare(
    'SELECT k.tang, COALESCE(SUM(k.phaiThu),0) phai, ' +
    "  COALESCE(SUM(CASE WHEN p.trangThai = 'daDuyet' THEN p.soTien END),0) da " +
    'FROM kyThu k LEFT JOIN phieuThu p ON p.idKy = k.id GROUP BY k.tang ORDER BY k.tang'
  ).all();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'BANKE_TAICHINH',
    chiTiet: tu.slice(0, 10) + ' → ' + den.slice(0, 10)});

  return {ok: true, tu, den,
    daThu: {tien: Number(thu.t), so: Number(thu.n)},
    choDuyet: {tien: Number(cho.t), so: Number(cho.n)},
    daHoan: {tien: Number(hoan.t), so: Number(hoan.n)},
    hoaHongPhaiTra: {tien: Number(hh.t), so: Number(hh.n)},
    theoTang: (theoTang.results || []).map(x => ({
      tang: x.tang, phaiThu: Number(x.phai), daThu: Number(x.da),
      conNo: Number(x.phai) - Number(x.da)})),
    /* Bản kê KHÔNG tự cộng ra một con số "lợi nhuận": chi phí vận hành
       không nằm trong hệ này, nên một con số như thế sẽ sai và sẽ được
       ai đó mang đi họp. */
    suyRa: SUY_RA.map(x => x.ma + ' · ' + x.viec)};
}
