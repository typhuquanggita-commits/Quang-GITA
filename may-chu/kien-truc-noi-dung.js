/* ═══════════════════════════════════════════════════════════════
   GITA 365 · CỬA VÀO MỚI — KIẾN TRÚC SƯ NỘI DUNG

   Bản đặc tả "GITA 365 MASTER AI v2.0" của chủ hệ, bản 9.99.41.

   ══ CÁI NÀY KHÔNG PHẢI MỘT BỘ VIẾT BÀI ══

   Nó là một CỔNG, cùng loại với cổng thị giác và vì cùng một lý do:
   một bài học viết rất hay mà thiếu chỗ đo thì sáu tháng sau không ai
   biết nó có tác dụng không — kể cả người viết. Bài hay được tin, và
   chỗ thiếu đi theo nó xa hơn.

   Máy KHÔNG viết hộ nội dung chuyên môn. Nó ĐO: bài này có đủ hai
   mươi bốn khối không, khối nào đòi khối nào mà không có, câu nào
   rỗng, câu nào phán xét, và chấm được sáu trong mười chiều.

   ══ VÌ SAO ĐO ĐƯỢC MÀ KHÔNG CẦN MỘT MÔ HÌNH NÀO ══

   Bản đặc tả gốc để một mô hình bên ngoài đọc bài rồi chấm. Hai chỗ
   hỏng, và chỗ thứ hai nặng hơn:

     1. Luật C11 — không đưa NỘI DUNG kho ra ngoài. Gửi cả bài đi chấm
        là đúng thứ luật ấy cấm.
     2. Một mô hình chấm "chiều sâu 8/10" thì không ai truy được vì
        sao 8 chứ không phải 6, và lần chấm sau cùng bài ấy có thể ra
        7. Một thang điểm không lặp lại được thì nó không phải thang.

   Thứ đo được ở đây đo bằng CẤU TRÚC: khối có mặt hay không, khối này
   có kéo theo khối kia không, một dòng có nằm trong bảng câu rỗng
   không. Đo cấu trúc thì lặp lại được, chỉ ra được đúng dòng, và
   không rời khỏi Học viện.

   ══ VÀ MÁY NÓI THẲNG PHẦN NÓ KHÔNG LÀM ĐƯỢC ══

   Bốn chiều — chiều sâu, cá nhân hoá, dùng lại được, và phần có giá
   trị của chìa khoá kim cương — máy không có dữ liệu nào để đo. Nó
   BỎ TRỐNG chứ không đoán, và nó KHÔNG cộng tổng khi còn ô trống.

   Cộng ra một con số trong lúc bốn ô còn trống là dựng một con số
   trông như đã xong. Cùng luật với L-02 của bảng lương.
   ═══════════════════════════════════════════════════════════════ */

import { Kho } from './nen.js';
import { soatTang } from './kien-truc-thi-giac.js';

const BAC = {R01:1,R02:2,R03:3,R04:4,R05:5,R06:6,R07:7,R08:8,
             R09:9,R10:10,R11:11,R12:12,R13:13,R14:14,R15:15};

/** Ai được dùng cổng này. Viết nội dung là việc của người làm nghề,
    không phải của khách — cùng ngưỡng với cổng thị giác. */
function duocVao(hoSo) { return (BAC[hoSo.role] || 99) <= 5; }
function laChuHe(hoSo) { return hoSo.role === 'R01'; }

/* ══ BẢN CHÉP TỐI THIỂU CỦA HIẾN PHÁP NỘI DUNG ══

   Máy chủ không đọc được kho đã mã hoá, nên nó giữ đúng cái TỐI THIỂU
   để CHẶN. Mục 76 của bộ kiểm đối chiếu từng bảng dưới đây với
   G.ND_* trong kho mỗi lần chạy. Lệch là đỏ.

   Chỗ này đã hỏng một lần ở cổng thị giác: tôi tự nghĩ ra mười khoá
   cho CAM_THEO_TANG, nghe rất hợp lý, và không khoá nào được ai
   duyệt. Nên bản chép ở đây KHÔNG có một dòng nào không có trong kho. */

/* Hai mươi bốn khối: mã, tên ngắn, và khối nào ĐÒI khối nào. */
const KHOI = [
  ['K01', 'Tên bài'],
  ['K02', 'Chìa khoá kim cương', ['K12', 'K20']],
  ['K03', 'Mục tiêu'],
  ['K04', 'Vì sao quan trọng'],
  ['K05', 'Vấn đề thật'],
  ['K06', 'Insight'],
  ['K07', 'Bản chất'],
  ['K08', 'Khung tư duy'],
  ['K09', 'Ví dụ'],
  ['K10', 'Ca thật'],
  ['K11', 'Sai lầm thường gặp'],
  ['K12', 'Công cụ', ['K13']],
  ['K13', 'Hướng dẫn dùng'],
  ['K14', 'Bài tập', ['K15']],
  ['K15', 'Sản phẩm đầu ra', ['K22']],
  ['K16', 'KPI', ['K18']],
  ['K17', 'Bảng theo dõi'],
  ['K18', 'Phản tư'],
  ['K19', 'Câu hỏi coach', ['K20']],
  ['K20', 'Việc 24 giờ'],
  ['K21', 'Việc 7 ngày'],
  ['K22', 'Tiêu chí đạt chuẩn'],
  ['K23', 'Điều đọng lại'],
  ['K24', 'Thử thách']
];
const MA_KHOI = KHOI.map(k => k[0]);

/* Mười chiều. `ai`: máy chấm · cả hai · người chấm. `tran` là trần
   máy được phép cho ở chiều "cả hai". */
const DIEM = [
  {ma: 'Q01', ten: 'Đúng hệ GITA',          trong: 10, ai: 'may'},
  {ma: 'Q02', ten: 'Chiều sâu',             trong: 10, ai: 'nguoi'},
  {ma: 'Q03', ten: 'Dùng được ngay',        trong: 10, ai: 'ca', tran: 6},
  {ma: 'Q04', ten: 'Rõ ràng',               trong: 10, ai: 'may'},
  {ma: 'Q05', ten: 'Làm được',              trong: 10, ai: 'may'},
  {ma: 'Q06', ten: 'Đo được',               trong: 10, ai: 'may'},
  {ma: 'Q07', ten: 'Ngôn từ coach',         trong: 10, ai: 'may'},
  {ma: 'Q08', ten: 'Cá nhân hoá',           trong: 10, ai: 'nguoi'},
  {ma: 'Q09', ten: 'Chìa khoá kim cương',   trong: 10, ai: 'ca', tran: 4},
  {ma: 'Q10', ten: 'Dùng lại được',         trong: 10, ai: 'nguoi'}
];

const BAC_DIEM = [{tu: 95, ten: 'Chuẩn mực'}, {tu: 90, ten: 'Đạt chuẩn cao'},
                  {tu: 80, ten: 'Cần nâng cấp'}, {tu: 0, ten: 'Chưa hoàn thiện'}];

/* Bảng câu rỗng. Mỗi dòng: câu bắt được, và thứ ĐÁNG LẼ nằm ở đó. */
const RONG = [
  ['hãy cố gắng',           'Cố gắng vào việc gì, mấy lần một tuần?'],
  ['nỗ lực hết mình',       'Hết mình là tới đâu? Đo bằng gì?'],
  ['thành công sẽ đến',     'Đến khi nào, và dấu hiệu đầu tiên là gì?'],
  ['chìa khoá thành công',  'Chìa khoá mở cái gì? Cửa nào?'],
  ['bí quyết',              'Nếu là bí quyết thì bước một là gì?'],
  ['thay đổi cuộc đời',     'Đổi cái gì, trong bao lâu?'],
  ['vươn tới ước mơ',       'Ước mơ ấy tuần này gồm việc gì?'],
  ['không gì là không thể', 'Việc này cần điều kiện gì để làm được?'],
  ['tư duy tích cực',       'Nghĩ khác đi ở điểm nào, so với đang nghĩ gì?'],
  ['bứt phá giới hạn',      'Giới hạn hiện tại là con số nào?'],
  ['khai phóng tiềm năng',  'Tiềm năng ấy hiện ra thành việc gì làm được?'],
  ['truyền cảm hứng',       'Sau khi nghe thì người ta làm gì khác đi?']
];

/* Bảng thay lời. Mỗi dòng: câu ĐỪNG NÓI, câu NÓI THAY, vì sao. */
const LOI_THAY = [
  ['phải cố gắng hơn', 'Điều gì đang khiến kết quả chưa được như em muốn?',
   'Câu cũ đặt lỗi vào ý chí, mà ý chí là thứ không sửa được bằng lời nhắc.'],
  ['sao em không làm', 'Điều gì đã khiến kế hoạch chưa chạy được?',
   'Câu cũ hỏi để trách. Câu mới hỏi để tìm chỗ nghẽn.'],
  ['thiếu kỷ luật', 'Hệ thống hiện tại đang thiếu điều kiện nào để giữ được nhịp?',
   'Kỷ luật là kết quả của điều kiện, không phải nguyên nhân.'],
  ['lười', 'Việc này đang bị chặn ở bước nào?',
   'Một cái nhãn. Dán xong thì hết đường tìm nguyên nhân.'],
  ['hư', 'Hành vi nào đang lặp lại, vào lúc nào?',
   'Dán nhãn cho một đứa trẻ. Sáu ranh giới của mô hình cấm.'],
  ['không nghe lời', 'Con đang không đồng ý ở điểm nào?',
   'Câu cũ coi vâng lời là đích. Đích của GITA là tự quản trị.'],
  ['đáng lẽ phải', 'Lần sau làm khác đi ở chỗ nào?',
   'Nói về một việc đã xong thì không đổi được nó, chỉ tạo áy náy.'],
  ['nếu con thương bố mẹ', 'Bố mẹ đang lo điều gì, và con thấy thế nào?',
   'Đổi tình cảm lấy hành vi. Đây là chỗ nặng nhất của cả bảng.'],
  ['con nhà người ta', 'So với chính con tháng trước thì tuần này khác ở đâu?',
   'So ngang giữa các con. Sáu ranh giới của mô hình cấm.'],
  ['thế mà cũng không làm được', 'Chỗ khó nhất của việc này với con là chỗ nào?',
   'Làm nhục. Không có phiên bản nhẹ của câu này.']
];

const NHAN_NGUON = ['[KHO GITA]', '[MÁY PHÂN TÍCH]', '[MÁY ĐỀ NGHỊ]',
                    '[CHƯA KIỂM CHỨNG]'];

/* Câu dài bao nhiêu thì đáng nhắc. 28 từ là ngưỡng CẢNH BÁO, không
   phải ngưỡng chặn — luật N10 nói rõ nó là phép đo yếu nhất trong
   mười cái, và ghi ra để sau không ai nâng nó thành cửa chặn. */
const CAU_DAI = 28;

const boDau = s => String(s || '').toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

/* ═══════════════ ĐỌC MỘT BÀI THÀNH CÁC KHỐI ═══════════════

   Dấu mở khối: một dòng bắt đầu bằng `K01 |`. Dạng có gạch đứng, KHÔNG
   phải dạng `K01:` — cùng quy ước với bộ vẽ thị giác, nơi `TÊN:` là
   một GIÁ TRỊ một dòng còn `TÊN |` là một KHỐI nhiều dòng.

   Trộn hai dạng ấy đã là một lớp lỗi thật ở bộ vẽ: tôi viết `TÂM |`
   cho một giá trị, và hàm đọc giá trị không bao giờ tìm thấy nó. Nên
   ở đây chỉ có MỘT dạng, và nó là dạng khối.

   Chữ sau dấu gạch đứng là tên khối do người viết gõ — máy KHÔNG bắt
   phải trùng tên trong hiến pháp. Bắt trùng tên là bắt người viết gõ
   lại đúng dấu tiếng Việt của hai mươi bốn cái tên, và họ sẽ chép
   dán, và bản chép dán sẽ lệch khi tên đổi. */
const RE_MO = /^[ \t]*(K\d{2})[ \t]*\|(.*)$/;

export function docKhoi(chu) {
  const dong = String(chu || '').split('\n');
  const khoi = {}, la = [], trung = [];
  let dang = null, gom = [];

  const chot = () => {
    if (!dang) return;
    khoi[dang] = gom.join('\n').trim();
    dang = null; gom = [];
  };

  dong.forEach(d => {
    const m = d.match(RE_MO);
    if (!m) { if (dang) gom.push(d); return; }
    chot();
    const ma = m[1];
    if (MA_KHOI.indexOf(ma) < 0) { la.push(ma); dang = null; gom = []; return; }
    if (Object.prototype.hasOwnProperty.call(khoi, ma)) trung.push(ma);
    dang = ma; gom = [];
  });
  chot();

  /* Khối mở ra rồi để trống thì KHÔNG tính là có. Đây là chỗ dễ lách
     nhất của cả cổng: gõ đủ hai mươi bốn dấu mở là qua hết phép đếm,
     mà bài vẫn trống. Nên phép đo là CÓ CHỮ, không phải có dấu mở. */
  const co = {}, tronG = [];
  MA_KHOI.forEach(ma => {
    if (!Object.prototype.hasOwnProperty.call(khoi, ma)) return;
    if (khoi[ma].length >= 8) co[ma] = khoi[ma];
    else tronG.push(ma);
  });

  const kq = {khoi: co, thieu: MA_KHOI.filter(ma => !co[ma])};
  /* Trường không áp dụng thì BỎ HẲN KHOÁ, không để mảng rỗng — vắng
     mặt nghĩa là không có chuyện ấy, còn rỗng nghĩa là đáng lẽ phải
     có giá trị. Bộ soát trường trống bắt đúng chỗ này. */
  if (tronG.length) kq.trong = tronG;
  if (la.length)    kq.la = la;
  if (trung.length) kq.trung = trung;
  return kq;
}

/* ═══════════════ KHỐI NÀO ĐÒI KHỐI NÀO ═══════════════

   Đây là chỗ chín trong mười luật chống nội dung rỗng thành PHÉP ĐO.
   "Bài tập không có sản phẩm" là một câu ai cũng gật; K14 đòi K15 là
   một thứ máy chỉ ra được ở đúng dòng nào. */
export function soatDoi(coKhoi) {
  const pham = [];
  KHOI.forEach(([ma, ten, doi]) => {
    if (!doi || !coKhoi[ma]) return;
    doi.forEach(can => {
      if (coKhoi[can]) return;
      const tenCan = (KHOI.find(k => k[0] === can) || [])[1] || can;
      pham.push({khoi: ma, ten, can, tenCan});
    });
  });
  return pham;
}

/* ═══════════════ DÒ CHỮ ═══════════════

   Cả ba phép dò dưới đây trả về SỐ DÒNG. Một lời nhắc chung thì người
   viết gật rồi không sửa chỗ nào; chỉ đúng dòng thì họ sửa. */
/* ══ DÒ THEO TỪ, KHÔNG DÒ THEO CHUỖI CON ══

   Bản đầu tôi viết `t.indexOf(boDau(hang[0])) >= 0`. Nó chạy, và bộ
   thử bắt ngay: một bài sạch bị báo mười ba câu dán nhãn, vì bỏ dấu
   xong thì "hư" thành "hu", và "hu" nằm trong "chua" (chưa), "chuan"
   (chuẩn), "thu" (thứ)… Máy chỉ vào những dòng không có gì sai.

   Đó là lớp hỏng tệ nhất một bộ dò có thể mắc: nó không im, nó BÁO
   SAI — và người viết bị chỉ nhầm ba lần thì lần thứ tư họ thôi đọc
   cả danh sách, kể cả dòng đúng.

   Nay chặn hai đầu bằng ranh giới chữ. Vẫn dò trên bản BỎ DẤU, để
   "lười" và "luoi" cùng bắt được — người ta gõ thiếu dấu rất thường. */
function reTu(cum) {
  const goc = boDau(cum).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s+');
  return new RegExp('(?<![\\p{L}\\p{N}])' + goc + '(?![\\p{L}\\p{N}])', 'u');
}

function doBang(chu, bang, dungCot) {
  const dong = String(chu || '').split('\n');
  const re = bang.map(h => reTu(h[0]));
  const bat = [];
  dong.forEach((d, i) => {
    const t = boDau(d);
    bang.forEach((hang, j) => {
      if (!re[j].test(t)) return;
      const b = {dong: i + 1, bat: hang[0], thay: hang[1]};
      if (dungCot && hang[2]) b.vi = hang[2];
      bat.push(b);
    });
  });
  return bat;
}

export function soatRong(chu)    { return doBang(chu, RONG, false); }
export function soatLoiNoi(chu)  { return doBang(chu, LOI_THAY, true); }

/* Câu dài. Đếm theo TỪ chứ không theo ký tự: tiếng Việt nhiều dấu nên
   đếm ký tự thì một câu ngắn đầy dấu cũng vượt ngưỡng. */
export function soatCauDai(chu) {
  const cau = String(chu || '')
    .replace(/^[ \t]*K\d{2}[ \t]*\|.*$/gm, '')   /* bỏ dòng dấu mở khối */
    .split(/(?<=[.!?;])\s+|\n+/)
    .map(c => c.trim()).filter(c => c.length > 0);
  if (!cau.length) return {soCau: 0, trungBinh: 0, dai: []};
  const dem = c => c.split(/\s+/).filter(Boolean).length;
  const tong = cau.reduce((s, c) => s + dem(c), 0);
  const dai = cau.filter(c => dem(c) > CAU_DAI)
    .map(c => ({tu: dem(c), cau: c.slice(0, 90)})).slice(0, 10);
  const kq = {soCau: cau.length, trungBinh: Math.round(tong / cau.length * 10) / 10};
  if (dai.length) kq.dai = dai;
  return kq;
}

/* Nhãn nguồn. Phép đo YẾU: nó đếm bài có nhãn nào không, chứ không
   biết câu nào đáng lẽ phải có nhãn. Ghi thẳng ra đây để sau không ai
   đọc con số này như một phép đo mạnh. */
export function soatNguon(chu) {
  const t = String(chu || '');
  const co = NHAN_NGUON.filter(n => t.indexOf(n) >= 0);
  const kq = {soNhan: co.length, dat: co.length > 0};
  if (co.length) kq.daDung = co;
  return kq;
}

/* Có số hay không. Dùng cho hai chiều: việc phải có con số (mấy lần,
   mấy phút), và KPI phải có mốc nền. */
const coSo = s => /\d/.test(String(s || ''));

/* ═══════════════ CHẤM — SÁU CHIỀU MÁY, BỐN CHIỀU NGƯỜI ═══════════════

   Mỗi chiều trả về `duoc`, `tran`, và `vi` nói ra máy đếm cái gì. Ô
   `vi` không phải trang trí: một điểm số không nói vì sao thì người
   viết hoặc tin mù hoặc bỏ qua, và cả hai đều làm thang điểm vô dụng. */
function chamMay(x, doc, doi, rong, loi, dai, nguon) {
  const k = doc.khoi, cham = {};

  /* Q01 — đúng hệ. Dùng CHUNG hàm soatTang của cổng thị giác, không
     chép: chép là dựng bản thứ hai của ranh giới Tầng, và mục 75 chỉ
     đối chiếu một bản. */
  const st = soatTang(x.tang, String(x.chu || ''));
  cham.Q01 = st.qua
    ? {duoc: 10, tran: 10, vi: st.vi}
    : {duoc: 0, tran: 10, vi: st.vi, ma: st.ma};

  /* Q03 — dùng được ngay. Trần máy 6: máy đo được CÓ công cụ và CÓ
     hướng dẫn, không đo được công cụ ấy có dùng được thật không. */
  const cQ3 = (k.K12 ? 3 : 0) + (k.K13 ? 3 : 0);
  cham.Q03 = {duoc: cQ3, tran: 6, conNguoi: 4,
    vi: 'Máy đếm khối K12 Công cụ và K13 Hướng dẫn dùng. ' +
        (cQ3 === 6 ? 'Có cả hai.' : 'Thiếu: ' +
          [!k.K12 && 'K12', !k.K13 && 'K13'].filter(Boolean).join(', ') + '.')};

  /* Q04 — rõ ràng. Trừ theo hai thứ đếm được: câu rỗng và câu dài. */
  const truRong = Math.min(5, rong.length);
  const truDai  = dai.dai ? Math.min(5, dai.dai.length) : 0;
  cham.Q04 = {duoc: Math.max(0, 10 - truRong - truDai), tran: 10,
    vi: rong.length + ' câu rỗng, ' + (dai.dai ? dai.dai.length : 0) +
        ' câu trên ' + CAU_DAI + ' từ. Câu trung bình ' + dai.trungBinh + ' từ.'};

  /* Q05 — làm được. Việc 24 giờ và việc 7 ngày, mỗi việc phải có SỐ.
     Một việc không có số thì không ai biết làm bao nhiêu là đủ. */
  const q5 = [];
  if (k.K20) q5.push(coSo(k.K20) ? 5 : 3); else q5.push(0);
  if (k.K21) q5.push(coSo(k.K21) ? 5 : 3); else q5.push(0);
  cham.Q05 = {duoc: q5[0] + q5[1], tran: 10,
    vi: 'K20 Việc 24 giờ: ' + (k.K20 ? (coSo(k.K20) ? 'có, có số' : 'có, KHÔNG có số') : 'thiếu') +
        '. K21 Việc 7 ngày: ' + (k.K21 ? (coSo(k.K21) ? 'có, có số' : 'có, KHÔNG có số') : 'thiếu') + '.'};

  /* Q06 — đo được. KPI có số, và có chỗ phản tư để con số ấy dẫn tới
     một quyết định (luật N05). */
  const q6 = (k.K16 ? (coSo(k.K16) ? 5 : 2) : 0) + (k.K18 ? 3 : 0) + (k.K17 ? 2 : 0);
  cham.Q06 = {duoc: q6, tran: 10,
    vi: 'K16 KPI: ' + (k.K16 ? (coSo(k.K16) ? 'có, có mốc số' : 'có, KHÔNG có số nào') : 'thiếu') +
        '. K18 Phản tư: ' + (k.K18 ? 'có' : 'thiếu') +
        '. K17 Bảng theo dõi: ' + (k.K17 ? 'có' : 'thiếu') + '.'};

  /* Q07 — ngôn từ coach. Mỗi câu phán xét trừ hai điểm. Trừ nặng vì
     một câu dán nhãn trong bài của Học viện thì đi thẳng vào một nhà
     thật, và ở đó nó không sửa lại được. */
  cham.Q07 = {duoc: Math.max(0, 10 - loi.length * 2), tran: 10,
    vi: loi.length ? loi.length + ' câu phán xét hoặc dán nhãn — xem danh sách.'
                   : 'Không câu nào rơi vào bảng thay lời.'};

  /* Q09 — chìa khoá kim cương. Trần máy 4, thấp nhất trong ba chiều
     máy chạm tới: máy chỉ biết khối K02 có mặt và không phải một câu
     trong bảng rỗng. Câu ấy có đổi được cách nhìn ai không thì chỉ
     người đọc mới biết. */
  const k2Rong = k.K02 ? RONG.some(r => reTu(r[0]).test(boDau(k.K02))) : false;
  cham.Q09 = {duoc: k.K02 ? (k2Rong ? 1 : 4) : 0, tran: 4, conNguoi: 6,
    vi: !k.K02 ? 'Thiếu khối K02.'
      : k2Rong ? 'Có K02, nhưng câu ấy nằm trong bảng câu rỗng.'
               : 'Có K02 và không rơi vào bảng câu rỗng. Phần còn lại người chấm.'};

  return cham;
}

/* ═══════════════ MƯỜI ĐIỀU KIỆN HOÀN THÀNH ═══════════════

   Đây là thang đo NGƯỜI HỌC, không phải thang đo bài viết — nên nó
   tính riêng, không cộng vào điểm. Một bài 92 điểm vẫn có thể để
   người học không biết bước tiếp theo. */
const XONG_KHOI = {
  H1: ['K01', 'K05'], H2: ['K03'], H3: ['K02', 'K04', 'K06', 'K07', 'K08', 'K09', 'K10'],
  H4: ['K20', 'K21'], H5: ['K12', 'K13'], H6: ['K14', 'K15'],
  H7: ['K16', 'K17', 'K22'], H8: ['K18', 'K19'], H9: ['K11'], H10: ['K23', 'K24']
};
const XONG_TEN = {
  H1: 'Người học rõ mình đang ở đâu', H2: 'Người học rõ mình muốn đi đâu',
  H3: 'Người học hiểu vì sao', H4: 'Người học biết làm gì',
  H5: 'Người học có công cụ trong tay', H6: 'Người học tạo ra một sản phẩm',
  H7: 'Người học biết đo', H8: 'Người học biết phản tư',
  H9: 'Người học biết điều chỉnh', H10: 'Người học biết bước tiếp theo'
};

export function soatXong(coKhoi) {
  const dat = [], chua = [];
  Object.keys(XONG_KHOI).forEach(h => {
    const thieu = XONG_KHOI[h].filter(ma => !coKhoi[ma]);
    if (thieu.length) chua.push({ma: h, dieu: XONG_TEN[h], thieu});
    else dat.push({ma: h, dieu: XONG_TEN[h]});
  });
  return {dat, chua};
}

/* ═══════════════ CỬA ═══════════════

   Một lượt soát KHÔNG ghi gì vào cơ sở dữ liệu ngoài dòng nhật ký.
   Bài học chưa có sổ riêng ở bản này — thang duyệt sáu bậc cho nội
   dung là phần sau. Ghi ra đây để không ai tưởng cổng này đã CHẶN
   được đường phát hành: tới bản 9.99.41 nó ĐO và NÓI, chưa chặn. */
export async function soatNoiDung(y, env, db, hoSo) {
  if (!duocVao(hoSo))
    return {ok: false, error: 'KHONGQUYEN',
      vi: 'Cổng nội dung dành cho người của Học viện từ cấp R05 trở lên.'};

  const chu = String(y.chu || '');
  if (chu.trim().length < 40)
    return {ok: false, error: 'QUANGAN',
      vi: 'Bài quá ngắn để soát. Cần ít nhất 40 ký tự.'};

  const tang = String(y.tang || '');
  const doc  = docKhoi(chu);
  const doi  = soatDoi(doc.khoi);
  const rong = soatRong(chu);
  const loi  = soatLoiNoi(chu);
  const dai  = soatCauDai(chu);
  const ngu  = soatNguon(chu);
  const xong = soatXong(doc.khoi);
  const cham = chamMay({tang, chu}, doc, doi, rong, loi, dai, ngu);

  /* Điểm máy: cộng đúng phần máy chấm. KHÔNG cộng ra tổng trên trăm —
     bốn chiều còn trống, và một tổng có ô trống trông y hệt một tổng
     đã đủ. Trả về `tranMay` để người đọc biết tối đa máy cho được bao
     nhiêu, và `conCho` liệt kê ai còn phải chấm gì. */
  let duoc = 0, tranMay = 0;
  Object.keys(cham).forEach(q => { duoc += cham[q].duoc; tranMay += cham[q].tran; });
  const conCho = DIEM.filter(d => d.ai !== 'may')
    .map(d => ({ma: d.ma, ten: d.ten,
      con: d.ai === 'nguoi' ? d.trong : d.trong - (d.tran || 0)}));

  const camPham = [];
  if (doi.length) doi.forEach(p => camPham.push({
    ma: p.khoi === 'K14' ? 'N06' : p.khoi === 'K15' ? 'N07' :
        p.khoi === 'K16' ? 'N05' : p.khoi === 'K19' ? 'N08' :
        p.khoi === 'K02' ? 'N03' : 'N04',
    vi: 'Khối ' + p.khoi + ' ' + p.ten + ' có, nhưng thiếu ' + p.can + ' ' + p.tenCan + '.'}));
  if (rong.length) camPham.push({ma: 'N01', vi: rong.length + ' dòng có câu rỗng.'});
  if (!ngu.dat)    camPham.push({ma: 'N09',
    vi: 'Không dòng nào mang nhãn nguồn. Bốn nhãn: ' + NHAN_NGUON.join(' · ')});
  if (dai.dai)     camPham.push({ma: 'N10', canhBao: true,
    vi: dai.dai.length + ' câu trên ' + CAU_DAI + ' từ. Đây là CẢNH BÁO, không chặn.'});

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.username,
    viec: 'soatNoiDung', doiTuong: tang || '(chưa khai Tầng)',
    chiTiet: 'thiếu ' + doc.thieu.length + '/24 khối · máy cho ' +
             duoc + '/' + tranMay});

  const kq = {ok: true, tang, khoi: doc, doi, rong, loi, cauDai: dai, nguon: ngu,
    xong, cham, diemMay: duoc, tranMay, conCho, cam: camPham,
    vi: 'Máy chấm được ' + tranMay + '/100 điểm và cho ' + duoc + '. ' +
        'Bốn chiều còn lại — chiều sâu, cá nhân hoá, dùng lại được, và phần ' +
        'có giá trị của chìa khoá kim cương — máy KHÔNG chấm và KHÔNG đoán. ' +
        'Bài chưa có tổng điểm cho tới khi có người chấm chúng.'};
  return kq;
}

/* Mẫu một bài đủ hai mươi bốn khối. Có mẫu thì không ai phải nhớ hai
   mươi bốn mã, và dấu mở khối không bị gõ sai — chỗ hỏng im lặng nhất
   của mọi hệ đọc theo dấu. */
export async function mauBaiHoc(y, env, db, hoSo) {
  if (!duocVao(hoSo))
    return {ok: false, error: 'KHONGQUYEN',
      vi: 'Cổng nội dung dành cho người của Học viện từ cấp R05 trở lên.'};
  const mau = KHOI.map(([ma, ten]) => ma + ' | ' + ten + '\n').join('\n');
  return {ok: true, mau, soKhoi: KHOI.length,
    vi: 'Mỗi khối mở bằng một dòng dạng `K01 |`. Chữ sau dấu gạch đứng ' +
        'là tên khối, gõ thế nào cũng được — máy đọc theo MÃ. Khối để ' +
        'trống dưới 8 ký tự tính là thiếu.'};
}

/* Xuất bản chép ra cho bộ kiểm đối chiếu với kho (mục 76). Không có
   hàm này thì phép đối chiếu phải đọc mã nguồn bằng biểu thức, và một
   phép đo đọc mã nguồn thì hỏng lặng lẽ khi ai đó xuống dòng khác đi. */
export const BAN_CHEP = {KHOI, DIEM, BAC_DIEM, RONG, LOI_THAY, NHAN_NGUON, CAU_DAI};

/* ═══════════════════════════════════════════════════════════════
   THANG NĂM CỔNG — bản 9.99.42

   Chốt của chủ hệ: "không gì lên sóng mà không qua 5 cổng kiểm duyệt
   có người ký."

   Bản 9.99.41 chỉ ĐO và NÓI. Phần này CHẶN.

   ══ HAI CHỖ TÔI SỬA BẢN ĐẶC TẢ CỦA CHỦ HỆ ══

   1. Bảng quyền của bản đặc tả cho Super Admin đứng ở CẢ NĂM cổng. Đọc
      thì tiện — chủ hệ gỡ được cổng tắc. Nhưng một mình chủ hệ ký được
      cổng 2, 3, 4, rồi 5: thang năm cổng thành MỘT chữ ký, sổ vẫn đủ
      năm dòng, và chỉ khi đọc cột tên mới thấy năm dòng cùng một tên.
      Luật L3 đóng chỗ ấy: một người ký nhiều nhất MỘT cổng trên một bài.

   2. Bản đặc tả ghi vân tay nội dung vào mỗi chữ ký và nói "ai chỉnh
      content ngầm sau khi duyệt là lộ ngay qua hash". LỘ chứ không
      CHẶN — nghĩa là phải có người đi đọc mới thấy, mà chẳng ai đi đọc.
      Ở đây sửa bài là mọi chữ ký cũ HẾT HIỆU LỰC và bài về bản nháp.
      Máy làm việc ấy, không phải người phát hiện ra.
   ═══════════════════════════════════════════════════════════════ */

/* Năm cổng, và cổng nào đi tiếp sang cổng nào. Bản chép của
   G.KN_TRANGTHAI; mục 77 của bộ kiểm đối chiếu. */
const CONG_TIEP = {
  nhap: ['may'], may: ['bienTap'], bienTap: ['chuyenMon'],
  chuyenMon: ['giuChuan'], giuChuan: ['chuHe'], chuHe: ['phatHanh'],
  phatHanh: [], tuChoi: []
};

/* Bậc nào ứng với cổng nào, và quyền nào ký được. */
const CONG_MA = {may: 'C1', bienTap: 'C2', chuyenMon: 'C3',
                 giuChuan: 'C4', chuHe: 'C5'};
const CONG_QUYEN = {bienTap: 'bienTap', chuyenMon: 'chuyenMon',
                    giuChuan: 'giuChuan'};
const SLA_GIO = {bienTap: 24, chuyenMon: 72, giuChuan: 24, chuHe: 48};

const CAP_QUYEN_KY = 2;   /* chỉ R01–R02 cấp được quyền ký — như quyenTaiChinh */

/* ══ VÂN TAY ══
   SHA-256, rút 16 chữ đầu. Rút ngắn vì cột này để ĐỐI CHIẾU chứ không
   để chống giả mạo có chủ đích: kẻ sửa được thẳng cơ sở dữ liệu thì
   sửa luôn cả cột vân tay. Thứ nó bắt là chỗ sửa bài qua đúng cửa
   ứng dụng rồi quên mất là bài đã có chữ ký — và đó là chỗ hay xảy ra. */
async function vanTay(chu) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(chu || '')));
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0'))
    .join('').slice(0, 16);
}

const maMoi = () => (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()))
  .replace(/-/g, '').slice(0, 24);

/** Người này đang giữ quyền ký nào. Đọc bảng quyenNoiDung, bỏ dòng đã thu hồi. */
async function quyenKy(db, username) {
  const r = await db.prepare(
    'SELECT chucNang FROM quyenNoiDung WHERE username = ? AND thuHoiLuc IS NULL')
    .bind(String(username || '')).all();
  return ((r && r.results) || []).map(x => x.chucNang);
}

/* ═══════════════ NẠP MỘT BÀI ═══════════════

   Ghi bài ở bậc NHÁP. Không tự đẩy vào cổng 1: nạp và nộp là hai việc
   khác nhau, và gộp chúng thì không ai sửa được bản nháp của mình. */
export async function napBai(y, env, db, hoSo) {
  if (!duocVao(hoSo))
    return {ok: false, error: 'KHONGQUYEN',
      vi: 'Cổng nội dung dành cho người của Học viện từ cấp R05 trở lên.'};

  const chu = String(y.chu || '');
  const tieuDe = String(y.tieuDe || '').trim();
  if (tieuDe.length < 4)
    return {ok: false, error: 'THIEUTIEUDE', vi: 'Bài phải có tiêu đề.'};
  if (chu.trim().length < 40)
    return {ok: false, error: 'QUANGAN', vi: 'Bài quá ngắn. Cần ít nhất 40 ký tự.'};

  const id = String(y.id || '').trim() || ('BND-' + maMoi());
  const cu = await db.prepare('SELECT * FROM baiNoiDung WHERE id = ?').bind(id).first();
  const vt = await vanTay(chu);
  const luc = new Date().toISOString();

  if (!cu) {
    await db.prepare(
      'INSERT INTO baiNoiDung (id,tieuDe,chu,tang,vanTay,trangThai,nguoiViet,vietLuc) ' +
      'VALUES (?,?,?,?,?,?,?,?)')
      .bind(id, tieuDe, chu, String(y.tang || 'T1'), vt, 'nhap', hoSo.uid, luc).run();
    await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.username,
      viec: 'napBai', doiTuong: id, chiTiet: 'bài mới · ' + tieuDe});
    return {ok: true, id, trangThai: 'nhap', vanTay: vt};
  }

  /* ── SỬA MỘT BÀI ĐÃ CÓ CHỮ KÝ: LUẬT L4 ──
     Không chặn lượt sửa — chặn là bắt người ta dựng một bài thứ hai để
     sửa một chữ, và bài thứ hai thì không ai nối lại được với bài đầu.
     Thay vào đó: mọi chữ ký cũ hết hiệu lực, bài về bản nháp, và sổ ký
     GIỮ NGUYÊN các dòng cũ kèm vân tay cũ — nên sáu tháng sau vẫn đọc
     ra được là bốn người từng ký một bản khác. */
  if (cu.nguoiViet !== hoSo.uid && !laChuHe(hoSo))
    return {ok: false, error: 'KHONGPHAIBAICUA',
      vi: 'Bài này của người khác. Chỉ người viết hoặc chủ hệ sửa được.'};
  if (cu.trangThai === 'phatHanh')
    return {ok: false, error: 'DAPHATHANH',
      vi: 'Bài đã phát hành thì không sửa đè. Bài đã ở trong tay người đọc; ' +
          'ghi đè bản trong sổ là làm sổ nói khác thứ họ đang cầm. Nạp một ' +
          'bài mới.'};

  const doiChu = cu.chu !== chu;
  const soKyCu = await db.prepare(
    'SELECT COUNT(*) n FROM kyNoiDung WHERE baiId = ? AND viec = ?')
    .bind(id, 'ky').first();
  const coKy = ((soKyCu && soKyCu.n) || 0) > 0;

  await db.prepare(
    'UPDATE baiNoiDung SET tieuDe = ?, chu = ?, tang = ?, vanTay = ?, ' +
    'trangThai = ?, vaoCongLuc = NULL, soatMay = NULL WHERE id = ?')
    .bind(tieuDe, chu, String(y.tang || cu.tang), vt,
      doiChu ? 'nhap' : cu.trangThai, id).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.username,
    viec: 'suaBai', doiTuong: id,
    chiTiet: doiChu ? ('nội dung đổi · ' + (coKy ? 'chữ ký cũ hết hiệu lực' : 'chưa có chữ ký'))
                    : 'chỉ đổi tiêu đề'});

  const kq = {ok: true, id, trangThai: doiChu ? 'nhap' : cu.trangThai, vanTay: vt};
  if (doiChu && coKy) kq.vi =
    'Nội dung đã đổi, nên MỌI CHỮ KÝ cũ hết hiệu lực và bài về bản nháp ' +
    '(luật L4). Sổ ký giữ nguyên các dòng cũ kèm vân tay cũ — sáu tháng sau ' +
    'vẫn đọc ra được là họ đã ký một bản khác. Đi lại từ cổng 1.';
  return kq;
}

/* ═══════════════ CỔNG 1 — MÁY ═══════════════

   Không có ô "duyệt ngoại lệ" (luật L5). Muốn qua thì sửa bài. */
export async function nopBai(y, env, db, hoSo) {
  const bai = await db.prepare('SELECT * FROM baiNoiDung WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!bai) return {ok: false, error: 'KHONGCO', vi: 'Không tìm thấy bài này.'};
  if (!duocVao(hoSo))
    return {ok: false, error: 'KHONGQUYEN', vi: 'Cổng nội dung dành cho R05 trở lên.'};
  if (bai.trangThai !== 'nhap')
    return {ok: false, error: 'SAIBAC',
      vi: 'Bài đang ở bậc "' + bai.trangThai + '", không phải bản nháp.'};

  const soat = await soatNoiDung({chu: bai.chu, tang: bai.tang}, env, db, hoSo);
  if (!soat.ok) return soat;

  /* Máy chặn bằng SỐ. Hai điều kiện, cả hai đếm được:
     thiếu khối bắt buộc, hoặc có câu phán xét. Không chặn bằng điểm
     tổng — máy chỉ chấm được 60/100, và chặn bằng một con số máy không
     chấm đủ là chặn bằng một con số không có nghĩa. */
  const chan = [];
  if (soat.khoi.thieu.length)
    chan.push('thiếu ' + soat.khoi.thieu.length + '/24 khối: ' +
      soat.khoi.thieu.join(', '));
  if (soat.doi.length)
    chan.push(soat.doi.map(p => p.khoi + ' đòi ' + p.can).join(' · '));
  if (soat.loi.length)
    chan.push(soat.loi.length + ' câu phán xét (dòng ' +
      soat.loi.map(l => l.dong).join(', ') + ')');

  const luc = new Date().toISOString();
  const vt = await vanTay(bai.chu);

  await db.prepare(
    'INSERT INTO kyNoiDung (id,baiId,cong,viec,boiAi,vaiLuc,vanTay,ghiChu,kyLuc) ' +
    'VALUES (?,?,?,?,?,?,?,?,?)')
    .bind(maMoi(), bai.id, 'C1', chan.length ? 'tuChoi' : 'ky', 'may', 'may', vt,
      chan.length ? chan.join(' · ') : 'Máy đạt: đủ khối, đủ khối đòi, không câu phán xét.',
      luc).run();

  await db.prepare(
    'UPDATE baiNoiDung SET trangThai = ?, vaoCongLuc = ?, soatMay = ?, lyDo = ? WHERE id = ?')
    .bind(chan.length ? 'nhap' : 'bienTap', chan.length ? null : luc,
      JSON.stringify({diemMay: soat.diemMay, tranMay: soat.tranMay,
        thieuKhoi: soat.khoi.thieu, cam: soat.cam.map(c => c.ma)}),
      chan.length ? chan.join(' · ') : null, bai.id).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.username,
    viec: 'nopBai', doiTuong: bai.id,
    chiTiet: chan.length ? 'máy chặn: ' + chan.join(' · ') : 'qua cổng 1'});

  if (chan.length)
    return {ok: false, error: 'MAYCHAN', chan, soat,
      vi: 'Cổng 1 chặn. Không có ô duyệt ngoại lệ ở cổng này (luật L5) — ' +
          'bốn người sau không đốt thời gian đọc thứ đếm được là chưa xong. ' +
          'Sửa rồi nộp lại.'};
  return {ok: true, trangThai: 'bienTap', soat,
    vi: 'Qua cổng 1. Còn bốn cổng người, và mỗi cổng một người KHÁC ' +
        'nhau — luật L3.'};
}

/* ═══════════════ BỐN CỔNG NGƯỜI ═══════════════ */
export async function kyBai(y, env, db, hoSo) {
  const bai = await db.prepare('SELECT * FROM baiNoiDung WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!bai) return {ok: false, error: 'KHONGCO', vi: 'Không tìm thấy bài này.'};

  const cong = bai.trangThai;
  const maCong = CONG_MA[cong];
  if (!maCong || cong === 'may')
    return {ok: false, error: 'SAIBAC',
      vi: 'Bài đang ở bậc "' + cong + '" — không phải một cổng người ký.'};

  const tuChoi = String(y.viec || 'ky') === 'tuChoi';
  const lyDo = String(y.lyDo || '').trim();

  /* ── LUẬT L2 ĐỨNG TRƯỚC MỌI PHÉP KIỂM QUYỀN ──
     Bản đầu tôi đặt phép kiểm quyền lên trước, và bộ thử bắt ngay: một
     người viết chưa có quyền ký thì bị báo "thiếu quyền ký" — nên họ đi
     xin đúng cái quyền KHÔNG giúp được gì, vì xin xong vẫn bị L2 chặn.

     Thứ tự các phép kiểm không phải chuyện sắp xếp cho gọn. Nó quyết
     định người bị chặn đi làm việc gì tiếp theo. */
  if (bai.nguoiViet === hoSo.uid)
    return {ok: false, error: 'TUDUYET',
      vi: 'Luật L2: người viết không ký bài của chính mình. Không phải chuyện ' +
          'tin hay không tin — người viết đọc lại thì thấy thứ mình ĐỊNH ' +
          'viết, không thấy thứ đã viết ra. Xin thêm quyền ký cũng không qua ' +
          'được chỗ này; bài này cần một người khác đọc.'};

  /* ── AI KÝ ĐƯỢC CỔNG NÀY ──
     Cổng 5 chỉ R01. Ba cổng kia cần quyền tương ứng — hoặc R01 đứng
     thay, và trả giá ở luật L3 ngay dưới. */
  const dangGiu = await quyenKy(db, hoSo.username);
  const canQuyen = CONG_QUYEN[cong];
  if (cong === 'chuHe') {
    if (!laChuHe(hoSo))
      return {ok: false, error: 'CANCHUHE',
        vi: 'Cổng 5 chỉ Super Admin ký. Máy soát, chủ hệ quyết.'};
  } else if (dangGiu.indexOf(canQuyen) < 0 && !laChuHe(hoSo)) {
    return {ok: false, error: 'THIEUQUYENKY',
      canQuyen,
      vi: 'Cổng ' + maCong + ' cần quyền ký "' + canQuyen + '". Chưa ai cấp ' +
          'quyền ấy cho tài khoản này. Chỉ R01–R02 cấp được, bằng cửa ' +
          'capQuyenNoiDung.'};
  }

  /* ── LUẬT L3: MỘT NGƯỜI KÝ NHIỀU NHẤT MỘT CỔNG ──
     Đọc thẳng sổ ký, không đọc một ô tóm tắt: ô tóm tắt thì sửa được.
     Chỉ đếm chữ ký còn HIỆU LỰC — cùng vân tay với bài hiện tại. */
  const daKy = await db.prepare(
    'SELECT cong FROM kyNoiDung WHERE baiId = ? AND boiAi = ? AND viec = ? ' +
    'AND vanTay = ?').bind(bai.id, hoSo.uid, 'ky', bai.vanTay).first();
  if (daKy)
    return {ok: false, error: 'DAKYCONGKHAC', daKy: daKy.cong,
      vi: 'Luật L3: tài khoản này đã ký cổng ' + daKy.cong + ' của bài này, nên ' +
          'không ký thêm cổng ' + maCong + '. Không có luật này thì một người ' +
          'ký được cả bốn cổng người, thang năm cổng thành một chữ ký — mà sổ ' +
          'vẫn đủ năm dòng, nên không ai đọc ra. ' +
          (laChuHe(hoSo) ? 'Chủ hệ đứng thay được MỘT cổng, và trả giá đúng ở ' +
            'chỗ này: đã ký một cổng thì cổng 5 phải người khác ký.' : '')};

  /* ── TỪ CHỐI PHẢI NÓI VÌ SAO ── */
  if (tuChoi && lyDo.length < 10)
    return {ok: false, error: 'THIEULYDO',
      vi: 'Từ chối thì phải nói vì sao. Không nói thì người viết sửa mò, và ' +
          'lần sau nộp lên y hệt.'};

  const luc = new Date().toISOString();
  const den = tuChoi ? 'nhap' : (CONG_TIEP[cong] || [])[0];
  if (!den)
    return {ok: false, error: 'SAIBAC', vi: 'Từ bậc này không đi tiếp được.'};

  await db.prepare(
    'INSERT INTO kyNoiDung (id,baiId,cong,viec,boiAi,vaiLuc,vanTay,ghiChu,kyLuc) ' +
    'VALUES (?,?,?,?,?,?,?,?,?)')
    .bind(maMoi(), bai.id, maCong, tuChoi ? 'tuChoi' : 'ky', hoSo.uid,
      hoSo.role, bai.vanTay, lyDo || String(y.ghiChu || 'Đạt.'), luc).run();

  await db.prepare(
    'UPDATE baiNoiDung SET trangThai = ?, vaoCongLuc = ?, lyDo = ? WHERE id = ?')
    .bind(den, tuChoi ? null : luc, tuChoi ? lyDo : null, bai.id).run();

  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.username,
    viec: tuChoi ? 'tuChoiBai' : 'kyBai', doiTuong: bai.id,
    chiTiet: maCong + ' → ' + den});

  return {ok: true, cong: maCong, trangThai: den, vanTay: bai.vanTay,
    vi: den === 'phatHanh'
      ? 'Đã phát hành. Năm cổng, năm chữ ký, năm người khác nhau.'
      : (tuChoi ? 'Đã từ chối, bài về bản nháp.'
                : 'Qua cổng ' + maCong + '. Tiếp: ' + den + '.')};
}

/* ═══════════════ SỔ KÝ CỦA MỘT BÀI ═══════════════

   Trả về đủ sổ, kèm cột `conHieuLuc`: chữ ký nào neo vào vân tay hiện
   tại thì còn, chữ ký nào neo vào một bản cũ thì hết. Không xoá dòng
   nào — dòng hết hiệu lực chính là chỗ kể ra bài đã bị sửa sau khi ký. */
export async function soKyBai(y, env, db, hoSo) {
  if (!duocVao(hoSo))
    return {ok: false, error: 'KHONGQUYEN', vi: 'Cổng nội dung dành cho R05 trở lên.'};
  const bai = await db.prepare('SELECT * FROM baiNoiDung WHERE id = ?')
    .bind(String(y.id || '')).first();
  if (!bai) return {ok: false, error: 'KHONGCO', vi: 'Không tìm thấy bài này.'};

  const r = await db.prepare('SELECT * FROM kyNoiDung WHERE baiId = ? ORDER BY kyLuc')
    .bind(bai.id).all();
  const so = ((r && r.results) || []).map(k => ({
    cong: k.cong, viec: k.viec, boiAi: k.boiAi, vaiLuc: k.vaiLuc,
    ghiChu: k.ghiChu, kyLuc: k.kyLuc,
    conHieuLuc: k.vanTay === bai.vanTay}));

  const hetHieuLuc = so.filter(k => !k.conHieuLuc && k.viec === 'ky').length;
  const kq = {ok: true, id: bai.id, tieuDe: bai.tieuDe, trangThai: bai.trangThai,
    vanTay: bai.vanTay, nguoiViet: bai.nguoiViet, so,
    nguoiDaKy: so.filter(k => k.viec === 'ky' && k.conHieuLuc).map(k => k.boiAi)};
  if (hetHieuLuc) kq.canhBao =
    hetHieuLuc + ' chữ ký đã HẾT HIỆU LỰC vì nội dung đổi sau khi ký (luật L4). ' +
    'Chúng ở lại trong sổ chứ không bị xoá — chính chúng là chỗ kể ra chuyện ấy.';
  return kq;
}

/* ═══════════════ ĐỒNG HỒ TREO ═══════════════

   KHÔNG chặn, chỉ nổi lên. Một cổng quá hạn là việc của người quản lý,
   không phải một lỗi của bài — và chặn một bài vì người duyệt bận là
   phạt nhầm người. */
export async function baiTreo(y, env, db, hoSo) {
  if (!duocVao(hoSo))
    return {ok: false, error: 'KHONGQUYEN', vi: 'Cổng nội dung dành cho R05 trở lên.'};
  const r = await db.prepare(
    "SELECT id,tieuDe,trangThai,vaoCongLuc FROM baiNoiDung " +
    "WHERE vaoCongLuc IS NOT NULL AND trangThai NOT IN ('phatHanh','tuChoi','nhap')")
    .all();
  const nay = Date.now();
  const treo = ((r && r.results) || []).map(b => {
    const gio = (nay - Date.parse(b.vaoCongLuc)) / 3600e3;
    const han = SLA_GIO[b.trangThai] || 0;
    return {id: b.id, tieuDe: b.tieuDe, cong: CONG_MA[b.trangThai],
      choGio: Math.round(gio * 10) / 10, hanGio: han, quaHan: gio > han};
  }).filter(x => x.quaHan).sort((a, b) => b.choGio - a.choGio);
  return {ok: true, soTreo: treo.length, treo,
    vi: treo.length ? 'Quá hạn không chặn bài — nó chỉ nổi lên. Chặn một bài vì ' +
          'người duyệt bận là phạt nhầm người.'
      : 'Không cổng nào quá hạn.'};
}

/* ═══════════════ CẤP QUYỀN KÝ ═══════════════
   Chỉ R01–R02, và không ai tự cấp cho mình — y như quyenTaiChinh. */
export async function capQuyenNoiDung(y, env, db, hoSo) {
  if ((BAC[hoSo.role] || 99) > CAP_QUYEN_KY)
    return {ok: false, error: 'KHONGQUYEN',
      vi: 'Chỉ R01–R02 cấp được quyền ký nội dung.'};

  const ten = String(y.username || '').trim();
  const chuc = String(y.chucNang || '').trim();
  const lyDo = String(y.lyDo || '').trim();
  if (Object.keys(CONG_QUYEN).map(k => CONG_QUYEN[k]).indexOf(chuc) < 0)
    return {ok: false, error: 'SAICHUCNANG',
      vi: 'Quyền ký phải là bienTap · chuyenMon · giuChuan.'};
  if (lyDo.length < 10)
    return {ok: false, error: 'THIEULYDO',
      vi: 'Cấp quyền phải nói vì sao. Một quyền không lý do thì sáu tháng sau ' +
          'không ai dám thu hồi, vì không ai biết vì sao nó có ở đó.'};
  if (ten === hoSo.username)
    return {ok: false, error: 'TUCAP',
      vi: 'Không ai tự cấp quyền ký cho mình. Cùng luật với quyenTaiChinh.'};

  const co = await db.prepare(
    'SELECT id FROM quyenNoiDung WHERE username = ? AND chucNang = ? AND thuHoiLuc IS NULL')
    .bind(ten, chuc).first();
  if (co) return {ok: false, error: 'DACAP', vi: 'Tài khoản này đã có quyền ấy.'};

  await db.prepare(
    'INSERT INTO quyenNoiDung (id,username,chucNang,lyDo,boiAi,capLuc) VALUES (?,?,?,?,?,?)')
    .bind(maMoi(), ten, chuc, lyDo, hoSo.username, new Date().toISOString()).run();
  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.username,
    viec: 'capQuyenNoiDung', doiTuong: ten, chiTiet: chuc + ' · ' + lyDo});
  return {ok: true, username: ten, chucNang: chuc};
}

export async function thuHoiQuyenNoiDung(y, env, db, hoSo) {
  if ((BAC[hoSo.role] || 99) > CAP_QUYEN_KY)
    return {ok: false, error: 'KHONGQUYEN', vi: 'Chỉ R01–R02 thu hồi được.'};
  const r = await db.prepare(
    'UPDATE quyenNoiDung SET thuHoiLuc = ?, thuHoiBoi = ? ' +
    'WHERE username = ? AND chucNang = ? AND thuHoiLuc IS NULL')
    .bind(new Date().toISOString(), hoSo.username,
      String(y.username || ''), String(y.chucNang || '')).run();
  const n = (r && r.meta && r.meta.changes) || 0;
  if (!n) return {ok: false, error: 'KHONGCO', vi: 'Không có quyền nào đang hiệu lực để thu.'};
  await Kho.ghiNhatKy(db, {uid: hoSo.uid, username: hoSo.username,
    viec: 'thuHoiQuyenNoiDung', doiTuong: String(y.username || ''),
    chiTiet: String(y.chucNang || '')});
  return {ok: true};
}

export async function dsQuyenNoiDung(y, env, db, hoSo) {
  if (!duocVao(hoSo))
    return {ok: false, error: 'KHONGQUYEN', vi: 'Cổng nội dung dành cho R05 trở lên.'};
  const r = await db.prepare(
    'SELECT username,chucNang,lyDo,boiAi,capLuc FROM quyenNoiDung ' +
    'WHERE thuHoiLuc IS NULL ORDER BY capLuc DESC').all();
  const ds = (r && r.results) || [];
  /* Cổng nào chưa có ai giữ quyền — bài sẽ đứng ở đó, và máy phải nói
     ra là đứng vì THIẾU NGƯỜI chứ không phải vì bài sai. */
  const thieu = Object.keys(CONG_QUYEN).map(c => CONG_QUYEN[c])
    .filter(q => !ds.some(x => x.chucNang === q));
  const kq = {ok: true, ds};
  if (thieu.length) kq.congThieuNguoi = thieu;
  return kq;
}

export const BAN_CHEP_THANG = {CONG_TIEP, CONG_MA, CONG_QUYEN, SLA_GIO};
