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
