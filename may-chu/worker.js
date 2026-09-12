/* ═══════════════════════════════════════════════════════════════
   GITA 365 · CỬA VÀO MỚI — BỘ ĐỊNH TUYẾN

   Cloudflare Worker. Giữ NGUYÊN bề mặt mà máy khách đang gọi: POST một
   khối JSON có trường fn, nhận về một khối JSON. Máy khách không phải
   sửa một dòng nào — đổi mỗi địa chỉ ở G.API_CAP_PHEP.

   Giữ nguyên bề mặt là điều kiện để CHUYỂN DẦN: hai máy chủ cùng chạy
   một thời gian, đổi địa chỉ là đổi nền, và đổi ngược lại được ngay
   trong một phút nếu có chuyện. Đổi bề mặt cùng lúc với đổi nền thì
   lúc hỏng không ai biết hỏng vì nền hay vì bề mặt.

   ── PHẦN NÀY ĐÃ PORT TỚI ĐÂU ──

   Xong: đăng nhập · đăng xuất · kiểm phiên · đổi mật khẩu · cấp khoá
   kho · trạng thái máy chủ · đồng bộ hồ sơ và cài đặt · đăng ký, mã xác
   nhận qua email, kích hoạt · quên và đặt lại mật khẩu · quyền xem hồ
   sơ khách · nâng tầng · chứng cứ hoa hồng · TỆP KHÁCH HÀNG CHUẨN ·
   TÀI CHÍNH đầy đủ — kỳ thu, phiếu thu, công nợ, bản kê, huỷ phiếu,
   hoàn tiền, trả hoa hồng, đóng kỳ, danh sách quá hạn, đối soát.

   Chưa: tài liệu, sổ cộng đồng, tình huống khách, xuất Sheet.

   CHƯA PORT THÌ BÁO TO, KHÔNG IM. Danh sách CHUA_PORT ở dưới trả về
   đúng một câu nói rõ việc ấy chưa có ở nền mới. Trả 'Yêu cầu không
   hợp lệ' cho một việc CÓ THẬT ở nền cũ là cách chắc nhất để một lỗi
   chuyển nền bị đọc thành lỗi máy khách, và người đi tìm sẽ tìm nhầm
   chỗ suốt buổi.
   ═══════════════════════════════════════════════════════════════ */

import { Kho, kiemPhien, kiemMatKhau, bamMoi, muoiMoi, mkQuaDeDoan } from './nen.js';
import { dongBo } from './dong-bo.js';
import { dangKy, guiLaiOtp, xacThucOtp, kichHoat } from './dang-ky.js';
import { quenMatKhau, datLaiMatKhau } from './mat-khau.js';
import { capQuyenXem, thuHoiQuyenXem, soiQuyenXem, xemKhachCao, nangTang } from './quyen-xem.js';
import { kyChungCu, xacNhanChungCu, soiChungCu } from './chung-cu.js';
import { xemTepKhach, suaTepKhach, dsTepKhach } from './ho-so-khach.js';
import { ghiPhieuThu, duyetPhieuThu, congNo, banKeTaiChinh,
  huyPhieuThu, ganPhieuVaoKy, deXuatHoan, duyetHoan, traHoaHong,
  ganChungCuHoaHong, dongKyChuaToi, dsQuaHan, doiSoat,
  deXuatMienGiam, duyetMienGiam, dsMienGiam,
  ghiNhacThu, lichSuNhacThu, denHenChuaTra } from './tai-chinh.js';
import { soNgay, chotTuan, soatChot, tongHop, baoCaoKeToan, boSoKhaiThue,
  dsChot } from './bao-cao.js';
import { tongNgayDoanhThu } from './bao-doanh-thu.js';
import { chamKpiTaiChinh } from './kpi-tai-chinh.js';
import { dangTinTaiChinh, bangTinTaiChinh,
  xuLyTinTaiChinh } from './tin-tai-chinh.js';
import { hoiTroLyTaiChinh } from './tro-ly-tai-chinh.js';
import { datHeSoLuong, dsHeSoLuong, bangLuong, chotLuong,
  doiSoatLuong } from './luong.js';
import { deXuatThiGiac, chuyenBacThiGiac, banMoiThiGiac, chamThiGiac,
  ghiLuatThuongHieu, khoThiGiac, docTaiLieuThiGiac, docNoiDungThiGiac,
  guiDeBaiRaNgoai, xuatTamThiGiac, ghiChuThayAnh, docAnhThiGiac,
  soDiRa,
  docDieuNho, docYTuong, docGopY,
  dangTamThiGiac, goTamThiGiac, soDangBai,
  doPheuThiGiac, doiMotTam } from './kien-truc-thi-giac.js';
import { soatNoiDung, mauBaiHoc, napBai, nopBai, kyBai, soKyBai, baiTreo,
  capQuyenNoiDung, thuHoiQuyenNoiDung, dsQuyenNoiDung,
  docBuoi, xuatChuanNghe, soatMienDich,
  chotTrichNghe, dsChotTrich } from './kien-truc-noi-dung.js';
import { nganHangBao, nhapGiaoDichTay, doiChieuNganHang, khopGiaoDich,
  hopThongBao, danhDauDaDoc } from './ngan-hang.js';
import { ghiChi, duyetChi, huyChi, soChi, chotKet, dsChotKet,
  xemThangDuyetChi, baoCaoChi, tongHopChi,
  capQuyenTaiChinh, thuHoiQuyenTaiChinh, dsQuyenTaiChinh } from './chi-tieu.js';

const HAN_PHIEN_GIO      = 12;
const HAN_KHOA_GIO       = 12;
const TRAN_XIN_KHOA_GIO  = 12;
const TRAN_SAI_MK        = 8;      /* lượt sai liên tiếp trước khi khoá */
const GIAY_KHOA_SAI      = 15 * 60;

/* ═══════════════ BỐN TUYẾN ═══════════════
   BẢN CHÉP của G.TUYEN trong src/data.tuyen.js, y như server/GITA_CapPhep.gs
   vẫn chép. Bộ kiểm phát hành (mục 36) đối chiếu các bản này mỗi lần chạy
   và dừng phát hành nếu lệch. */
const TUYEN = [
  { ma: 'GITA365',   trangThai: 'chay',  goiCu: true },
  { ma: 'ENGWIN365', trangThai: 'chuan', goiCu: false },
  { ma: 'MATH365',   trangThai: 'chuan', goiCu: false },
  { ma: 'SAT365',    trangThai: 'chuan', goiCu: false },
  { ma: 'HSA365',    trangThai: 'chuan', goiCu: false }
];
const SO_TANG = 5;

/* Bậc vai — bản chép của G.ROLES. Càng nhỏ càng nhiều quyền. */
const BAC = {R01:1,R02:2,R03:3,R04:4,R05:5,R06:6,R07:7,R08:8,
             R09:9,R10:10,R11:11,R12:12,R13:13,R14:14,R15:15};
const BAC_COACH = 7;   /* gói NGHỀ CAO dừng ở đúng bậc Coach — xem GITA_XemKhach.gs */

const tuyen_   = ma => TUYEN.find(t => t.ma === ma) || null;
const goiNghe_ = ma => { const t = tuyen_(ma); return t ? (t.goiCu ? 'nghe' : ma.toLowerCase() + '-nghe') : ''; };
const goiNgheCao_ = ma => { const t = tuyen_(ma); return t ? (t.goiCu ? 'nghe-cao' : ma.toLowerCase() + '-nghe-cao') : ''; };
const goiTang_ = (ma, tang) => {
  const t = tuyen_(ma);
  if (!t || !(tang >= 1 && tang <= SO_TANG)) return '';
  return t.goiCu ? 'tang' + tang : ma.toLowerCase() + '-t' + tang;
};

/* Tuyến của một tài khoản. Ô trống nghĩa là GITA365 — nhờ vậy mọi tài
   khoản có trước v7.8 giữ nguyên phạm vi cũ mà không phải điền gì.
   Chỉ tuyến ĐANG CHẠY mới được cấp; tuyến đang dựng chuẩn chưa có khoá. */
function tuyenCuaTK_(hoSo) {
  const tho = String((hoSo && hoSo.tuyen) || '').trim();
  if (!tho) return tuyen_('GITA365').trangThai === 'chay' ? ['GITA365'] : [];
  const ra = [];
  for (const x of tho.split(/[,;\s]+/)) {
    const t = tuyen_(String(x).toUpperCase());
    if (t && t.trangThai === 'chay' && ra.indexOf(t.ma) < 0) ra.push(t.ma);
  }
  return ra;
}

/** Phạm vi cấp phép — port nguyên văn gitaPhamViCapPhep của nền cũ.
    Đây là chỗ KHÔNG được viết lại cho gọn: mỗi dòng ở đây là một quyết
    định của chủ hệ về ai thấy được dữ liệu của ai, và "gọn hơn" ở đây
    nghĩa là "khác đi ở một chỗ nào đó không ai nhìn ra". */
export function phamViCapPhep(hoSo) {
  const ds = ['nen'];                       /* mọi tài khoản đã đăng nhập */

  /* VAI KHÔNG CÓ TRONG BẢNG THÌ DỪNG Ở PHẦN NỀN.

     Nền cũ viết  ROLES[hoSo.role] || {lv: 99}  rồi để rơi tiếp xuống
     nhánh khách hàng — nên một vai lạ vẫn nhận gói theo TẦNG của hồ sơ
     học viên gắn với tài khoản ấy. Hỏng theo hướng an toàn (không có
     gói nghề, không có nghề cao), nhưng nó là RƠI QUA chứ không phải
     một quyết định, và chỗ rơi qua thì không ai đọc ra được ý định.

     Chủ hệ đã chốt lối DANH SÁCH TRẮNG ở bản 9.46 cho quyền xem hồ sơ
     khách: vai nào không có tên là không được, kể cả vai chưa tồn tại
     hôm nay. Kê danh sách cấm thì mỗi vai mới sinh ra là mặc định nhìn
     thấy, và cái mặc định ấy không ai nhớ đi sửa. Cùng một luật, nên
     cùng một cách viết.

     Siết theo hướng CHẶT HƠN nền cũ, nên hai máy chủ chạy song song
     trong lúc chuyển nền không sinh ra chỗ hở nào. */
  if (!BAC[hoSo.role]) return ds;

  const lv = BAC[hoSo.role];
  const tuyenTK = tuyenCuaTK_(hoSo);

  if (lv <= 12) {
    for (const k of tuyenTK) {
      ds.push(goiNghe_(k));
      if (lv <= BAC_COACH) ds.push(goiNgheCao_(k));
      for (let i = 1; i <= SO_TANG; i++) ds.push(goiTang_(k, i));
    }
    return gon_(ds);
  }
  if (lv === 15) return ds;                 /* CTV giới thiệu: chỉ phần nền */

  const tang = Number(hoSo.tier || 0);
  if (!(tang >= 1)) return ds;
  for (const k of tuyenTK)
    for (let j = 1; j <= Math.min(SO_TANG, tang); j++) ds.push(goiTang_(k, j));
  return gon_(ds);
}
const gon_ = ds => ds.filter((x, i) => x && ds.indexOf(x) === i);

/* ═══════════════ VIỆC ═══════════════ */

export const CHUA_PORT = {
  xuatSheet: 'xuất bảng tính',
  napTaiLieu: 'gửi tài liệu', duyetTaiLieu: 'duyệt tài liệu',
  kiemDrive: 'kiểm thư mục Drive',
  ghiTinCongDong: 'ghi tin cộng đồng',
  docTinCongDong: 'đọc tin cộng đồng', guiChuyen: 'gửi chuyện',
  napTinhHuongKhach: 'nạp tình huống cho gia đình', xemKpiKhach: 'xem KPI khách',
  kiemBanMoi: 'kiểm bản mới'
};

const CAN_PHIEN = ['capKhoa', 'doiMatKhau', 'dongBo',
  'capQuyenXem', 'thuHoiQuyenXem', 'soiQuyenXem', 'xemKhachCao', 'nangTang',
  'kyChungCu', 'xacNhanChungCu', 'soiChungCu',
  'xemTepKhach', 'suaTepKhach', 'dsTepKhach',
  'ghiPhieuThu', 'duyetPhieuThu', 'congNo', 'banKeTaiChinh',
  'huyPhieuThu', 'ganPhieuVaoKy', 'deXuatHoan', 'duyetHoan', 'traHoaHong',
  'ganChungCuHoaHong', 'dongKyChuaToi', 'dsQuaHan', 'doiSoat',
  'soNgay', 'chotTuan', 'soatChot', 'tongHop', 'baoCaoKeToan', 'boSoKhaiThue',
  'dsChot',
  'ghiChi', 'duyetChi', 'huyChi', 'soChi', 'chotKet', 'dsChotKet',
  'xemThangDuyetChi', 'baoCaoChi', 'tongHopChi',
  'capQuyenTaiChinh', 'thuHoiQuyenTaiChinh', 'dsQuyenTaiChinh',
  'nhapGiaoDichTay', 'doiChieuNganHang', 'khopGiaoDich',
  'hopThongBao', 'danhDauDaDoc', 'chamKpiTaiChinh',
  'dangTinTaiChinh', 'bangTinTaiChinh', 'xuLyTinTaiChinh',
  'hoiTroLyTaiChinh',
  'datHeSoLuong', 'dsHeSoLuong', 'bangLuong', 'chotLuong', 'doiSoatLuong',
  'deXuatThiGiac', 'chuyenBacThiGiac', 'banMoiThiGiac', 'chamThiGiac',
  'ghiLuatThuongHieu', 'khoThiGiac', 'docTaiLieuThiGiac', 'docNoiDungThiGiac',
  'guiDeBaiRaNgoai', 'xuatTamThiGiac', 'ghiChuThayAnh', 'docAnhThiGiac',
  'soDiRa', 'docDieuNho', 'docYTuong', 'docGopY',
  'dangTamThiGiac', 'goTamThiGiac', 'soDangBai', 'doPheuThiGiac', 'doiMotTam',
  'soatNoiDung', 'mauBaiHoc', 'napBai', 'nopBai', 'kyBai', 'soKyBai', 'baiTreo',
  'capQuyenNoiDung', 'thuHoiQuyenNoiDung', 'dsQuyenNoiDung', 'docBuoi', 'xuatChuanNghe', 'soatMienDich',
  'chotTrichNghe', 'dsChotTrich',
  'deXuatMienGiam', 'duyetMienGiam', 'dsMienGiam',
  'ghiNhacThu', 'lichSuNhacThu', 'denHenChuaTra'];

async function lam(fn, y, env, db) {
  if (fn === 'dangNhap')  return await dangNhap(y, env, db);
  if (fn === 'dangXuat')  return await dangXuat(y, db);

  /* Bốn bước đăng ký — KHÔNG cần phiên, vì người đăng ký chưa có tài
     khoản nào để mở phiên. Đây cũng là lý do chúng là cửa dễ bị lợi
     dụng nhất; mọi chỗ chặt nằm trong dang-ky.js. */
  if (fn === 'dangKy')     return await dangKy(y, env, db);
  if (fn === 'guiLaiOtp')  return await guiLaiOtp(y, env, db);
  if (fn === 'xacThucOtp') return await xacThucOtp(y, env, db);
  if (fn === 'kichHoat')   return await kichHoat(y, env, db);

  /* Quên mật khẩu cũng không cần phiên, vì người quên mật khẩu thì
     không mở được phiên nào. */
  if (fn === 'quenMatKhau')   return await quenMatKhau(y, env, db);
  if (fn === 'datLaiMatKhau') return await datLaiMatKhau(y, env, db);

  /* ── CỬA NGÂN HÀNG: XÁC THỰC BẰNG KHOÁ RIÊNG, KHÔNG BẰNG PHIÊN ──

     Ngân hàng không đăng nhập được vào hệ. Cửa này phải đứng TRƯỚC cổng
     phiên, và khoá của nó chỉ mở đúng một việc: đẩy một dòng sao kê
     vào. Nó không mở được bất kỳ cửa nào khác trong hệ. */
  if (fn === 'nganHangBao') return await nganHangBao(y, env, db);

  if (CHUA_PORT[fn]) return {ok: false, code: 'CHUAPORT',
    error: 'Việc "' + CHUA_PORT[fn] + '" chưa chuyển sang máy chủ mới. ' +
           'Việc này vẫn chạy trên máy chủ cũ.'};

  if (CAN_PHIEN.indexOf(fn) < 0) return {ok: false, error: 'Yêu cầu không hợp lệ.'};

  const hoSo = await kiemPhien(db, y.token, y.u);
  if (!hoSo) return {ok: false, code: 'AUTH', error: 'Phiên không hợp lệ hoặc đã hết hạn.'};
  if (hoSo.khoa) return {ok: false, code: 'LOCKED', error: 'Tài khoản đang bị khoá.'};

  if (fn === 'doiMatKhau') return await doiMatKhau(y, env, db, hoSo);
  if (fn === 'capKhoa')    return await capKhoa(y, env, db, hoSo);
  if (fn === 'dongBo')     return await dongBo(y, env, db, hoSo);

  if (fn === 'capQuyenXem')    return await capQuyenXem(y, env, db, hoSo);
  if (fn === 'thuHoiQuyenXem') return await thuHoiQuyenXem(y, env, db, hoSo);
  if (fn === 'soiQuyenXem')    return await soiQuyenXem(y, env, db, hoSo);
  if (fn === 'xemKhachCao')    return await xemKhachCao(y, env, db, hoSo);
  if (fn === 'nangTang')       return await nangTang(y, env, db, hoSo);

  if (fn === 'kyChungCu')      return await kyChungCu(y, env, db, hoSo);
  if (fn === 'xacNhanChungCu') return await xacNhanChungCu(y, env, db, hoSo);
  if (fn === 'soiChungCu')     return await soiChungCu(y, env, db, hoSo);

  if (fn === 'xemTepKhach')  return await xemTepKhach(y, env, db, hoSo);
  if (fn === 'suaTepKhach')  return await suaTepKhach(y, env, db, hoSo);
  if (fn === 'dsTepKhach')   return await dsTepKhach(y, env, db, hoSo);

  if (fn === 'ghiPhieuThu')   return await ghiPhieuThu(y, env, db, hoSo);
  if (fn === 'duyetPhieuThu') return await duyetPhieuThu(y, env, db, hoSo);
  if (fn === 'congNo')        return await congNo(y, env, db, hoSo);
  if (fn === 'banKeTaiChinh') return await banKeTaiChinh(y, env, db, hoSo);

  /* Tám tình huống tiền nong ngoài đường thẳng — xem chú giải dài ở
     nửa dưới tai-chinh.js. Đường thẳng là đường ít xảy ra nhất. */
  if (fn === 'huyPhieuThu')       return await huyPhieuThu(y, env, db, hoSo);
  if (fn === 'ganPhieuVaoKy')     return await ganPhieuVaoKy(y, env, db, hoSo);
  if (fn === 'deXuatHoan')        return await deXuatHoan(y, env, db, hoSo);
  if (fn === 'duyetHoan')         return await duyetHoan(y, env, db, hoSo);
  if (fn === 'traHoaHong')        return await traHoaHong(y, env, db, hoSo);
  if (fn === 'ganChungCuHoaHong') return await ganChungCuHoaHong(y, env, db, hoSo);
  if (fn === 'dongKyChuaToi')     return await dongKyChuaToi(y, env, db, hoSo);
  if (fn === 'dsQuaHan')          return await dsQuaHan(y, env, db, hoSo);
  if (fn === 'doiSoat')           return await doiSoat(y, env, db, hoSo);

  /* Bốn nhịp báo cáo — ngày để nhìn tiền vào, tuần để CHỐT, tháng và
     quý để đổi chiến lược, quý và năm để kế toán. Bốn câu hỏi khác
     nhau nên bốn bản khác nhau; xem chú giải đầu bao-cao.js. */
  if (fn === 'soNgay')        return await soNgay(y, env, db, hoSo);
  if (fn === 'chotTuan')      return await chotTuan(y, env, db, hoSo);
  if (fn === 'soatChot')      return await soatChot(y, env, db, hoSo);
  if (fn === 'dsChot')        return await dsChot(y, env, db, hoSo);
  if (fn === 'tongHop')       return await tongHop(y, env, db, hoSo);
  if (fn === 'baoCaoKeToan')  return await baoCaoKeToan(y, env, db, hoSo);
  if (fn === 'boSoKhaiThue')  return await boSoKhaiThue(y, env, db, hoSo);

  /* Nửa còn lại của cuốn sổ — tiền RA, tiền được GIẢM, tiền phải ĐÒI,
     và tiền mặt phải ĐẾM. Xem chú giải đầu chi-tieu.js. */
  if (fn === 'ghiChi')  return await ghiChi(y, env, db, hoSo);
  if (fn === 'duyetChi')   return await duyetChi(y, env, db, hoSo);
  if (fn === 'huyChi')     return await huyChi(y, env, db, hoSo);
  if (fn === 'soChi')      return await soChi(y, env, db, hoSo);
  if (fn === 'chotKet')    return await chotKet(y, env, db, hoSo);
  if (fn === 'dsChotKet')  return await dsChotKet(y, env, db, hoSo);
  if (fn === 'xemThangDuyetChi') return await xemThangDuyetChi(y, env, db, hoSo);
  if (fn === 'baoCaoChi')        return await baoCaoChi(y, env, db, hoSo);
  if (fn === 'tongHopChi')       return await tongHopChi(y, env, db, hoSo);

  /* Phòng Kế toán – Tài chính: một TRỤC RIÊNG, vuông góc với thang vai.
     Xem chú giải dài ở chi-tieu.js. */
  if (fn === 'capQuyenTaiChinh')    return await capQuyenTaiChinh(y, env, db, hoSo);
  if (fn === 'thuHoiQuyenTaiChinh') return await thuHoiQuyenTaiChinh(y, env, db, hoSo);
  if (fn === 'dsQuyenTaiChinh')     return await dsQuyenTaiChinh(y, env, db, hoSo);

  /* Nối sổ kế toán với tài khoản ngân hàng, và thông báo trong hệ. */
  if (fn === 'nhapGiaoDichTay')   return await nhapGiaoDichTay(y, env, db, hoSo);
  if (fn === 'doiChieuNganHang')  return await doiChieuNganHang(y, env, db, hoSo);
  if (fn === 'khopGiaoDich')      return await khopGiaoDich(y, env, db, hoSo);
  if (fn === 'hopThongBao')       return await hopThongBao(y, env, db, hoSo);
  if (fn === 'danhDauDaDoc')      return await danhDauDaDoc(y, env, db, hoSo);
  if (fn === 'chamKpiTaiChinh')   return await chamKpiTaiChinh(y, env, db, hoSo);
  if (fn === 'dangTinTaiChinh')   return await dangTinTaiChinh(y, env, db, hoSo);
  if (fn === 'bangTinTaiChinh')   return await bangTinTaiChinh(y, env, db, hoSo);
  if (fn === 'xuLyTinTaiChinh')   return await xuLyTinTaiChinh(y, env, db, hoSo);
  if (fn === 'hoiTroLyTaiChinh')  return await hoiTroLyTaiChinh(y, env, db, hoSo);
  if (fn === 'datHeSoLuong')      return await datHeSoLuong(y, env, db, hoSo);
  if (fn === 'dsHeSoLuong')       return await dsHeSoLuong(y, env, db, hoSo);
  if (fn === 'bangLuong')         return await bangLuong(y, env, db, hoSo);
  if (fn === 'chotLuong')         return await chotLuong(y, env, db, hoSo);
  if (fn === 'doiSoatLuong')      return await doiSoatLuong(y, env, db, hoSo);
  if (fn === 'deXuatThiGiac')     return await deXuatThiGiac(y, env, db, hoSo);
  if (fn === 'chuyenBacThiGiac')  return await chuyenBacThiGiac(y, env, db, hoSo);
  if (fn === 'banMoiThiGiac')     return await banMoiThiGiac(y, env, db, hoSo);
  if (fn === 'chamThiGiac')       return await chamThiGiac(y, env, db, hoSo);
  if (fn === 'ghiChuThayAnh')     return await ghiChuThayAnh(y, env, db, hoSo);
  if (fn === 'docAnhThiGiac')     return await docAnhThiGiac(y, env, db, hoSo);
  if (fn === 'ghiLuatThuongHieu') return await ghiLuatThuongHieu(y, env, db, hoSo);
  if (fn === 'khoThiGiac')        return await khoThiGiac(y, env, db, hoSo);
  if (fn === 'docTaiLieuThiGiac') return await docTaiLieuThiGiac(y, env, db, hoSo);
  if (fn === 'docNoiDungThiGiac') return await docNoiDungThiGiac(y, env, db, hoSo);
  if (fn === 'xuatTamThiGiac') return await xuatTamThiGiac(y, env, db, hoSo);
  if (fn === 'guiDeBaiRaNgoai')   return await guiDeBaiRaNgoai(y, env, db, hoSo);
  if (fn === 'docDieuNho')        return await docDieuNho(y, env, db, hoSo);
  if (fn === 'docYTuong')         return await docYTuong(y, env, db, hoSo);
  if (fn === 'docGopY')           return await docGopY(y, env, db, hoSo);
  if (fn === 'dangTamThiGiac')    return await dangTamThiGiac(y, env, db, hoSo);
  if (fn === 'goTamThiGiac')      return await goTamThiGiac(y, env, db, hoSo);
  if (fn === 'soDangBai')         return await soDangBai(y, env, db, hoSo);
  if (fn === 'doPheuThiGiac')     return await doPheuThiGiac(y, env, db, hoSo);
  if (fn === 'doiMotTam')         return await doiMotTam(y, env, db, hoSo);
  if (fn === 'soDiRa')            return await soDiRa(y, env, db, hoSo);
  if (fn === 'soatNoiDung')       return await soatNoiDung(y, env, db, hoSo);
  if (fn === 'mauBaiHoc')         return await mauBaiHoc(y, env, db, hoSo);
  if (fn === 'napBai')            return await napBai(y, env, db, hoSo);
  if (fn === 'nopBai')            return await nopBai(y, env, db, hoSo);
  if (fn === 'kyBai')             return await kyBai(y, env, db, hoSo);
  if (fn === 'soKyBai')           return await soKyBai(y, env, db, hoSo);
  if (fn === 'baiTreo')           return await baiTreo(y, env, db, hoSo);
  if (fn === 'capQuyenNoiDung')   return await capQuyenNoiDung(y, env, db, hoSo);
  if (fn === 'thuHoiQuyenNoiDung') return await thuHoiQuyenNoiDung(y, env, db, hoSo);
  if (fn === 'dsQuyenNoiDung')    return await dsQuyenNoiDung(y, env, db, hoSo);
  if (fn === 'docBuoi')           return await docBuoi(y, env, db, hoSo);
  if (fn === 'xuatChuanNghe')     return await xuatChuanNghe(y, env, db, hoSo);
  if (fn === 'soatMienDich')      return await soatMienDich(y, env, db, hoSo);
  if (fn === 'chotTrichNghe')     return await chotTrichNghe(y, env, db, hoSo);
  if (fn === 'dsChotTrich')       return await dsChotTrich(y, env, db, hoSo);

  if (fn === 'deXuatMienGiam') return await deXuatMienGiam(y, env, db, hoSo);
  if (fn === 'duyetMienGiam')  return await duyetMienGiam(y, env, db, hoSo);
  if (fn === 'dsMienGiam')     return await dsMienGiam(y, env, db, hoSo);

  if (fn === 'ghiNhacThu')    return await ghiNhacThu(y, env, db, hoSo);
  if (fn === 'lichSuNhacThu') return await lichSuNhacThu(y, env, db, hoSo);
  if (fn === 'denHenChuaTra') return await denHenChuaTra(y, env, db, hoSo);
  return {ok: false, error: 'Yêu cầu không hợp lệ.'};
}

/* ── ĐĂNG NHẬP ──

   HAI CÂU TỪ CHỐI PHẢI GIỐNG HỆT NHAU cho "không có tài khoản này" và
   "sai mật khẩu". Khác nhau một chữ là dò được email nào đã đăng ký với
   Học viện, và danh sách ấy tự nó đã là dữ liệu của khách hàng. Nền cũ
   làm đúng chỗ này; giữ nguyên. */
const SAI = {ok: false, error: 'Tên đăng nhập hoặc mật khẩu chưa đúng.'};

async function dangNhap(y, env, db) {
  const u = String(y.u || '').trim().toLowerCase();
  const mk = String(y.mk || '');
  if (!u || !mk) return {ok: false, error: 'Thiếu tên đăng nhập hoặc mật khẩu.'};

  /* Đếm TRƯỚC khi tra, và đếm theo tên người ta gõ vào — đếm sau khi
     tra thì tài khoản không tồn tại được thử vô hạn lần. */
  const khoaNhip = 'dangNhapSai·' + u;
  const soSai = await Kho.demNhip(db, khoaNhip, GIAY_KHOA_SAI);
  if (soSai > TRAN_SAI_MK)
    return {ok: false, code: 'RATE',
      error: 'Sai quá nhiều lần. Thử lại sau 15 phút, hoặc dùng mục Quên mật khẩu.'};

  const nd = await Kho.nguoiTheoTen(db, u);
  if (!nd || nd.deletedAt) return SAI;

  const kq = await kiemMatKhau(nd, mk, env.GITA_TIEU);
  if (!kq.dung) return SAI;

  /* Đúng mật khẩu rồi thì nói THẬT là tài khoản đang khoá — tới đây
     người hỏi đã chứng minh họ là chủ tài khoản, nên câu trả lời rõ
     ràng không còn là chỗ rò rỉ nữa. Nền cũ cũng chia đúng như vậy. */
  if (!Number(nd.active))
    return {ok: false, code: 'LOCKED', error: 'Tài khoản đang bị khoá. Liên hệ quản trị.'};

  await Kho.xoaNhip(db, khoaNhip);

  /* NÂNG BẢN BĂM NGAY TRONG LƯỢT ĐĂNG NHẬP ĐÚNG NÀY.
     Đây là lần duy nhất máy chủ cầm mật khẩu thật trong tay, nên cũng
     là lần duy nhất nâng được mà không phải hỏi ai. Bỏ lỡ là phải đợi
     tới lần đăng nhập sau. */
  if (kq.canNangCap) {
    const muoi = muoiMoi();
    await db.prepare('UPDATE users SET pwSalt = ?, pwHash = ?, updatedAt = ? WHERE id = ?')
      .bind(muoi, await bamMoi(mk, muoi, env.GITA_TIEU), new Date().toISOString(), nd.id).run();
  }

  const token = await Kho.moPhien(db, nd, HAN_PHIEN_GIO);
  const hv = await Kho.hocVienCuaCha(db, nd.id);
  await Kho.ghiNhatKy(db, {uid: nd.id, username: nd.username, viec: 'DANG_NHAP',
    chiTiet: kq.canNangCap ? 'đã nâng bản băm mật khẩu' : ''});

  return {ok: true, token: token, u: nd.username, role: nd.role, portal: nd.portal,
    hoTen: nd.hoTen, tier: hv ? Number(hv.tier || 0) : 0,
    maKhachHang: nd.maKhachHang || '',
    phaiDoiMk: !!Number(nd.mustChangePw),
    hetHan: new Date(Date.now() + HAN_PHIEN_GIO * 3600e3).toISOString()};
}

async function dangXuat(y, db) {
  await Kho.dongPhien(db, y.token);
  return {ok: true};
}

/* ── ĐỔI MẬT KHẨU ── */
async function doiMatKhau(y, env, db, hoSo) {
  const nd = await Kho.nguoiTheoId(db, hoSo.uid);
  if (!nd) return {ok: false, error: 'Không tìm thấy tài khoản.'};

  const cu = await kiemMatKhau(nd, String(y.cu || ''), env.GITA_TIEU);
  if (!cu.dung) return {ok: false, error: 'Mật khẩu hiện tại chưa đúng.'};

  const moi = String(y.moi || '');
  const che = mkQuaDeDoan(moi, nd);
  if (che) return {ok: false, error: che};

  const muoi = muoiMoi();
  await db.prepare(
    'UPDATE users SET pwSalt = ?, pwHash = ?, mustChangePw = 0, pwDoiLuc = ?, updatedAt = ? WHERE id = ?'
  ).bind(muoi, await bamMoi(moi, muoi, env.GITA_TIEU),
    new Date().toISOString(), new Date().toISOString(), nd.id).run();

  /* ĐÁ MỌI PHIÊN KHÁC NGAY. Người đổi mật khẩu thường đổi vì nghi có
     người khác vào được; giữ lại phiên cũ là giữ nguyên cánh cửa mà họ
     vừa đi khoá. */
  const da = await Kho.daPhienKhac(db, nd.id, hoSo.token);
  await Kho.ghiNhatKy(db, {uid: nd.id, username: nd.username, viec: 'DOI_MAT_KHAU',
    chiTiet: 'đá ' + da + ' phiên khác'});
  return {ok: true, daPhien: da};
}

/* ── CẤP KHOÁ KHO ── */
async function capKhoa(y, env, db, hoSo) {
  if (hoSo.phaiDoiMk) {
    await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'CAP_KHOA_CHAN',
      chiTiet: 'Mật khẩu tạm chưa đổi'});
    return {ok: false, code: 'MUSTCHANGE',
      error: 'Tài khoản đang dùng mật khẩu tạm do máy sinh ra. ' +
             'Đổi sang mật khẩu của riêng anh chị rồi kho mới mở.'};
  }

  const soLan = await Kho.demNhip(db, 'xinKhoa·' + hoSo.u, 3600);
  if (soLan > TRAN_XIN_KHOA_GIO) {
    await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'CAP_KHOA_CHAN',
      chiTiet: 'Vượt trần ' + TRAN_XIN_KHOA_GIO + ' lượt/giờ — lượt thứ ' + soLan});
    return {ok: false, code: 'RATE', error: 'Xin khoá quá nhiều lần trong một giờ. Thử lại sau.'};
  }

  const duocCap = phamViCapPhep(hoSo);
  const xin = Array.isArray(y.goi) ? y.goi : duocCap;
  const cap = duocCap.filter(g => xin.indexOf(g) >= 0);

  /* BỘ KHOÁ NẰM TRONG SECRET CỦA WORKER, KHÔNG NẰM TRONG CƠ SỞ DỮ LIỆU.
     Một bản sao lưu cơ sở dữ liệu bị lộ mà kéo theo bộ khoá thì mất
     toàn bộ tài sản nội dung của Học viện, chứ không phải mất dữ liệu
     một người. Hai thứ ấy không được nằm cùng một chỗ. */
  let kho = {};
  try { kho = JSON.parse(env.GITA_KHOA_KHO || '{}'); } catch (e) { kho = {}; }
  if (!Object.keys(kho).length)
    return {ok: false, code: 'NOKEY', error: 'Máy chủ chưa được nạp bộ khoá.'};

  const traVe = {};
  for (const g of cap) if (kho[g]) traVe[g] = kho[g];

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'CAP_KHOA',
    doiTuong: cap.join(','), chiTiet: String(y.may || '').slice(0, 120)});

  return {ok: true, khoa: traVe, phamVi: cap,
    hetHan: new Date(Date.now() + HAN_KHOA_GIO * 3600e3).toISOString()};
}

/* ═══════════════ CỬA ═══════════════ */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};
const traJson = (o, ma) => new Response(JSON.stringify(o), {
  status: ma || 200,
  headers: {'Content-Type': 'application/json; charset=utf-8', ...CORS}
});

/* ═══════════════ DỌN THEO LỊCH ═══════════════

   Bốn bảng ở nền mới chỉ lớn lên nếu không ai dọn: phiên đã hết hạn,
   dòng chặn nhịp đã qua giờ, mã lấy lại mật khẩu đã chết, và lượt đăng
   ký bỏ dở. Đây đúng lớp việc mà bản 9.79 dựng GITA_DonDep.gs cho nền
   cũ; chuyển nền thì phải mang theo, nếu không thì vừa gỡ được một chỗ
   tắc lại dựng lại đúng chỗ ấy ở nơi mới.

   Ba luật giữ nguyên từ 9.79:

     1. XOÁ THEO LUẬT ĐÃ KHAI, KHÔNG THEO CẢM GIÁC. Bảng nào giữ bao
        lâu và VÌ SAO chừng ấy — khai ở HAN ngay dưới.
     2. KHÔNG BAO GIỜ XOÁ THỨ CÒN HIỆU LỰC. Mọi câu đều có điều kiện
        thời gian; không câu nào xoá theo số lượng.
     3. NÓI RA ĐÃ XOÁ BAO NHIÊU. Ghi một dòng vào nhật ký — một bộ dọn
        chạy im lặng là một bộ dọn không ai kiểm được, và ngày nó xoá
        nhầm thì cũng không ai biết nó đã chạy.

   Đăng ký bỏ dở giữ 30 ngày, nhưng lượt ĐANG CHỜ kích hoạt thì giữ bất
   kể bao lâu: người ta có thể mở thư cũ và bấm vào. */
const HAN = [
  {bang: 'sessions', cau: 'DELETE FROM sessions WHERE exp < ?',
   dv: () => [Date.now()],
   vi: 'phiên hết hạn thì không ai dùng lại được nữa'},

  {bang: 'chanNhip', cau: 'DELETE FROM chanNhip WHERE hetHan < ?',
   dv: () => [Date.now() - 86400e3],
   vi: 'giữ thêm một ngày sau khi hết hạn để còn tra lại khi có sự cố'},

  {bang: 'maLayLai', cau: 'DELETE FROM maLayLai WHERE hetHan < ?',
   dv: () => [Date.now() - 3600e3],
   vi: 'mã chết rồi thì giữ thêm một giờ, đủ để đọc nhật ký một sự cố đang xảy ra'},

  {bang: 'dangKyCho',
   cau: "DELETE FROM dangKyCho WHERE createdAt < ? AND trangThai <> 'choKichHoat'",
   dv: () => [new Date(Date.now() - 30 * 86400e3).toISOString()],
   vi: 'đăng ký bỏ dở quá ba mươi ngày thì người ta không quay lại nữa; ' +
       'lượt ĐANG CHỜ kích hoạt thì giữ bất kể bao lâu'}
];

export async function donDep(env) {
  const db = env.CSDL, ke = [];
  let tong = 0;
  for (const h of HAN) {
    try {
      const r = await db.prepare(h.cau).bind(...h.dv()).run();
      const n = (r && r.meta && r.meta.changes) || 0;
      tong += n;
      ke.push(h.bang + ' −' + n);
    } catch (e) {
      ke.push(h.bang + ': ' + String(e && e.message || e).slice(0, 80));
    }
  }
  /* Ghi SAU khi dọn, để chính dòng này không bị lượt dọn vừa rồi cuốn đi. */
  try {
    await Kho.ghiNhatKy(db, {viec: 'DON_DEP', doiTuong: 'tự động',
      chiTiet: 'xoá ' + tong + ' dòng · ' + ke.join(' · ')});
  } catch (e) {}
  return {ok: true, tongXoa: tong, ke};
}

export default {
  /* Cloudflare gọi hàm này theo lịch khai ở wrangler.toml.

     HAI KHUNG GIỜ, HAI VIỆC:

       20:00 UTC = 03:00 sáng giờ Việt Nam → DỌN
       00:00 UTC = 07:00 sáng giờ Việt Nam → BẢN TỔNG DOANH THU hôm qua

     Phân theo giờ chứ không chạy cả hai ở mỗi lần nổ: dọn hai lần một
     ngày là phí, còn gửi bản tổng hai lần là một hòm thư có hai lá
     giống nhau — và người đọc thôi tin cả hai.

     Bản đầu tôi viết cổng này là gioUTC === 0 trong khi wrangler.toml
     mới chỉ khai một khung 20:00. Nghĩa là bản tổng KHÔNG BAO GIỜ gửi,
     mà mã vẫn trông như đã làm xong việc. Nay khai đủ hai khung ở đó,
     và phép đo ở thu-worker.js gọi thẳng scheduled() với cả hai mốc. */
  async scheduled(su, env, ctx) {
    const gioUTC = new Date((su && su.scheduledTime) || Date.now()).getUTCHours();

    if (gioUTC === 0) {
      /* NGÀY LẤY TỪ MỐC ĐÃ HẸN, KHÔNG LẤY TỪ "BÂY GIỜ".

         Lượt chạy theo lịch có thể nổ muộn, hoặc chạy lại sau một lượt
         hỏng. Lấy "hôm qua" theo Date.now() thì một lượt chạy muộn qua
         nửa đêm sẽ tổng kết nhầm ngày, và ngày đúng thì không ai tổng
         kết nữa — mất hẳn một ngày khỏi chuỗi thư. */
      const homQua = new Date(new Date((su && su.scheduledTime) || Date.now())
        .getTime() + 7 * 3600e3 - 86400e3).toISOString().slice(0, 10);
      ctx.waitUntil(tongNgayDoanhThu(env, env.CSDL, homQua).catch(e =>
        console.error('BAO_DOANHTHU_NGAY_HONG', String(e && e.message || e))));
      return;
    }
    ctx.waitUntil(donDep(env));
  },

  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, {status: 204, headers: CORS});

    /* Trạng thái: máy chủ còn sống chưa, đã nạp khoá chưa. KHÔNG trả
       khoá nào, và không nói gì về số tài khoản. */
    if (req.method === 'GET') {
      let n = 0;
      try { n = Object.keys(JSON.parse(env.GITA_KHOA_KHO || '{}')).length; } catch (e) {}
      return traJson({ok: true, ten: 'GITA 365 — máy chủ cấp phép',
        daNapKhoa: n, luc: new Date().toISOString()});
    }
    if (req.method !== 'POST') return traJson({ok: false, error: 'Yêu cầu không hợp lệ.'}, 405);

    let y;
    try { y = await req.json(); } catch (e) { y = {}; }

    try {
      return traJson(await lam(String(y.fn || ''), y, env, env.CSDL));
    } catch (err) {
      /* KHÔNG ĐẨY LỜI LỖI CỦA MÁY RA CHO MÁY KHÁCH. Lời lỗi của cơ sở
         dữ liệu hay kể tên bảng, tên cột, có khi cả mảnh câu lệnh —
         đó là bản đồ cho người đi dò. Ghi đủ vào nhật ký máy chủ, trả
         ra một câu. */
      console.error('LOI', String(y.fn || ''), err && err.stack || err);
      return traJson({ok: false, error: 'Máy chủ gặp trục trặc. Thử lại sau ít phút.'}, 500);
    }
  }
};
