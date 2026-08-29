/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÃ HOÁ KHO TÀI SẢN
   Đọc nội dung gốc trong kho-goc/, chia thành các gói theo phạm vi
   cấp phép, mã hoá AES-256-GCM và xuất ra kho/*.enc

       node tools/ma-hoa-kho.js

   Ra hai thứ:
     kho/*.enc        — gói đã mã hoá, phát hành kèm ứng dụng được
     kho/khoa.json    — BỘ KHOÁ, nạp vào máy chủ cấp phép.
                        TUYỆT ĐỐI KHÔNG đưa tệp này lên kho mã.

   Khoá KHÔNG nằm trong ứng dụng. Máy chủ chỉ trả khoá của những gói
   mà vai và tầng của người đăng nhập được cấp phép.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const GOC = path.join(__dirname, '..');
const NGUON = path.join(GOC, 'kho-goc');
const RA = path.join(GOC, 'kho');

/* ─── Nạp nội dung gốc ─── */
global.window = {};
for (const t of fs.readdirSync(NGUON).filter(f => f.endsWith('.js')).sort())
  require(path.join(NGUON, t));
const G = global.window.G;

/* ─── Chia gói theo phạm vi cấp phép ─── */
const NEN = ['VANHANH', 'CHUYENDICH', 'CHANDUNG', 'LOTRINH', 'FAMILIES', 'TEAM', 'CUHICH',
  'NGHILE', 'SUKIEN', 'HEALTH', 'DUYET', 'AUDIT', 'TODAY', 'LEVELS', 'DIEM', 'HUYHIEU', 'KPI100', 'MATRAN',
  'QUA', 'HOAHONG', 'DANDAT', 'BRAND', 'RASOAT', 'TAMNHIN100', 'TANG100', 'WOW',
  'NHATBAN', 'CHIPHI', 'NGONTU_RANH', 'DAISU', 'BAIHOC', 'QUA1000', 'QUA_DANG', 'KETNOI', 'LIENKET', 'KICHBAN_AI',
  /* Hành trình 12 chặng mở cho MỌI vai — gia đình cũng phải thấy mình đang
     ở đâu trên đường. Nên nó nằm ở gói nền, không nằm sau kho nghề. */
  'TRU_GITA', 'HANHTRINH12', 'LOI_HUA_GITA',
  /* Kênh cộng đồng chính thức: phụ huynh chưa là khách hàng cũng phải
     thấy được nhóm. Đây là cửa trước, cùng lý do với GT_* và DV_*. */
  'KENH_DS', 'KENH_CHANG', 'KENH_LUAT',
  /* Bản đồ cá nhân 11 ô: mọi vai đều có một bản của riêng mình — học viên,
     phụ huynh, cộng tác viên, đội ngũ — nên nó thuộc gói nền. */
  'BDCN_MA', 'BDCN', 'BDCN_MUOI_VIEC', 'BDCN_QUY_TAC', 'BDCN_NHIP',
  /* Sáu trăm chuyện truyền cảm hứng, mỗi cấp tài khoản một trăm. Ở gói nền
     vì vai nào cũng phải có kho của cấp mình; màn hình lọc theo vai. */
  'CH_MACH', 'CH_CAP', 'ROHN', 'CHUYEN',
  /* Sổ nhật ký từng vị trí và bốn mốc thi viết: mọi vai đều dùng. */
  'NK_NHIP', 'NK_O', 'THI_VIET', 'THI_LUAT',
  /* Chuẩn thời gian, chuẩn hoàn thành, thang thưởng và phạt: mọi vai đều
     phải đọc được, vì luật mà không ai đọc được thì không phải luật. */
  'TG_NGUNG_GIAY', 'TG_LOAI', 'TG_XEP', 'TG_NHIEMVU', 'TG_THUONG', 'TG_PHAT', 'TG_QUYDOI',
  /* Bản giới thiệu Học viện và hồ sơ giọng đọc: mọi vai đều đọc được. */
  'GT_MOT_CAU', 'GT_VISAO', 'GT_HUA', 'GT_KHONG', 'GT_CHANG', 'GT_TANG', 'GT_VAI',
  'GT_HOI', 'GT_SO', 'GT_BUOC', 'GT_MUCTIEU', 'GT_MUCTIEU_RANH', 'GT_DONGHANH',
  'AD_THUMUC', 'AD_DUOI', 'AD_TRANGTHAI', 'AD_GIONG', 'AD_DIEUKHOAN', 'AD_KYTHUAT', 'AD_KHUNG',
  /* Bộ sát hạch và khoá đào tạo tự động. Ở gói NỀN vì cả sáu vai đều thi,
     kể cả học viên và phụ huynh — bài của ai thì màn hình lọc theo vai. */
  'SH_TRUC', 'SH_TRONGSO', 'SH_VAI', 'SH_TANG', 'SH_TOTNGHIEP', 'SH_LUAT', 'SH_HOI',
  'KH_LOTRINH', 'KH_BAI', 'KH_LUAT',
  /* Kho chuyện người thật — người có thật, việc có thật, ghi chép công khai.
     Ở gói nền vì mọi vai đều đọc được. */
  'TG_LINH', 'CHUYEN_TG',
  /* Lớp băng của ma trận: bốn nhóm khách hàng trong mỗi tầng. Ở gói nền
     vì bảng định nghĩa băng và luật xếp băng thì vai nào cũng phải đọc
     được; phần kế hoạch chi tiết vẫn nằm trong gói tầng như cũ. */
  'MT_BANG', 'MT_BANG_MA', 'MT_BANG_TANG', 'MT_BANG_NHOM', 'MT_DO', 'MT_BANG_LUAT',
  /* Đường vào sáu bước: người mới chưa có tầng nào cũng phải đọc được,
     nên nó thuộc gói nền. */
  'DV_BUOC', 'DV_CHAN', 'DV_HOI',
  /* Chuẩn soát đủ ruột. Ở gói NỀN chứ không phải gói nghề: màn tự soát
     phải chạy được ngay cả khi gói nghề chưa nạp — chính lúc đó nó mới
     báo được kho nào chưa nạp. */
  'SOAT_BAT_BUOC', 'SOAT_THA', 'SOAT_MOC', 'SOAT_CHATLUONG'];

const NGHE = [
  /* Chiều sâu năm lớp: nói rõ ở cấp nghề nào thì làm được gì và CHƯA làm
     được gì. Đây là bản đồ năng lực nội bộ của Học viện — mở ra công khai
     là chỉ cho đối thủ đúng cách dựng đội ngũ. Ở gói NGHỀ. */
  'MT_SAU', 'SAU_BOICANH', 'SAU_TRUONG_CAP', 'SAU_TRUONG_CHUNG', 'SAU_LUAT',
  /* Chuẩn hợp đồng theo tuyến: nó liệt kê mọi điều khoản Học viện tự
     buộc mình phải có, kèm rủi ro khi thiếu. Đưa ra công khai là đưa cho
     đối thủ bản đồ pháp lý và cho bên tranh chấp danh sách chỗ yếu. */
  'HD_CHUAN', 'HD_RIENG', 'HD_LUAT',
  /* Bảng quy trình toàn hệ: nó vẽ ra cách Học viện vận hành, gồm cả
     luồng giữ tài sản và luồng thanh tra. Đây là bản đồ nội bộ. */
  'QT_LUONG', 'QT_RIENG', 'QT_LUAT',
  /* Gốc NLP và trạng thái bằng chứng: đây là chuẩn nghề — nó nói rõ chỗ
     nào Học viện đang nói chắc hơn bằng chứng cho phép. Ở kho nghề. */
  'NLP_GOC', 'NLP_MUC', 'NLP_CAITIEN', 'NLP_LUAT',
  /* Phạm vi học phí: nói rõ bảng giá này chỉ của GITA365. */
  'HP_PHAM_VI','MOTHUC', 'SACH', 'BANDO_A3', 'POSTER', 'SODO', 'PHACDO',
  'DIEMCHAM', 'NGONTU', 'NGONTU_TANG', 'THAYVI', 'MAUTHOAI', 'PERSONA',
  'CHUAN1000', 'HAILONG', 'TAILIEU', 'AIPOLICY', 'KPI', 'DINHTUYEN', 'AINANGCAP',
  'LACHAN', 'BENCH', 'BENCH_AI',
  'LUAT_TK', 'TAIKHOAN_KPI', 'YEUCAU_MO', 'HANG_TL', 'DAU_MAT', 'QUYTRINH',
  'VANBAN', 'TAICHINH_QT', 'THANHTRA', 'RASOAT_KH', 'BANDO_TUVAN', 'BANDO_COACH',
  'XUAT', 'TINHHUONG', 'KHUNG_T5', 'THANHTOAN',
  'REFERRAL', 'CHANDUNG_KH', 'DOLUONG_KH', 'PHANHANG', 'CHUAN_VIP', 'NHANSU_TT', 'CAYTIEN',
  'HOSO_VIP', 'CHUYENDOI', 'XUONG_SONG', 'NGUON_VAITRO', 'SACH_THAMKHAO', 'PHUONGPHAP', 'VANTAY', 'AICHAM', 'TAILIEU_GOC', 'TAILIEU_DRIVE', 'SOTAY_NHANDIEN', 'CAPDO_VANDUNG', 'VANDUNG', 'QUYTRINH_XL', 'RANG_BUOC',
  'TN7', 'LOI5', 'REF_CHUAN', 'TRUYENTHONG3', 'BANG_GAINS', 'BANG_REF', 'REF16', 'REF_GIAIDOAN',
  'REF_LOI5', 'CHUOI10', 'BANDAP',
  /* Phiếu chỉ dẫn referral bản đầy đủ, bộ làm việc sáu chân dung, và lớp
     tra cứu kho tư liệu. Ở gói NGHỀ vì đây là tài sản chuyên môn: người
     giới thiệu và đội ngũ dùng, khách hàng không thấy. */
  /* Học phí và kịch bản nói chuyện tiền: kho NGHỀ. Gia đình đọc bản mô tả
     chặng, không đọc nhịp thu và không đọc kịch bản xử lý phản đối. */
  'HP_TANG', 'HP_LUAT', 'HP_KICHBAN', 'HP_SOAT',
  'REF_30S', 'REF_GAINS_GITA', 'REF_121', 'REF_CHAM', 'REF_CHAM_MUC', 'REF_TRANGTHAI',
  'REF_BANGIAO', 'REF_CAMON', 'REF_KHONG', 'REF_HOI', 'REF_KPI', 'REF_LOI',
  'CD_BO', 'CD_LUAT',
  'TL_KE', 'TL_DUONG', 'TL_LUAT', 'TL_TRICH', 'TL_BAOQUAN',
  'KHACHLON_NGUON', 'KHACH_TANG', 'NAM_TANG_PHUCVU', 'TAM_NAM_TANG', 'NAC_QUANHE',
  'NAC_TRUNGTHANH', 'TAM_MATXICH', 'HOSO68', 'MUOIHAI_NGUYENTAC', 'NHANTANG',
  'NAM_BUOC_KHIEUNAI', 'GIU124', 'VISAO_ROIDI', 'KHACHLON_CAU', 'LUAT_LAMVIEC'];

const goi = {};
goi.nen  = Object.fromEntries(NEN.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));
goi.nghe = Object.fromEntries(NGHE.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));
for (let t = 1; t <= 5; t++)
  goi['tang' + t] = {
    KICHBAN: (G.KICHBAN || []).filter(k => k.tang === 'T' + t),
    TEST750: (G.TEST750 || []).filter(b => b.tang === 'T' + t),
    ['MATRAN_T' + t]: G['MATRAN_T' + t] || []
  };

/* ─── Gói của bốn tuyến chuyên môn ───
   ENGWIN365 · MATH365 · SAT365 · HSA365 dùng chung năm tầng của GITA365
   nhưng có kho riêng và băng riêng, nên mỗi tuyến có gói cấp phép riêng:
   bán MATH365 mà không mở SAT365.

   Quy ước đặt tên kho của một tuyến: tiền tố là mã tuyến, ví dụ
   MATH365_BANG · MATH365_KICHBAN · MATH365_TANG · MATH365_DO. Đặt tên
   như thế thì chỗ này không phải liệt kê tay từng kho — thêm một tệp
   kho-goc/data.math365.js là gói tự có nội dung.

   CHỈ dựng gói khi tuyến ĐÃ CÓ nội dung. Dựng gói rỗng thì bộ khoá có
   thêm một khoá mở ra một cái hộp không có gì, và người cấp giấy phép
   tưởng tuyến ấy đã sẵn sàng. */
{
  global.window = global.window || {};
  require(path.join(GOC, 'src', 'data.tuyen.js'));
  const T = global.window.G;
  /* data.tuyen.js gán vào cùng một window.G nên G ở trên đã có sẵn các
     hàm tên gói; lấy lại cho rõ ý là đang dùng bảng tuyến. */
  const boQua = [];
  for (const t of T.TUYEN) {
    if (t.goiCu) continue;                       /* GITA365 đã dựng ở trên */
    const tienTo = t.ma + '_';
    const kho = Object.keys(G).filter(k => k.indexOf(tienTo) === 0);
    if (!kho.length) { boQua.push(t.ma); continue; }

    /* Kho chung của tuyến (băng, chuẩn đo, luật) đi vào gói nghề; nội
       dung theo tầng tách ra đúng tầng của nó. */
    goi[T.goiNghe(t.ma)] = Object.fromEntries(
      kho.filter(k => !/_T[1-5]$/.test(k)).map(k => [k, G[k]]));
    for (let n = 1; n <= T.TUYEN_SO_TANG; n++) {
      const rieng = kho.filter(k => k.endsWith('_T' + n));
      if (!rieng.length) continue;
      goi[T.goiTang(t.ma, n)] = Object.fromEntries(rieng.map(k => [k, G[k]]));
    }
    if (t.trangThai !== 'chay')
      console.log('  ⚠ ' + t.ma + ' có nội dung nhưng trangThai vẫn là "chuan" — ' +
        'đổi sang "chay" trong src/data.tuyen.js và server/GITA_CapPhep.gs thì khách mới mở được.');
  }
  if (boQua.length)
    console.log('  Chưa dựng gói cho: ' + boQua.join(' ') + ' — chưa có kho nào mang tiền tố ấy.\n');
}

/* ─── Mã hoá ───
   Khoá được GIỮ NGUYÊN giữa các lần mã hoá lại. Đổi khoá là mọi giấy
   phép đã cấp cho khách và cho đội ngũ đều hết dùng được ngay lập tức.
   Muốn đổi khoá thật (khi nghi rò rỉ) thì chạy:  node tools/ma-hoa-kho.js --doi-khoa
   rồi cấp lại giấy phép cho toàn bộ người đang dùng. */
fs.mkdirSync(RA, { recursive: true });
const doiKhoa = process.argv.includes('--doi-khoa');
let khoaCu = {};
if (!doiKhoa) {
  try { khoaCu = JSON.parse(fs.readFileSync(path.join(RA, 'khoa.json'), 'utf8')).khoa || {}; }
  catch { khoaCu = {}; }
}
if (doiKhoa) console.log('  ⚠ ĐỔI KHOÁ: mọi giấy phép đã cấp sẽ hết hiệu lực. Phải cấp lại toàn bộ.\n');
const khoa = {};
let tong = 0;
let giu = 0;

for (const [ten, du] of Object.entries(goi)) {
  const ro = Buffer.from(JSON.stringify(du), 'utf8');
  const k = khoaCu[ten] ? Buffer.from(khoaCu[ten], 'base64') : crypto.randomBytes(32);
  if (khoaCu[ten] && k.length === 32) giu++; else if (khoaCu[ten]) throw new Error('Khoá cũ của gói ' + ten + ' không đúng 32 byte.');
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', k, iv);
  const ma = Buffer.concat([c.update(ro), c.final()]);
  const tag = c.getAuthTag();
  /* iv (12) + tag (16) + dữ liệu */
  fs.writeFileSync(path.join(RA, ten + '.enc'), Buffer.concat([iv, tag, ma]));
  khoa[ten] = k.toString('base64');
  tong += ma.length;
  console.log('  ' + ten.padEnd(8) + ' ' + String(Math.round(ro.length / 1024)).padStart(4) + ' KB → ' +
    String(Math.round(ma.length / 1024)).padStart(4) + ' KB đã mã hoá');
}

fs.writeFileSync(path.join(RA, 'khoa.json'), JSON.stringify({
  chuY: 'BỘ KHOÁ MẬT — nạp vào máy chủ cấp phép, không bao giờ đưa lên kho mã.',
  taoLuc: new Date().toISOString(),
  thuatToan: 'AES-256-GCM',
  khoa
}, null, 2));

/* ─── Gói mẫu công khai: đủ để xem giao diện, không lộ kho ───
   Chỉ những phần GITA 365 vẫn nói ra ngoài khi giới thiệu: câu chuyện
   chuyển hoá, lộ trình năm tầng, kiến trúc trăm năm, chuỗi trải nghiệm,
   cách ghi nhận và nhận diện thương hiệu. Phần nghề — 1.000 kịch bản,
   220 phác đồ, 42 mô thức, ngôn từ dẫn dắt, tình huống, văn bản, tài
   chính, quản trị — KHÔNG nằm ở đây. */
const MO_RA = [
  /* Phần GITA vẫn nói ra ngoài khi giới thiệu */
  'CHUYENDICH', 'LOTRINH', 'TIERS', 'TAMNHIN100', 'TANG100', 'WOW',
  'NHATBAN', 'LEVELS', 'DIEM', 'HUYHIEU', 'QUA_DANG', 'BRAND', 'BAIHOC',
  /* Mở thêm ở v7.6 — mô hình công khai và nhịp sống nhà mình.
     Lý do: khoá những phần này làm gia đình không dùng được ứng dụng
     hằng ngày, trong khi chúng đã nằm trong tài liệu giới thiệu và
     trang web của Học viện. Phần NGHỀ vẫn khoá nguyên: 1.000 kịch bản
     đầy đủ, 220 phác đồ, 42 mô thức, ngôn từ dẫn dắt, 250 tình huống,
     ma trận, xương sống phương pháp, hệ VIP và Cây Tiền, toàn bộ quản
     trị và tài chính. */
  'VANHANH',      /* 5 khoang · 9 vai — mô hình lõi, đã công bố */
  'CHANDUNG',     /* mười chân dung thành công */
  'CUHICH',       /* cú hích lớn trong nhà */
  'NGHILE',       /* thói quen và nghi lễ gia đình */
  'SUKIEN',       /* sự kiện và lửa trại */
  'KETNOI',       /* kết nối hệ sinh thái */
  'LIENKET',      /* liên kết giữa các phần */
  'DAISU',        /* chương trình đại sứ — điều kiện công khai */
  'HOAHONG',      /* bốn cấp và trần hoa hồng 10% — điều khoản thương mại công khai */
  'NGONTU_RANH',  /* sáu ranh giới — luật an toàn, càng nhiều người biết càng tốt */
  'QUA',          /* cách ghi nhận và trao quà */
  'DANDAT',       /* hành trình người dẫn dắt — phần giới thiệu nghề */
  /* Đường vào sáu bước: đây CHÍNH LÀ phần giới thiệu. Một gia đình
     đang cân nhắc phải xem được con đường trước khi quyết định bước
     vào — khoá nó lại là khoá đúng cái cửa mình đang mời người ta qua.
     Phần học phí (HP_*) thì ngược lại: vẫn khoá trong kho nghề. */
  'DV_BUOC', 'DV_CHAN', 'DV_HOI',
  /* Bản giới thiệu Học viện. Cùng một lý do với DV_* và mạnh hơn: màn
     "GITA 365 là gì" mở cho MỌI người (capMo:'chung') — đó là cửa trước.
     Nhưng kho GT_* lại chỉ nằm ở gói NỀN, nên trên bản giới thiệu một tệp
     và trên trang web công khai, màn ấy dựng ra đúng mười hai cái tiêu đề
     mục và không có chữ nào bên trong. Người đầu tiên nhìn thấy GITA365
     nhìn thấy một cái khung rỗng.

     Nội dung này vốn đã là thứ Học viện nói ra ngoài: sứ mệnh, tầm nhìn,
     mục tiêu có mốc, năm tầng, văn hoá, cách đồng hành, và cả sáu điều
     Học viện KHÔNG làm. Khoá nó lại là khoá đúng cái cửa mình đang mời
     người ta bước qua.

     Phần nghề vẫn khoá nguyên: 1.000 kịch bản, 220 phác đồ, 42 mô thức,
     250 tình huống, ma trận, và toàn bộ HP_* học phí. */
  'GT_MOT_CAU', 'GT_VISAO', 'GT_HUA', 'GT_KHONG', 'GT_CHANG', 'GT_TANG',
  'GT_VAI', 'GT_HOI', 'GT_SO', 'GT_BUOC', 'GT_MUCTIEU', 'GT_MUCTIEU_RANH',
  'GT_DONGHANH',
  /* Hành trình 12 chặng: con số "12 chặng" đã nằm ngay trong bảng số liệu
     giới thiệu, và một gia đình đang cân nhắc cần nhìn thấy con đường
     trước khi quyết bước vào. Giấu chính tấm bản đồ mình đang mời người
     ta đi thì lời mời không có nghĩa gì. */
  'HANHTRINH12', 'TRU_GITA',
  'KENH_DS', 'KENH_CHANG', 'KENH_LUAT'
  /* SOAT_* KHÔNG nằm ở đây. Chuẩn soát liệt kê tên mọi kho nội bộ, trường
     bắt buộc của từng kho và số bản ghi phải có — đưa vào gói mẫu công khai
     là vẽ sẵn bản đồ kho cho người chưa được cấp phép. Nó ở gói NỀN. */
];
const mau = {
  ...Object.fromEntries(MO_RA.map(k => [k, G[k]]).filter(([, v]) => v !== undefined)),
  KICHBAN: (G.KICHBAN || []).filter(k => k.tang === 'T1').slice(0, 8)
    .map(k => ({ ...k, mo: (k.mo || '').slice(0, 90) + '… [cần cấp phép]', chot: undefined, khong: undefined })),
  PHACDO: (G.PHACDO || []).slice(0, 6)
    .map(p => ({ ma: p.ma, nhom: p.nhom, nhomTen: p.nhomTen, ten: p.ten })),
  MOTHUC: (G.MOTHUC || []).slice(0, 4)
    .map(m => ({ id: m.id, title: m.title, summary: (m.summary || '').slice(0, 120) + '… [cần cấp phép]' })),
  /* Mười điểm về đích: mở tên và ý nghĩa, mở đủ tiêu chí của điểm mốc
     đầu tiên. Chín mốc còn lại chỉ đếm số tiêu chí, không mở nội dung. */
  KPI100: G.KPI100 && {
    ...G.KPI100,
    diem: G.KPI100.diem.map((d, i) => ({
      ...d, tc: i === 0 ? d.tc : d.tc.map(() => '[Tiêu chí mở khi được cấp phép]')
    }))
  },
  /* Một bài test rút gọn, đủ để thấy cách chấm và cách phân nhóm. */
  TEST750: (G.TEST750 || []).filter(b => b.tang === 'T1').slice(0, 1)
    .map(b => ({ ...b, mau: true, cau: b.cau.slice(0, 6) }))
};
fs.writeFileSync(path.join(RA, 'mau.json'), JSON.stringify(mau));

console.log('\n  Tổng ' + Math.round(tong / 1024) + ' KB đã mã hoá · ' +
  Object.keys(khoa).length + ' gói · khoá ghi vào kho/khoa.json');
console.log('  Giữ nguyên ' + giu + ' khoá cũ' + (giu ? ' — giấy phép đã cấp vẫn dùng được.' : '.'));
console.log('  ⚠ kho/khoa.json và kho-goc/ đều nằm trong .gitignore — kiểm lại trước khi đẩy.');
