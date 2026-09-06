/* ═══════════════════════════════════════════════════════════════
   GITA 365 · CỬA VÀO MỚI — KIẾN TRÚC SƯ THỊ GIÁC

   Chốt của chủ hệ thống bản 9.99.10:
   "Hiểu hệ thống trước — hiểu nội dung — hiểu người dùng — rồi mới
    thiết kế."

   ══ CÁI NÀY KHÔNG PHẢI MỘT BỘ TẠO ẢNH ══

   Nó là một CỔNG. Việc của nó là chặn một tấm hình sai Tầng lại TRƯỚC
   khi có ai bỏ công vẽ nó, và bắt mỗi tấm đi qua đủ sáu bậc: nháp → đề
   xuất → mô phỏng → duyệt → bản cuối → phát hành.

   Vì sao cổng đáng giá hơn bộ vẽ: một tấm hình đẹp mà sai Tầng thì tệ
   hơn một tấm xấu mà đúng — tấm đẹp được tin, và cái sai đi theo nó xa
   hơn. Bộ vẽ làm ra tấm đẹp. Cổng là thứ giữ cho nó đúng.

   ══ RANH GIỚI TẦNG ĐỌC TỪ BẢNG GIÁ, KHÔNG KHAI LẠI ══

   G.HP_TANG[].gom và .khong là ranh giới đã được duyệt và đang dùng để
   bán hàng. Khai một bản thứ hai ở đây là dựng hai sự thật, và bản thứ
   hai không ai sửa khi bảng giá đổi.

   Máy chủ không đọc được kho đã mã hoá, nên nó giữ đúng cái TỐI THIỂU
   để chặn: mã Tầng, thứ tự Tầng, và danh sách khái niệm cấm theo Tầng —
   và mục 71 của bộ kiểm đối chiếu danh sách ấy với HP_TANG[].khong mỗi
   lần chạy. Lệch là đỏ.

   ══ MÁY ĐỀ XUẤT. CHỦ HỆ QUYẾT. ══

   Không có đường nào đi tắt qua một bậc duyệt. Và không bậc nào ghi đè
   bậc trước: sửa một bản đã duyệt là ghi một BẢN MỚI trỏ về bản cũ.
   Một tấm đã phát hành thì đã ở trong tay khách; ghi đè bản trong kho
   là làm kho nói khác thứ khách đang cầm.
   ═══════════════════════════════════════════════════════════════ */

import { Kho, tokenMoi } from './nen.js';

const BAC = {R01:1,R02:2,R03:3,R04:4,R05:5,R06:6,R07:7,R08:8,
             R09:9,R10:10,R11:11,R12:12,R13:13,R14:14,R15:15};

/* ══ BẢN CHÉP TỐI THIỂU CỦA RANH GIỚI TẦNG ══

   Mỗi Tầng: những KHÁI NIỆM tầng ấy chưa có. Rút từ HP_TANG[].khong.
   Đây là bản chép, và nó được đối chiếu — xem chú giải ở đầu tệp. */
/* MỌI KHOÁ Ở ĐÂY PHẢI TÌM THẤY ĐƯỢC TRONG HP_TANG[].khong CỦA CHÍNH
   TẦNG ẤY. Bản đầu tôi tự nghĩ ra mười khoá cho T2, T3, T4 — "365
   ngày", "dashboard", "cả năm", "coach cho cả gia đình" — nghe rất hợp
   lý và không có khoá nào trong số đó được ai duyệt.

   Đó đúng là thứ luật "không tự suy diễn" sinh ra để cấm, và mục 75 của
   bộ kiểm bắt được ngay lần chạy đầu. Nếu không có phép đo ấy thì cổng
   Tầng đã chặn thiết kế theo một ranh giới do tôi bịa, im lặng, và
   người bị chặn sẽ đi tìm trong bảng chặng xem mình sai ở đâu — mà
   không có gì ở đó cả. */
const CAM_THEO_TANG = {
  T1: ['coach đồng hành', 'kho nghề', 'phác đồ', 'kịch bản', 'ma trận',
       'dạy môn', 'tiết học'],
  T2: ['định hướng nghề', 'dự án', 'buổi làm việc riêng'],
  T3: ['lộ trình gia đình', 'huấn luyện riêng'],
  T4: ['vai dẫn dắt'],
  T5: ['đứng lớp thay']
};
const THU_TU_TANG = ['T1', 'T2', 'T3', 'T4', 'T5'];

const LOAI_HINH = ['BANDO_HANHTRINH', 'KHUNG', 'BANG_DIEU_KHIEN', 'DANH_SACH_VIEC',
  'TRUOC_SAU', 'NHIP', 'CONG', 'SO_SANH_TANG', 'VAI_TRO', 'MOT_SO', 'QUY_TRINH', 'BIA'];
const NGUOI_XEM = ['PHUHUYNH', 'HOCVIEN', 'GIADINH', 'COACH', 'CHUHE'];

/* Sáu bậc, và bậc nào đi tiếp được sang bậc nào. */
const BAC_TIEP = {
  nhap: ['deXuat'], deXuat: ['mophong', 'tuChoi'], mophong: ['duyet', 'tuChoi'],
  duyet: ['hoanThien'], hoanThien: ['phatHanh'], phatHanh: [], tuChoi: []
};

const TRONG_DIEM = {D1: 25, D2: 20, D3: 15, D4: 15, D5: 10, D6: 10, D7: 5};
const BAC_DIEM = [{tu: 95, ten: 'Xuất sắc'}, {tu: 90, ten: 'Đạt'},
                  {tu: 80, ten: 'Sửa lại'}, {tu: 0, ten: 'Không đạt'}];

const boDau = s => String(s || '').toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

/** Ai được dùng cổng này. Thiết kế là việc của người làm nghề và quản
    lý, không phải của khách. */
function duocVao(hoSo) { return (BAC[hoSo.role] || 99) <= 5; }
function laChuHe(hoSo) { return hoSo.role === 'R01'; }

/* ═══════════════ TIER GUARDIAN ═══════════════

   Việc DUY NHẤT của nó: nội dung này có nói tới một khái niệm mà Tầng
   ấy chưa có không.

   Nó không đoán Tầng hộ người đăng. Đoán Tầng là chỗ dễ sai nhất và
   sai im lặng nhất — một nội dung nói "90 ngày" có thể là T3, mà cũng
   có thể là một trang so sánh các chặng. Người đăng khai Tầng, máy
   kiểm khai ấy có mâu thuẫn với chính nội dung không. */
function soatTang(tang, chu) {
  if (THU_TU_TANG.indexOf(tang) < 0)
    return {qua: false, ma: 'TANGLA', vi: 'Tầng phải là một trong ' +
      THU_TU_TANG.join(', ') + '.'};

  const t = boDau(chu);
  const pham = (CAM_THEO_TANG[tang] || []).filter(k => t.indexOf(boDau(k)) >= 0);
  if (pham.length)
    return {qua: false, ma: 'VUOTTANG', phamPhai: pham,
      vi: 'Nội dung khai là ' + tang + ' nhưng nhắc tới ' +
        pham.map(x => '"' + x + '"').join(', ') + ' — những thứ chặng này ' +
        'KHÔNG có. Một tấm hình đưa tính năng tầng cao xuống tầng thấp là ' +
        'một lời hứa hệ thống không giữ được, và nhà đọc nó sẽ thấy mình bị ' +
        'hụt đúng ở chỗ họ đã tin.'};

  return {qua: true, tang, vi: 'Không nhắc tới khái niệm nào ngoài phạm vi ' + tang + '.'};
}

/* ═══════════════ ĐỀ XUẤT ═══════════════ */
export async function deXuatThiGiac(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};

  const d = y.deXuat || {};
  const noiDung = String(d.noiDung || '').trim();
  const tang = String(d.tang || '').trim().toUpperCase();
  const loaiHinh = String(d.loaiHinh || '').trim();
  const nhiemVu = String(d.nhiemVu || '').trim();

  if (noiDung.length < 20) return {ok: false,
    error: 'Nói rõ nội dung cần hình. Dưới hai mươi chữ thì chưa đủ để ' +
           'máy soi Tầng, và một đề xuất không soi được Tầng là một đề xuất ' +
           'chưa bắt đầu.'};
  if (LOAI_HINH.indexOf(loaiHinh) < 0) return {ok: false,
    error: 'Loại hình phải là một trong: ' + LOAI_HINH.join(', ') + '.'};

  /* ── MỘT VISUAL — MỘT NHIỆM VỤ ──
     Luật vàng. Nhồi hai nhiệm vụ vào một tấm thì người xem không nhớ
     được cái nào, và tấm hình ấy tốn tiền làm ra để không làm việc gì. */
  if (nhiemVu.length < 10) return {ok: false, code: 'THIEUNHIEMVU',
    error: 'Một hình — một nhiệm vụ. Viết ra nhiệm vụ DUY NHẤT của tấm này. ' +
           'Không viết được thành một câu nghĩa là nó đang mang nhiều hơn một ' +
           'việc, và tấm mang hai việc thì không làm xong việc nào.'};
  /* KHÔNG DÙNG \b VỚI TIẾNG VIỆT CÓ DẤU. Bản đầu viết /\bvà\b/ và nó
     KHÔNG BAO GIỜ khớp: \b đòi một biên giữa ký tự-từ và không-phải-từ,
     mà "à" đứng ngoài lớp \w của JavaScript, nên sau nó không có biên
     nào cả. Phép chặn im lặng suốt — nhận mọi nhiệm vụ gộp. Bộ thử bắt
     ngay lần chạy đầu. Đây là cái bẫy chung cho mọi phép dò chữ tiếng
     Việt trong kho này. */
  const demVa = nhiemVu.split(/(?:^|\s)và(?:\s|$)/).length - 1;
  if (demVa >= 2)
    return {ok: false, code: 'NHIEUNHIEMVU',
      error: 'Nhiệm vụ này có nhiều hơn một chữ "và" — gần như chắc chắn nó ' +
             'đang gộp mấy việc. Tách thành mấy tấm.'};

  const nx = Array.isArray(d.nguoiXem) ? d.nguoiXem : [];
  const nxLa = nx.filter(x => NGUOI_XEM.indexOf(x) < 0);
  if (!nx.length) return {ok: false, code: 'THIEUNGUOIXEM',
    error: 'Chưa nói hình này cho AI xem. Cùng một nội dung, phụ huynh và ' +
           'học viên mang hai câu hỏi khác nhau tới, nên cần hai tấm khác nhau.'};
  if (nxLa.length) return {ok: false,
    error: 'Người xem lạ: ' + nxLa.join(', ') + '. Chỉ nhận ' + NGUOI_XEM.join(', ') + '.'};

  /* ── CỔNG TẦNG ĐỨNG TRƯỚC MỌI THỨ KHÁC ── */
  const st = soatTang(tang, noiDung + ' ' + nhiemVu);
  if (!st.qua) return {ok: false, code: st.ma, error: st.vi,
    phamPhai: st.phamPhai, chan: true};

  const id = 'TG-' + tokenMoi().slice(0, 14);
  const luc = new Date().toISOString();

  /* ĐỀ BÀI THIẾT KẾ — thứ máy làm ra thay cho tấm ảnh.
     Đủ chi tiết để một người vẽ hoặc một công cụ bên ngoài làm theo,
     và KHÔNG có một dòng nội dung nào rời khỏi máy chủ Học viện. */
  const deBai = [
    'ĐỀ BÀI THIẾT KẾ · ' + id,
    'Chặng    : ' + tang,
    'Loại hình: ' + loaiHinh,
    'Nhiệm vụ : ' + nhiemVu,
    'Người xem: ' + nx.join(', '),
    'Bố cục   : ' + (String(d.boCuc || '').trim() || '(theo mặc định của loại hình)'),
    'Đặt tại  : ' + (String(d.viTri || '').trim() || '(chưa chọn)'),
    '',
    'NỘI DUNG PHẢI TRUYỀN ĐẠT',
    noiDung,
    '',
    'ĐÃ QUA CỔNG TẦNG: ' + st.vi
  ].join('\n');

  await db.prepare(
    'INSERT INTO deXuatThiGiac (id,ban,banTruoc,noiDung,tang,nguoiXem,loaiHinh,' +
    "nhiemVu,boCuc,viTri,deBai,soatTang,trangThai,nguoiDe,deLuc) " +
    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'deXuat',?,?)"
  ).bind(id, Number(d.ban || 1), String(d.banTruoc || '') || null,
    noiDung.slice(0, 4000), tang, JSON.stringify(nx), loaiHinh,
    nhiemVu.slice(0, 300), String(d.boCuc || '').slice(0, 200) || null,
    String(d.viTri || '').slice(0, 200) || null, deBai, st.vi, hoSo.u, luc).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'TG_DEXUAT',
    doiTuong: id, chiTiet: tang + ' · ' + loaiHinh + ' · ' + nhiemVu.slice(0, 80)});

  return {ok: true, id, tang, loaiHinh, nhiemVu, trangThai: 'deXuat', deBai,
    soatTang: st.vi,
    vi: 'Đề xuất đã vào sổ ở bậc ĐỀ XUẤT. Máy không đi tiếp một bậc nào ' +
        'nếu chủ hệ chưa bấm.'};
}

/* ═══════════════ ĐI MỘT BẬC ═══════════════ */
export async function chuyenBacThiGiac(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};

  const x = await db.prepare('SELECT * FROM deXuatThiGiac WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!x) return {ok: false, error: 'Không tìm thấy đề xuất này.'};

  const den = String(y.den || '').trim();
  const duoc = BAC_TIEP[x.trangThai] || [];
  if (duoc.indexOf(den) < 0)
    return {ok: false, code: 'SAIBAC',
      error: 'Từ bậc "' + x.trangThai + '" chỉ đi được sang: ' +
        (duoc.length ? duoc.join(', ') : '(không đi tiếp được)') +
        '. Không có đường tắt qua một bậc nào.'};

  /* ── DUYỆT VÀ PHÁT HÀNH LÀ QUYỀN CỦA CHỦ HỆ ── */
  if ((den === 'duyet' || den === 'phatHanh') && !laChuHe(hoSo))
    return {ok: false, code: 'CANCHUHE',
      error: 'Chỉ Super Admin duyệt và phát hành. Máy đề xuất, chủ hệ quyết.'};

  /* ── TỪ CHỐI PHẢI NÓI VÌ SAO ──
     Một lượt từ chối không lý do thì lần sau máy đề xuất y hệt, và
     người từ chối phải nói lại cùng một câu tới lần thứ mười. */
  const lyDo = String(y.lyDo || '').trim();
  if (den === 'tuChoi' && lyDo.length < 10)
    return {ok: false, code: 'THIEULYDO',
      error: 'Từ chối thì phải nói vì sao. Không nói thì lần sau máy đề xuất ' +
             'y hệt, và câu từ chối ấy phải nói lại mãi.'};

  const luc = new Date().toISOString();
  const r = await db.prepare(
    'UPDATE deXuatThiGiac SET trangThai = ?, nguoiDuyet = ?, duyetLuc = ?, ' +
    'lyDo = COALESCE(?, lyDo) WHERE id = ? AND trangThai = ?'
  ).bind(den, hoSo.u, luc, lyDo || null, x.id, x.trangThai).run();
  if (!((r && r.meta && r.meta.changes) || 0))
    return {ok: false, error: 'Đề xuất vừa đổi bậc ở chỗ khác. Mở lại rồi thử tiếp.'};

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'TG_BAC',
    doiTuong: x.id, chiTiet: x.trangThai + ' → ' + den + (lyDo ? ' · ' + lyDo.slice(0, 150) : '')});
  return {ok: true, id: x.id, tu: x.trangThai, den,
    keTiep: BAC_TIEP[den] || [],
    vi: den === 'phatHanh'
      ? 'Đã phát hành. Từ đây sửa là ghi một BẢN MỚI, không ghi đè — tấm này ' +
        'có thể đã ở trong tay khách.'
      : 'Đã sang bậc ' + den + '.'};
}

/* ═══════════════ SỬA MỘT BẢN ĐÃ DUYỆT = GHI BẢN MỚI ═══════════════ */
export async function banMoiThiGiac(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};

  const cu = await db.prepare('SELECT * FROM deXuatThiGiac WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!cu) return {ok: false, error: 'Không tìm thấy bản gốc.'};

  const d = y.deXuat || {};
  /* Bản mới thừa hưởng mọi ô bản cũ, người sửa chỉ gửi ô nào đổi. Bắt
     gửi lại tất cả là cách chắc nhất để một ô bị gõ lại sai. */
  const moi = {
    noiDung: d.noiDung !== undefined ? d.noiDung : cu.noiDung,
    tang: d.tang !== undefined ? d.tang : cu.tang,
    loaiHinh: d.loaiHinh !== undefined ? d.loaiHinh : cu.loaiHinh,
    nhiemVu: d.nhiemVu !== undefined ? d.nhiemVu : cu.nhiemVu,
    boCuc: d.boCuc !== undefined ? d.boCuc : cu.boCuc,
    viTri: d.viTri !== undefined ? d.viTri : cu.viTri,
    nguoiXem: d.nguoiXem !== undefined ? d.nguoiXem : JSON.parse(cu.nguoiXem || '[]'),
    ban: Number(cu.ban) + 1, banTruoc: cu.id
  };
  const ra = await deXuatThiGiac({deXuat: moi}, env, db, hoSo);
  if (ra.ok) ra.vi = 'Bản ' + moi.ban + ', sửa từ ' + cu.id +
    '. Bản cũ Ở LẠI NGUYÊN — không bản nào bị ghi đè.';
  return ra;
}

/* ═══════════════ CHẤM THANG ĐIỂM MỘT TRĂM ═══════════════ */
export async function chamThiGiac(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};

  const x = await db.prepare('SELECT * FROM deXuatThiGiac WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!x) return {ok: false, error: 'Không tìm thấy đề xuất này.'};

  const cham = y.cham || {};
  const thieu = Object.keys(TRONG_DIEM).filter(k => {
    const v = Number(cham[k]);
    return isNaN(v) || v < 0 || v > 100;
  });
  if (thieu.length) return {ok: false,
    error: 'Thiếu hoặc sai điểm (0–100) ở: ' + thieu.join(', ') + '. ' +
           'Chấm thiếu một mục rồi cộng lại là ra một con số không nói gì.'};

  let tong = 0;
  const tung = {};
  for (const k of Object.keys(TRONG_DIEM)) {
    const d = Number(cham[k]);
    tung[k] = {diem: d, trong: TRONG_DIEM[k], gop: d * TRONG_DIEM[k] / 100};
    tong += tung[k].gop;
  }
  tong = Math.round(tong * 10) / 10;
  const bac = (BAC_DIEM.find(b => tong >= b.tu) || BAC_DIEM[BAC_DIEM.length - 1]).ten;

  await db.prepare(
    'UPDATE deXuatThiGiac SET diem = ?, bacDiem = ?, chamChiTiet = ? WHERE id = ?'
  ).bind(Math.round(tong), bac, JSON.stringify(tung), x.id).run();

  return {ok: true, id: x.id, diem: tong, bac, tung,
    /* Mục D1 nặng 25 — gấp hai rưỡi mục THẨM MỸ. Nói ra để người chấm
       biết chỗ nào đáng cãi nhau. */
    vi: 'Đúng hệ thống nặng 25 điểm, thẩm mỹ 10. Một tấm rất đẹp mà sai Tầng ' +
        'thì tệ hơn một tấm xấu mà đúng — tấm đẹp được tin, và cái sai đi theo ' +
        'nó xa hơn.'};
}

/* ═══════════════ SỔ LUẬT THƯƠNG HIỆU — BỘ NHỚ DÀI HẠN ═══════════════ */
export async function ghiLuatThuongHieu(y, env, db, hoSo) {
  if (!laChuHe(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Chỉ Super Admin ghi được luật thương hiệu. Máy đề xuất, chủ hệ quyết.'};

  const l = y.luat || {};
  const nhom = String(l.nhom || '').trim();
  const luat = String(l.luat || '').trim();
  const vi = String(l.vi || '').trim();
  if (['mau', 'chu', 'bocuc', 'giong', 'anh', 'khac'].indexOf(nhom) < 0)
    return {ok: false, error: 'Nhóm phải là: mau, chu, bocuc, giong, anh, khac.'};
  if (luat.length < 10) return {ok: false, error: 'Luật quá ngắn.'};

  /* ── MỘT LUẬT KHÔNG CÓ LÝ DO SẼ BỊ GỠ ──
     Sáu tháng sau không ai nhớ vì sao cấm, và người sau gỡ ra vì nó
     đang cản việc họ. Lý do là thứ giữ luật sống. */
  if (vi.length < 15) return {ok: false, code: 'THIEUVI',
    error: 'Luật phải kèm LÝ DO. Không có lý do thì sáu tháng sau người ta gỡ ' +
           'nó ra, vì không ai biết gỡ thì hỏng gì.'};

  const id = 'LTH-' + tokenMoi().slice(0, 14);
  await db.prepare(
    'INSERT INTO luatThuongHieu (id,nhom,luat,vi,hieuLuc,boiAi,ghiLuc) ' +
    'VALUES (?,?,?,?,?,?,?)'
  ).bind(id, nhom, luat.slice(0, 500), vi.slice(0, 800),
    l.hieuLuc === 'tamThoi' ? 'tamThoi' : 'vinhVien', hoSo.u,
    new Date().toISOString()).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'TG_LUAT',
    doiTuong: id, chiTiet: nhom + ' · ' + luat.slice(0, 120)});
  return {ok: true, id, nhom, vi: 'Luật này ở lại, và mọi đề xuất sau đọc nó trước.'};
}

/* ═══════════════ KHO HÌNH VÀ SỔ LUẬT ═══════════════ */
export async function khoThiGiac(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};

  const loc = [], dv = [];
  if (y.tang) { loc.push('tang = ?'); dv.push(String(y.tang)); }
  if (y.trangThai) { loc.push('trangThai = ?'); dv.push(String(y.trangThai)); }
  const r = await db.prepare(
    'SELECT * FROM deXuatThiGiac' + (loc.length ? ' WHERE ' + loc.join(' AND ') : '') +
    ' ORDER BY deLuc DESC LIMIT 200').bind(...dv).all();

  const ds = (r.results || []).map(x => ({
    id: x.id, ban: x.ban, banTruoc: x.banTruoc || undefined,
    tang: x.tang, loaiHinh: x.loaiHinh, nhiemVu: x.nhiemVu,
    nguoiXem: JSON.parse(x.nguoiXem || '[]'),
    boCuc: x.boCuc || undefined, viTri: x.viTri || undefined,
    deBai: x.deBai, soatTang: x.soatTang || undefined,
    diem: x.diem === null ? null : Number(x.diem), bacDiem: x.bacDiem || undefined,
    trangThai: x.trangThai, nguoiDe: x.nguoiDe, deLuc: x.deLuc,
    nguoiDuyet: x.nguoiDuyet || undefined, lyDo: x.lyDo || undefined,
    keTiep: BAC_TIEP[x.trangThai] || []}));

  const lt = await db.prepare(
    'SELECT * FROM luatThuongHieu WHERE goLuc IS NULL ORDER BY ghiLuc DESC LIMIT 100').all();

  const dem = {};
  for (const x of ds) dem[x.trangThai] = (dem[x.trangThai] || 0) + 1;

  return {ok: true, so: ds.length, dem, ds,
    luatThuongHieu: (lt.results || []).map(x => ({id: x.id, nhom: x.nhom,
      luat: x.luat, vi: x.vi, hieuLuc: x.hieuLuc, boiAi: x.boiAi, ghiLuc: x.ghiLuc})),
    loaiHinh: LOAI_HINH, nguoiXem: NGUOI_XEM, thuTuTang: THU_TU_TANG,
    bacTiep: BAC_TIEP,
    vi: 'Không bản nào bị ghi đè. Sửa một bản đã duyệt là ghi một bản mới trỏ ' +
        'về bản cũ, nên dựng lại được đúng thứ khách đã nhìn thấy.'};
}

export { soatTang, CAM_THEO_TANG, THU_TU_TANG, LOAI_HINH, NGUOI_XEM,
  BAC_TIEP, TRONG_DIEM, BAC_DIEM };
