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
  'TRUOC_SAU', 'NHIP', 'CONG', 'SO_SANH_TANG', 'VAI_TRO', 'MOT_SO', 'QUY_TRINH', 'BIA',
  'AP_PHICH', 'CHAN_DUNG'];

/* Hai loại hình CẦN NGƯỜI. Chúng là ảnh ghép hai lớp: lớp người do bộ
   tạo ảnh ngoài sinh, lớp chữ do bộ vẽ trong máy đặt lên (luật C14).
   Khai ở đây để cổng biết phải đòi một lượt đi ra, và để bộ kiểm biết
   đúng chỗ nào được phép có <image>. */
const CAN_NGUOI = ['AP_PHICH', 'CHAN_DUNG'];
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

/* ═══════════════ ĐỌC NỘI DUNG — TRONG MÁY ═══════════════

   Bản đề xuất kiến trúc mới có một module đúng và đáng lấy: đọc nội
   dung TRƯỚC, rút ra các ý bắt buộc, rồi mới quyết định vẽ kiểu gì.
   Trước bản này, người đăng phải TỰ chọn loại hình trong mười bốn cái
   — chỗ nghẽn lớn nhất của cả cổng, và cũng là chỗ chọn sai nhiều nhất.

   ══ NHƯNG NÓ PHẢI CHẠY TRONG MÁY, KHÔNG GỬI RA NGOÀI ══

   Bản đề xuất ấy gửi thẳng nội dung sách cho một mô hình bên ngoài để
   phân tích. Đó là chỗ nó đụng luật C11 — "không đưa NỘI DUNG kho ra
   ngoài, chỉ đưa ĐỀ BÀI" — và đụng ở mức nặng nhất: không phải một
   tấm hình, mà CẢ CHƯƠNG SÁCH đi ra mỗi lượt chạy.

   Việc này không cần một mô hình nào. Cấu trúc lô-gích của một đoạn
   văn nằm ngay trong dấu hiệu bề mặt của nó: đánh số thì là các BƯỚC,
   có "trước" và "sau" thì là SO SÁNH, có "mỗi tuần" thì là NHỊP. Đọc
   dấu hiệu thì đo được, lặp lại được, và không rời khỏi Học viện.

   Máy ĐỀ NGHỊ, người chọn. Không tự áp — vì một đoạn nói "90 ngày" có
   thể là lộ trình mà cũng có thể là bảng so sánh, và máy không biết
   người viết định nói cái nào. */

/* Rút các Ý BẮT BUỘC: mỗi ý một dòng hoặc một câu mang một mệnh đề
   riêng. Đây là danh sách sau này dùng để ĐO tấm vẽ ra có nói đủ
   không — nên nó phải rút một lần rồi GIỮ, không tính lại mỗi lượt:
   sửa cách rút thì mọi tấm cũ đổi nghĩa mà không ai biết. */
export function rutYBatBuoc(chu) {
  const dong = String(chu || '').split('\n')
    .map(d => d.replace(/^\s*[·•\-–—*\d.)\]]+\s*/, '').trim())
    .filter(d => d.length >= 12 && !/^[A-ZÀ-Ỹ\s]{2,20}:/.test(d));
  /* Dòng dài thì tách tiếp theo câu — một dòng ba câu là ba ý, và
     gộp ba ý thành một thì phép đo sau này không chỉ ra được thiếu
     ý nào. */
  const y = [];
  dong.forEach(d => {
    (d.length > 120 ? d.split(/(?<=[.;])\s+/) : [d]).forEach(c => {
      const t = c.trim();
      if (t.length >= 12) y.push(t.slice(0, 160));
    });
  });
  return y.slice(0, 12);
}

/* Dấu hiệu bề mặt → loại hình. Mỗi dòng: [loại hình, biểu thức dò,
   điểm, vì sao]. Điểm cộng dồn; loại nào cao nhất thì đề nghị trước.
   `vi` đi kèm để người đọc BIẾT máy đề nghị theo dấu hiệu nào — một
   đề nghị không nói lý do thì người ta hoặc tin mù hoặc bỏ qua. */
const DAU_CAU_TRUC = [
  ['QUY_TRINH',       /(bước\s*\d|→|thứ tự|lần lượt|sau đó|tiếp theo)/gi, 3,
   'có các BƯỚC nối tiếp'],
  ['TRUOC_SAU',       /(trước[^.]{0,40}sau|khác gì|đổi từ)/gi, 3,
   'có cặp TRƯỚC và SAU'],
  ['NHIP',            /(mỗi (tuần|ngày|tháng)|chu kỳ|vòng|hằng ngày|lặp lại)/gi, 3,
   'có NHỊP lặp lại'],
  ['CONG',            /(điều kiện|nghiệm thu|qua chặng|đạt (thì|mới)|cổng)/gi, 3,
   'nói ĐIỀU KIỆN để đi tiếp'],
  ['SO_SANH_TANG',    /(chặng \d|tầng \d|gói|so với|khác nhau)/gi, 2,
   'so sánh nhiều CHẶNG'],
  ['VAI_TRO',         /(ai làm|vai trò|phần việc của|phụ huynh.*coach|coach.*phụ huynh)/gi, 3,
   'chia PHẦN VIỆC theo người'],
  ['BANG_DIEU_KHIEN', /(\d+\s*%|điểm số|theo dõi|chỉ số|đo bằng)/gi, 2,
   'có SỐ để theo dõi'],
  ['DANH_SACH_VIEC',  /(làm ngay|hôm nay|việc cần|danh sách|đánh dấu)/gi, 2,
   'là DANH SÁCH việc'],
  ['BANDO_HANHTRINH', /(hành trình|lộ trình|đường dài|chặng đường|mốc)/gi, 3,
   'là một ĐƯỜNG DÀI có mốc'],
  ['KHUNG',           /(gồm|bao gồm|các phần|cấu trúc|khung)/gi, 2,
   'liệt kê các PHẦN của một khung'],
  ['AP_PHICH',        /(chào|giới thiệu|đồng hành cùng|bắt đầu cùng)/gi, 2,
   'là lời MỜI, cần có người']
];

export function deNghiLoaiHinh(chu) {
  const t = String(chu || '');
  const diem = {}, viDo = {};
  DAU_CAU_TRUC.forEach(([ma, re, n, vi]) => {
    const m = t.match(re);
    if (m && m.length) {
      diem[ma] = (diem[ma] || 0) + n * Math.min(m.length, 3);
      viDo[ma] = vi + ' (' + m.length + ' dấu hiệu)';
    }
  });
  /* MỘT CON SỐ: chỉ đề nghị khi nội dung NGẮN và có đúng một con số
     nổi. Đoạn dài đầy số thì đó là bảng, không phải một con số. */
  const so = t.match(/\b\d[\d.,]*\b/g) || [];
  if (t.length < 260 && so.length === 1) {
    diem.MOT_SO = 6; viDo.MOT_SO = 'ngắn và có ĐÚNG MỘT con số';
  }
  if (t.length < 180) { diem.BIA = (diem.BIA || 0) + 4; viDo.BIA = 'rất ngắn — một câu'; }

  const xep = Object.keys(diem).sort((a, b) => diem[b] - diem[a])
    .slice(0, 3).map(ma => ({loaiHinh: ma, diem: diem[ma], vi: viDo[ma]}));
  return xep;
}

/* Cửa cho màn hình gọi TRƯỚC khi đề xuất. Không ghi gì vào sổ — nó
   chỉ đọc và trả lời. */
export async function docNoiDungThiGiac(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};
  const chu = String((y || {}).noiDung || '').trim();
  if (chu.length < 20) return {ok: false,
    error: 'Dưới hai mươi chữ thì chưa đủ để đọc ra cấu trúc.'};
  const yBatBuoc = rutYBatBuoc(chu);
  const deNghi = deNghiLoaiHinh(chu);
  return {ok: true, soY: yBatBuoc.length, yBatBuoc, deNghi,
    vi: 'Máy ĐỀ NGHỊ, người chọn. Không tự áp: một đoạn nói "90 ngày" có thể ' +
        'là lộ trình mà cũng có thể là bảng so sánh, và máy không biết người ' +
        'viết định nói cái nào. Cả lượt đọc này chạy TRONG máy chủ Học viện — ' +
        'không một câu nội dung nào đi ra ngoài.'};
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

  /* ── MỘT CHỮ "VÀ": KHÔNG CHẶN, NHƯNG KHÔNG IM ──
     Ngưỡng chặn đặt ở HAI chữ "và" có lý do: "cho phụ huynh và học viên"
     là một việc, chặn nó là chặn oan. Nhưng "nói tầm nhìn và giới thiệu
     năm chặng" cũng chỉ có một chữ "và" mà là hai việc thật — chạy demo
     tấm tầm nhìn thì nó đi lọt, không một dòng cảnh báo nào.
     Máy không phân biệt được hai câu ấy, nên máy KHÔNG quyết. Nó chỉ
     nói ra chỗ đáng ngờ, và câu ấy đi theo đề bài tới tận bậc duyệt để
     người duyệt nhìn thấy. Đó đúng là luật của cổng này: máy đề xuất,
     chủ hệ quyết. */
  const luuY = [];
  if (demVa === 1)
    luuY.push('Nhiệm vụ có một chữ "và". Máy không chặn vì "và" cũng dùng để ' +
      'nối người xem, nhưng người duyệt đọc lại: nếu nó đang nối HAI VIỆC ' +
      'thì tách thành hai tấm, đừng vẽ.');

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
  ].concat(luuY.length ? ['', 'LƯU Ý CHO NGƯỜI DUYỆT'].concat(
    luuY.map(x => '· ' + x)) : []).join('\n');

  /* Ý BẮT BUỘC rút MỘT LẦN rồi giữ, không tính lại mỗi lượt vẽ. Cùng
     lý do đã giữ soatTang: sửa cách rút thì mọi tấm cũ đổi nghĩa mà
     không ai biết, và phép đo "tấm có nói đủ ý không" đang neo vào
     chính danh sách này. */
  const yBB = rutYBatBuoc(noiDung);

  await db.prepare(
    'INSERT INTO deXuatThiGiac (id,ban,banTruoc,noiDung,tang,nguoiXem,loaiHinh,' +
    "nhiemVu,boCuc,viTri,deBai,soatTang,yBatBuoc,trangThai,nguoiDe,deLuc) " +
    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'deXuat',?,?)"
  ).bind(id, Number(d.ban || 1), String(d.banTruoc || '') || null,
    noiDung.slice(0, 4000), tang, JSON.stringify(nx), loaiHinh,
    nhiemVu.slice(0, 300), String(d.boCuc || '').slice(0, 200) || null,
    String(d.viTri || '').slice(0, 200) || null, deBai, st.vi,
    JSON.stringify(yBB), hoSo.u, luc).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'TG_DEXUAT',
    doiTuong: id, chiTiet: tang + ' · ' + loaiHinh + ' · ' + nhiemVu.slice(0, 80)});

  return {ok: true, id, tang, loaiHinh, nhiemVu, trangThai: 'deXuat', deBai,
    soatTang: st.vi, luuY: luuY.length ? luuY : undefined,
    yBatBuoc: yBB, deNghiLoaiHinh: deNghiLoaiHinh(noiDung),
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

  /* ── C16: TẤM CÓ NGƯỜI KHÔNG PHÁT HÀNH VỚI Ô CHỜ ──
     Chủ hệ chốt 9.99.27: với loại hình có người, ảnh chụp thật là đường
     DUY NHẤT — không có lối tạm dùng hình vẽ phẳng.
     Chặn ở bậc PHÁT HÀNH chứ không ở bậc duyệt: duyệt là duyệt phần
     chữ, phần bố cục, phần đúng Tầng — những thứ đã xong và đáng duyệt
     trước khi đi đặt ảnh. Chặn sớm hơn thì cả tấm đứng lại chờ một thứ
     chưa ai bắt đầu làm. */
  if (den === 'phatHanh' && CAN_NGUOI.indexOf(x.loaiHinh) >= 0 && !x.anhNguoi)
    return {ok: false, code: 'THIEULOPNGUOI',
      error: 'Tấm "' + x.loaiHinh + '" chưa có LỚP NGƯỜI, nên chưa phát hành ' +
             'được. Luật C16: hình vẽ phẳng không được đứng thay một người, và ' +
             'máy cũng không phát hành một tấm còn ô chờ — một tấm có hình que ' +
             'ở chỗ đáng lẽ là người thì TRÔNG NHƯ ĐÃ XONG, nên không ai đi tìm ' +
             'lớp còn thiếu nữa. Gửi đề bài ra bộ tạo ảnh, hoặc nạp một ảnh đã ' +
             'có văn bản đồng ý vào kho ảnh, rồi phát hành.'};

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
    /* GHI SỐ THẬT, không Math.round. Bậc tính trên số lẻ mà sổ ghi số
       tròn thì sổ tự cãi mình: 89,9 vào bậc "Sửa lại" nhưng ghi xuống là
       90 — đúng bằng ngưỡng của bậc "Đạt". Chạy demo tấm tầm nhìn mới
       lộ, vì mọi bài thử cũ đều chấm ra số chẵn. */
  ).bind(tong, bac, JSON.stringify(tung), x.id).run();

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
    /* Bộ vẽ trong máy (src/ve-thi-giac.js) đặt chữ từ chính ô này. Trước
       9.99.13 sổ không trả noiDung, và cách duy nhất để lấy lại chữ là
       bóc ngược từ deBai — bóc ngược một chuỗi đã ghép là chỗ hỏng chờ
       sẵn, vì chỉ cần đổi một dòng tiêu đề trong deBai là bóc sai. */
    noiDung: x.noiDung,
    nguoiXem: JSON.parse(x.nguoiXem || '[]'),
    boCuc: x.boCuc || undefined, viTri: x.viTri || undefined,
    deBai: x.deBai, soatTang: x.soatTang || undefined,
    /* Ý BẮT BUỘC phải đi cùng bản ghi tới bộ vẽ, nếu không phép soát ý
       ở bộ vẽ đọc ra danh sách rỗng và báo "ĐỦ" cho mọi tấm — một phép
       đo luôn xanh thì không phải phép đo. Chỗ này đã đúng như thế ở
       lượt chạy thử đầu tiên: cả tấm đủ ý lẫn tấm cố tình thiếu hai
       khối đều xanh. */
    yBatBuoc: x.yBatBuoc || undefined,
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

/* ═══════════════════════════════════════════════════════════════
   PHẦN HAI — ĐỌC TÀI LIỆU, VÀ CỬA ĐI RA NGOÀI
   Chốt của chủ hệ thống bản 9.99.11.
   ═══════════════════════════════════════════════════════════════ */

/* ══ ĐỌC MỘT TÀI LIỆU RỒI CHỈ RA CHỖ NÊN THÀNH HÌNH ══

   ══ NÓI THẲNG NÓ ĐỌC ĐƯỢC GÌ ══

   Nó đọc CHỮ. Không đọc PDF, không đọc DOCX, không đọc PPTX — mở được
   ba định dạng ấy cần một thư viện tải từ mạng ngoài, mà chính sách nội
   dung của bản web chặn mọi nguồn ngoài, và nới ra để đọc một tệp là
   nới cho mọi thứ khác đi qua cùng cái lỗ.

   Nên đường dùng là: mở tài liệu bằng phần mềm sẵn có, chọn hết, dán
   chữ vào. Mất mười giây, và không phải nới một lỗ nào.

   ══ VÀ NÓ KHÔNG ĐỘNG VÀO NỘI DUNG ══

   Nó chỉ NÓI chỗ nào nên thành hình gì. Sửa chữ của một tài liệu đã
   được duyệt là việc của người viết, không phải của máy — bản đặc tả
   của chủ hệ nói đúng chỗ này, và nó là chỗ dễ vượt nhất. */

const DAU_HIEU = [
  {loai: 'QUY_TRINH', dau: ['bước 1', 'bước 2', 'bước một', 'đầu tiên', 'sau đó',
    'tiếp theo', 'cuối cùng'], vi: 'đoạn kể một chuỗi bước có thứ tự'},
  {loai: 'BANDO_HANHTRINH', dau: ['ngày 1', 'ngày 7', 'ngày 21', 'ngày 90',
    'tuần 1', 'chặng', 'lộ trình', 'hành trình'], vi: 'đoạn nói về một quãng thời gian có mốc'},
  {loai: 'SO_SANH_TANG', dau: ['so với', 'khác nhau', 'trong khi', 'còn tầng',
    'chặng nào'], vi: 'đoạn đặt hai thứ cạnh nhau'},
  {loai: 'DANH_SACH_VIEC', dau: ['cần làm', 'phải làm', 'danh sách', 'checklist',
    'gồm:', 'bao gồm'], vi: 'đoạn liệt kê việc'},
  {loai: 'CONG', dau: ['điều kiện', 'đạt khi', 'nghiệm thu', 'qua được', 'tiêu chí'],
    vi: 'đoạn nêu điều kiện qua chặng'},
  {loai: 'VAI_TRO', dau: ['phụ huynh', 'học viên', 'coach', 'ai làm', 'trách nhiệm'],
    vi: 'đoạn chia việc cho từng người'},
  {loai: 'MOT_SO', dau: ['%', 'phần trăm', 'trung bình', 'tỷ lệ'],
    vi: 'đoạn xoay quanh một con số'},
  {loai: 'NHIP', dau: ['mỗi ngày', 'mỗi tuần', 'hằng ngày', 'hằng tuần', 'chu kỳ',
    'nhịp'], vi: 'đoạn mô tả một nhịp lặp lại'}
];

export async function docTaiLieuThiGiac(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};

  const chu = String(y.chu || '');
  if (chu.length < 200) return {ok: false,
    error: 'Dán ít nhất hai trăm chữ. Ngắn hơn thì chưa có gì để chia đoạn, và ' +
           'một bản phân tích trên ba dòng chữ là một bản đoán.'};
  if (chu.length > 200000) return {ok: false,
    error: 'Dài quá hai trăm nghìn chữ. Cắt làm mấy phần rồi dán từng phần.'};

  const tang = String(y.tang || '').trim().toUpperCase();
  if (THU_TU_TANG.indexOf(tang) < 0) return {ok: false,
    error: 'Khai tài liệu này thuộc chặng nào: ' + THU_TU_TANG.join(', ') + '. ' +
           'Máy KHÔNG đoán hộ — đoán Tầng là chỗ sai im lặng nhất, và cả bản phân ' +
           'tích sau đó dựng trên một cái đoán.'};

  /* Cắt theo DÒNG TRỐNG, không cắt theo số ký tự: dòng trống là chỗ
     người viết đã tự chia ý, và cắt theo số ký tự thì cắt ngang câu. */
  const doan = chu.split(/\n\s*\n/).map(x => x.trim()).filter(x => x.length > 40);
  if (!doan.length) return {ok: false,
    error: 'Không tách được đoạn nào. Tài liệu cần có dòng trống giữa các ý — ' +
           'dòng trống là chỗ người viết đã tự chia ý, và máy chia theo đó.'};

  const viTri = [];
  const phamTang = [];
  doan.forEach((d, i) => {
    const t = boDau(d);
    /* CỔNG TẦNG CHẠY TRÊN TỪNG ĐOẠN. Một tài liệu khai T1 mà có một
       đoạn nói về thứ chỉ tầng cao mới có thì chính đoạn ấy là chỗ
       hỏng, và nêu số đoạn thì người sửa tìm được ngay. */
    const pham = (CAM_THEO_TANG[tang] || []).filter(k => t.indexOf(boDau(k)) >= 0);
    if (pham.length) phamTang.push({doan: i + 1, pham,
      trich: d.slice(0, 120)});

    const trung = DAU_HIEU.map(h => ({
      loai: h.loai, vi: h.vi,
      diem: h.dau.filter(k => t.indexOf(boDau(k)) >= 0).length
    })).filter(x => x.diem > 0).sort((a, b) => b.diem - a.diem);

    if (trung.length) viTri.push({doan: i + 1, soChu: d.length,
      trich: d.slice(0, 100),
      /* CHỈ NÊU MỘT loại, không nêu cả danh sách. Nêu ba lựa chọn cho
         mỗi đoạn thì người đọc phải tự chọn ở ba mươi chỗ, và bản phân
         tích thành một danh sách việc thay vì một đề nghị. */
      nen: trung[0].loai, vi: trung[0].vi, chac: trung[0].diem});
  });

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'TG_DOCTL',
    doiTuong: tang, chiTiet: doan.length + ' đoạn · ' + viTri.length + ' chỗ nên có hình'});

  return {ok: true, tang, soDoan: doan.length, soChu: chu.length,
    viTri: viTri.slice(0, 60),
    phamTang,
    /* Một tài liệu ba mươi trang mà chỗ nào cũng nên có hình thì đề
       nghị ấy vô dụng. Nói ra tỷ lệ để người đọc tự thấy. */
    tyLe: doan.length ? Math.round(viTri.length / doan.length * 100) : 0,
    canhBao: viTri.length > doan.length * 0.5
      ? 'Hơn nửa số đoạn được đề nghị làm hình. Tỷ lệ ấy gần như luôn có nghĩa là ' +
        'dấu hiệu bắt quá rộng, không phải tài liệu cần nhiều hình đến thế. Chọn ' +
        'lấy năm bảy chỗ đắt nhất.'
      : '',
    vi: 'Máy CHỈ nói chỗ nào nên thành hình gì. Nó không sửa một chữ nào của tài ' +
        'liệu — sửa nội dung đã duyệt là việc của người viết.'};
}

/* ══ BẢN CHÉP BẢNG MÀU — GỐC Ở KHO, KHÔNG PHẢI Ở ĐÂY ══

   Bản gốc là G.BRAND.mau trong kho đã mã hoá. Máy chủ không đọc được
   kho ấy, nên phải giữ một bản chép — cùng lý do đã buộc GIA_TANG có
   bản chép từ 9.94.

   Vì sao bảng màu phải đi ra được, trong khi nội dung thì không: một
   bộ tạo ảnh KHÔNG ĐOÁN ĐƯỢC màu của một thương hiệu nó chưa từng
   thấy. Không nói màu thì nó tự chọn, và thứ về là một tấm hình đẹp
   của một thương hiệu khác. Còn nội dung thì nó không cần để vẽ.

   Bộ kiểm mục 76 đối chiếu TỪNG Ô bảng này với G.BRAND.mau. Lệch một
   ô nghĩa là hình đặt ngoài về sai màu mà không ai nhìn ra, vì hai
   bên vẫn gọi cùng một tên màu. */
export const MAU_RA = [
  {k: 'Vàng GITA',       hex: '#F5B942'},
  {k: 'Cam lửa',         hex: '#FF7A45'},
  {k: 'Đêm sâu',         hex: '#070510'},
  {k: 'T1 · Xanh dương', hex: '#3B82F6'},
  {k: 'T2 · Tím',        hex: '#8B5CF6'},
  {k: 'T3 · Lam',        hex: '#06B6D4'},
  {k: 'T4 · Lục',        hex: '#10B981'},
  {k: 'T5 · Hổ phách',   hex: '#F59E0B'},
  {k: 'Hồng nhắc',       hex: '#FB7185'}
];

/* Bộ vẽ trong máy dựng hình theo luật hình học. Bộ tạo ảnh ngoài làm
   đúng thứ bộ vẽ trong máy KHÔNG làm được: người như ảnh chụp, chất
   liệu, ánh sáng thật. Nên đề bài đi ra phải nói về những thứ ấy —
   nói lại bố cục ô lưới là bảo nó làm hộ việc trong máy đã làm tốt
   hơn. */
const KIEU_RA = {
  BIA:            'Một khuôn hình lớn, một câu duy nhất. Bối cảnh mở, chiều sâu rõ.',
  MOT_SO:         'Một con số là chủ thể. Xung quanh để trống, không thêm đồ vật.',
  BANDO_HANHTRINH:'Đường đi từ gần ra xa, có mốc. Nhìn từ trên chếch xuống.',
  KHUNG:          'Một khung cảnh tĩnh, người ở tư thế nghỉ, không nhìn thẳng ống kính.',
  SO_SANH_TANG:   'Nhiều lớp cao dần, phân biệt bằng sắc độ chứ không bằng đường kẻ.',
  QUY_TRINH:      'Chuyển động một chiều, trái sang phải.',
  TRUOC_SAU:      'Hai nửa cùng một chỗ, cùng góc máy, khác ánh sáng.',
  VAI_TRO:        'Chân dung nửa người, ánh sáng bên, phông đơn sắc.',
  DANH_SACH_VIEC: 'Bàn làm việc nhìn từ trên xuống, đồ vật thật.',
  CONG:           'Một lối đi có cửa, ánh sáng phía bên kia.',
  NHIP:           'Lặp lại một hình theo nhịp đều, đổi dần một thuộc tính.',
  BANG_DIEU_KHIEN:'Màn hình sáng trong phòng tối, người ngồi trước nó.',
  /* Hai loại cần người: đề bài KHÔNG mô tả khối chữ, vì lớp chữ do máy
     đặt lên sau (C14). Nói cả bố cục chữ ở đây là bảo bộ tạo ảnh làm
     hộ việc máy đã làm chính xác hơn — và nó sẽ nướng chữ sai dấu vào
     ảnh, không gỡ ra được. */
  AP_PHICH:       'Người đứng hoặc ngồi lệch MỘT BÊN khung, thân hướng vào ' +
                  'giữa. NỬA KIA ĐỂ TRỐNG — chỉ bối cảnh mờ, không đồ vật ' +
                  'nổi, không chữ. Đó là chỗ máy đặt khối chữ lên sau.',
  CHAN_DUNG:      'Nửa người, chính diện hơi lệch, phông đơn sắc mờ. Chừa ' +
                  'khoảng trống dưới ngực để máy đặt tên vai.'
};

/* ══ ĐỀ BÀI VỀ NGƯỜI ══

   Chỗ này quyết định ảnh về đẹp hay hỏng, nên nó dài, và mỗi dòng có
   lý do đứng sau.

   Luật C13 cho phép người do AI biên soạn và ĐÒI nói rõ điều ấy: không
   nói thì bộ tạo ảnh lấy nét của người nó thấy nhiều nhất, mà người nó
   thấy nhiều nhất là người nổi tiếng. */
/* Đề bài phải nói MẤY NGƯỜI, và điều đó đọc từ NGƯỜI XEM chứ không
   đoán. Bản đầu tả cứng "một người trưởng thành" cho mọi tấm — nên một
   áp phích cho CẢ NHÀ vẫn xin về ảnh một người ngồi một mình, tức là
   tấm nói về gia đình mà trong khung không có gia đình nào.

   Ai trong khung là một quyết định biên tập, không phải một chi tiết:
   người xem thấy mình trong ảnh thì mới đọc tiếp. */
function nguoiRa(nx) {
  const caNha = nx.indexOf('GIADINH') >= 0;
  return [
    'NGƯỜI TRONG ẢNH:',
    '· Do AI biên soạn hoàn toàn. KHÔNG dựng theo bất kỳ người có thật ' +
      'nào, không giống một người nổi tiếng nào. Đây là điều kiện bắt ' +
      'buộc, không phải một lời khuyên.',
    caNha
      ? '· HAI người trưởng thành người Việt, 35–45 tuổi — một bố một mẹ ' +
        'ngồi cạnh nhau, cùng hướng về một chỗ. Vai gần nhau, không ôm, ' +
        'không tạo dáng chụp ảnh gia đình.'
      : '· MỘT người trưởng thành, người Việt, 25–40 tuổi.',
    /* Vì sao một tấm về gia đình lại KHÔNG có đứa trẻ trong khung —
       nói thẳng trong đề bài, để bên nhận không tự thêm vào. */
    '· KHÔNG trẻ em, KHÔNG thiếu niên trong khung — luật C13, không ' +
      'ngoại lệ. Một gia đình trong ảnh của Học viện là BỐ MẸ: đứa trẻ ' +
      'là người tấm hình nói VỀ, không phải người đứng trong khung. ' +
      'Ảnh trẻ em phải có văn bản đồng ý của cha mẹ và của chính trẻ từ ' +
      'bảy tuổi, mà một khuôn mặt sinh ra thì không có ai để xin phép.',
    '· Trang phục lịch sự, chỉnh tề, tay áo dài. Không hở, không bó sát, ' +
      'không đồ hiệu nhận ra được.',
    caNha
      ? '· Nét mặt: bình thản, ấm, hơi lo nhưng đã yên tâm — đây là hai ' +
        'người vừa quyết một việc cho con. Cười khép miệng. Không cười ' +
        'hở lợi, không tạo dáng.'
      : '· Nét mặt: bình thản, ấm, mắt nhìn thẳng người xem hoặc nhìn hơi ' +
        'chếch. Cười khép miệng. Không cười hở lợi, không tạo dáng.',
    caNha
      ? '· Dáng: ngồi ở bàn nhà mình, trước mặt là giấy tờ đã mở. Đang ' +
        'ĐỌC, không đang chụp ảnh. Không khoanh tay, không giơ ngón cái.'
      : '· Dáng: ngồi hoặc đứng làm việc thật — không khoanh tay, không ' +
        'giơ ngón cái, không chỉ vào chỗ trống.',
    '· Ảnh chụp thật: da có kết cấu, tóc có sợi rời, ánh sáng bên mềm, ' +
      'nền xoá phông nhẹ. KHÔNG làm mịn da tới mức nhựa.',
    '· TUYỆT ĐỐI KHÔNG CHỮ trong ảnh, không dấu hiệu thương hiệu nào, ' +
      'không bảng, không biển, không màn hình có chữ. Mọi chữ do hệ đặt ' +
      'lên sau; chữ nướng sẵn trong ảnh thì sai dấu tiếng Việt và không ' +
      'gỡ ra được.'
  ].join('\n');
}

/* ══ CỬA ĐI RA NGOÀI ══

   Chủ hệ chốt ở 9.99.11: được phép nối một bộ tạo ảnh bên ngoài.

   ══ BA LỚP GIỮ, VÀ LỚP THỨ HAI LÀ LỚP THẬT ══

   1. TẮT SẴN. Không có GITA_KHOA_VE thì cửa đóng, và nó nói rõ là
      đóng — chứ không im lặng trả về như đã gửi.

   2. DANH SÁCH TRẮNG, KHÔNG DANH SÁCH CẤM. Thứ đi ra được lắp từ đúng
      NĂM TRƯỜNG CÓ TÊN: chặng, loại hình, nhiệm vụ, bố cục, người xem.
      NỘI DUNG KHÔNG BAO GIỜ ĐI RA — và đây là chỗ quan trọng nhất của
      cả tệp này.

      Vì sao: nội dung là thứ kho mã hoá sinh ra để giữ. Một tấm hình
      không cần nội dung coaching để vẽ được — nó cần một ĐẶC TẢ. Gửi
      cả nội dung đi là gửi tài sản đi kèm một việc không đòi hỏi nó.

      Lọc bằng danh sách cấm thì mỗi trường mới thêm vào bảng là mặc
      định đi ra, và cái mặc định ấy không ai nhớ đi sửa.

   3. GHI SỔ NGUYÊN VĂN. Mỗi lượt để lại đúng chuỗi đã đi ra, không
      phải một bản tóm — bản tóm thì lúc cần đối chất lại phải tin vào
      chính cái đang bị nghi. */

export async function guiDeBaiRaNgoai(y, env, db, hoSo) {
  /* Chỉ Super Admin. Cho một thứ rời khỏi hệ là quyết định của chủ
     hệ, không phải một thao tác của người làm. */
  if (!laChuHe(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Chỉ Super Admin gửi được đề bài ra ngoài. Cho một thứ rời khỏi hệ là ' +
           'một quyết định, không phải một thao tác.'};

  const khoa = String(env.GITA_KHOA_VE || '');
  const cong = String(env.GITA_CONG_VE || '');
  if (!khoa || !cong) return {ok: false, code: 'CUADONG',
    error: 'Cửa đi ra đang ĐÓNG: máy chủ chưa nạp GITA_KHOA_VE và GITA_CONG_VE. ' +
           'Đây là mặc định — nối một bộ vẽ bên ngoài là một quyết định phải bấm, ' +
           'không phải một thứ có sẵn.',
    canNap: ['GITA_KHOA_VE', 'GITA_CONG_VE']};

  const x = await db.prepare('SELECT * FROM deXuatThiGiac WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!x) return {ok: false, error: 'Không tìm thấy đề xuất này.'};

  /* Chỉ gửi được thứ ĐÃ DUYỆT. Gửi một bản nháp ra ngoài là để một
     thứ chưa ai đọc kỹ rời khỏi hệ. */
  if (x.trangThai !== 'duyet' && x.trangThai !== 'hoanThien')
    return {ok: false, code: 'CHUADUYET',
      error: 'Chỉ gửi ra ngoài thứ đã DUYỆT. Đề xuất này đang ở bậc "' +
        x.trangThai + '".'};

  /* ── DANH SÁCH TRẮNG: ĐÚNG NĂM TRƯỜNG, KHÔNG HƠN ── */
  let nx = [];
  try { nx = JSON.parse(x.nguoiXem || '[]'); } catch (e) { nx = []; }
  /* Tới 9.99.22 chỗ này gửi đi đúng năm nhãn trường, không hơn. Đó là
     một bản kê, không phải một đề bài — đưa cho bộ tạo ảnh thì nó tự
     nghĩ ra hết phần còn lại, và phần nó tự nghĩ ra là phần mang nhận
     diện của một thương hiệu khác.

     Bản này gửi đi một ĐỀ BÀI THẬT. Vẫn đúng năm trường ấy của bản
     ghi — không một trường thứ sáu nào của kho đi ra. Phần thêm vào
     là thứ VIẾT Ở ĐÂY: bảng màu, chữ, kiểu, và các điều cấm. Chúng
     không nằm trong bản ghi nên không có gì để rò. */
  const tangSo = Number(String(x.tang || '').replace(/[^0-9]/g, ''));
  const mauTang = MAU_RA.filter(m => m.k.indexOf('T' + tangSo + ' ') === 0)[0];
  const canNguoi = CAN_NGUOI.indexOf(x.loaiHinh) >= 0;
  const guiDi = [
    '── ĐỀ BÀI THIẾT KẾ · GITA 365 ──',
    '',
    'Chặng: ' + x.tang,
    'Loại hình: ' + x.loaiHinh,
    'Nhiệm vụ: ' + x.nhiemVu,
    'Bố cục: ' + (x.boCuc || 'theo mặc định của loại hình'),
    'Người xem: ' + nx.join(', '),
    '',
    'KIỂU: ' + (KIEU_RA[x.loaiHinh] || 'theo mặc định của loại hình') +
      ' Ảnh biên tập, chất liệu và ánh sáng như chụp thật, chiều sâu rõ. ' +
      'Không phải hình vẽ phẳng — phần hình vẽ phẳng đã có bộ vẽ trong máy lo.',
    '',
    'MÀU: nền Đêm sâu #070510, nhấn chính Vàng GITA #F5B942, ' +
      'một điểm Cam lửa #FF7A45 duy nhất trong khuôn hình' +
      (mauTang ? '. Sắc của chặng này là ' + mauTang.k + ' ' + mauTang.hex +
        ' — cho nó dẫn phần lớn khuôn hình.' : '.') +
      ' Không dùng sắc nào ngoài bảng: ' +
      MAU_RA.map(m => m.hex).join(' · '),
    '',
    /* Với loại cần người thì KHÔNG nói gì về chữ, vì đề bài này đang
       đặt một tấm KHÔNG CÓ CHỮ. Nhắc tới bộ chữ là mời nó viết. */
    canNguoi ? null : 'CHỮ: nếu có chữ trong hình thì đặt bằng Be Vietnam Pro; ' +
      'câu trích dùng Playfair Display nghiêng. Dấu tiếng Việt phải đủ và đúng chỗ.',
    canNguoi ? null : '',
    /* null = bỏ hẳn dòng; '' = một dòng trống ngăn đoạn. Hai thứ khác
       nhau, nên bộ lọc chỉ được bỏ null. */
    canNguoi ? nguoiRa(nx) : null,
    canNguoi ? '' : null,
    'CẤM — mỗi dòng là một lần đã hỏng thật:',
    '· Không chân dung một người có thật, không khuôn mặt giống người ' +
      'nổi tiếng. Học viện không có cách nào xin phép một người mình ' +
      'không biết là ai.',
    '· Không trẻ em, không thiếu niên.',
    '· Không MỘT CHỮ NÀO trong ảnh — kể cả chữ nền, chữ trên màn hình, ' +
      'chữ trên gáy sách. Lớp chữ do hệ đặt lên sau.',
    '· Không đặt dấu GITA vào hình; dấu do hệ tự đặt sau, và nó không ' +
      'nhận bóng đổ, không nghiêng, không đổi màu.',
    '· Không tên đơn vị nào khác, không lời hứa điểm số.',
    '· Không kho ảnh dựng sẵn, không nền gradient tím-xanh mặc định.'
  ].filter(v => v !== null).join('\n');

  const id = 'DR-' + tokenMoi().slice(0, 14);
  const luc = new Date().toISOString();
  await db.prepare(
    'INSERT INTO luotDiRa (id,idDeXuat,cong,daGui,soChu,boiAi,luc) ' +
    'VALUES (?,?,?,?,?,?,?)'
  ).bind(id, x.id, cong, guiDi, guiDi.length, hoSo.u, luc).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.u, viec: 'TG_DIRA',
    doiTuong: x.id, chiTiet: cong + ' · ' + guiDi.length + ' ký tự'});

  return {ok: true, id, idDeXuat: x.id, cong, daGui: guiDi, soChu: guiDi.length,
    /* TRẢ VỀ NGUYÊN VĂN thứ vừa đi ra, để người bấm nhìn thấy ngay —
       chứ không phải đi tra sổ mới biết mình vừa gửi gì. */
    khongGui: ['nội dung gốc', 'tên nhà', 'tên học viên', 'mọi trường khác'],
    vi: 'Của BẢN GHI đi ra ĐÚNG năm trường có tên. NỘI DUNG không bao giờ đi ra — ' +
        'một tấm hình cần một ĐẶC TẢ, không cần nội dung coaching, nên gửi cả nội ' +
        'dung là gửi tài sản kèm một việc không đòi hỏi nó. Phần còn lại của đề bài ' +
        '— màu, chữ, kiểu, điều cấm — viết thẳng ở may-chu/kien-truc-thi-giac.js, ' +
        'không đọc từ kho, nên không có gì để rò. Lượt này đã vào sổ đi ra.'};
}

export async function soDiRa(y, env, db, hoSo) {
  if (!duocVao(hoSo)) return {ok: false, code: 'NOPERM',
    error: 'Cổng thiết kế mở cho R01–R05.'};
  const r = await db.prepare(
    'SELECT * FROM luotDiRa ORDER BY luc DESC LIMIT 200').all();
  return {ok: true, so: (r.results || []).length,
    ds: (r.results || []).map(v => ({id: v.id, idDeXuat: v.idDeXuat, cong: v.cong,
      daGui: v.daGui, soChu: v.soChu, boiAi: v.boiAi, luc: v.luc})),
    cuaMo: !!(env.GITA_KHOA_VE && env.GITA_CONG_VE),
    vi: 'Mỗi dòng giữ ĐÚNG chuỗi đã đi ra, không phải một bản tóm — bản tóm thì ' +
        'lúc cần đối chất lại phải tin vào chính cái đang bị nghi.'};
}

export { DAU_HIEU };
