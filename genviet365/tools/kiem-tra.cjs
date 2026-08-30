#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · BỘ KIỂM PHÁT HÀNH
   Chạy trước MỌI lần phát hành:  node genviet365/tools/kiem-tra.cjs

   Hai lớp kiểm:
   · Lớp tĩnh  — đọc kho bằng vm, không cần trình duyệt. Bắt lỗi cấu
     trúc: màn thiếu, khoá tra hỏng, khối lạ, bảng lệch cột, màu sai
     định dạng, ô rỗng, chữ tạm.
   · Lớp chạy  — mở bằng Chromium thật (nếu có playwright). Bắt lỗi
     chỉ hiện ra khi dựng: lỗi JS, màn rỗng ruột, tràn ngang, và
     QUAN TRỌNG NHẤT: vào thẳng bằng #hash một màn không có quyền
     thì phải ra thẻ khoá, không ra nội dung.

   Mã thoát khác 0 nghĩa là KHÔNG được phát hành.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var GOC = path.join(__dirname, '..');
var TEP = ['du-lieu.js', 'du-lieu-daotao.js', 'du-lieu-vanhanh.js', 'du-lieu-kythuat.js',
           'du-lieu-chuyenmon.js', 'du-lieu-congdong.js', 'du-lieu-thuvien.js',
           'du-lieu-trainghiem.js', 'du-lieu-giatri.js', 'du-lieu-tincay.js',
           'du-lieu-thuonghieu.js', 'du-lieu-banquyen.js',
           'du-lieu-camtay.js', 'du-lieu-tracuu.js', 'du-lieu-quyen.js',
           'quyen.js', 'man-hinh.js', 'nen/dan-xuat.js', 'nen/so-lieu.js', 'nen/dau-ban.js'];
var MAY = [];

var loi = [], canh = [];
function L(m) { loi.push(m); }
function C(m) { canh.push(m); }

/* ── nạp kho trong hộp cát ───────────────────────────── */
var hop = { window: {}, localStorage: null, document: null, location: null };
hop.window.window = hop.window;
vm.createContext(hop);
TEP.concat(MAY).forEach(function (t) {
  var p = path.join(GOC, t);
  if (!fs.existsSync(p)) { L('Thiếu tệp kho: ' + t); return; }
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), hop, { filename: t }); }
  catch (x) { L('Kho ' + t + ' không nạp được: ' + x.message); }
});
var G = hop.window.GV;
if (!G) { console.error('KHÔNG NẠP ĐƯỢC KHO. Dừng.'); process.exit(2); }

/* ── danh sách loại khối lấy thẳng từ lớp giao diện ──── */
var gd = fs.readFileSync(path.join(GOC, 'giao-dien.js'), 'utf8');
var LOAI = {};
(gd.match(/K\.([a-zA-Z0-9_]+)\s*=\s*function/g) || []).forEach(function (m) {
  LOAI[m.replace(/K\.|\s*=\s*function/g, '')] = true;
});
if (!Object.keys(LOAI).length) L('Không đọc được loại khối nào từ giao-dien.js');

/* ── 1. điều hướng ↔ màn hình ────────────────────────── */
var trongNav = {}, demNav = 0, trung = [];
(G.NHOM || []).forEach(function (n) {
  if (!n.id || !n.no || !n.t) L('Nhóm thiếu trường: ' + JSON.stringify(n).slice(0, 60));
  if (!/^#[0-9A-Fa-f]{6}$/.test(n.mau || '')) L('Nhóm ' + n.t + ' có mã màu sai: ' + n.mau);
  (n.ds || []).forEach(function (i) {
    demNav++;
    if (trongNav[i.v]) trung.push(i.v);
    trongNav[i.v] = n;
    if (!G.MAN[i.v]) L('Điều hướng trỏ tới màn không tồn tại: ' + i.v);
    if (!i.t || !i.h) L('Mục điều hướng thiếu tên hoặc gợi ý: ' + i.v);
  });
});
trung.forEach(function (v) { L('Mã màn xuất hiện hai lần trong điều hướng: ' + v); });
Object.keys(G.MAN || {}).forEach(function (v) {
  if (!trongNav[v]) L('Màn có trong kho nhưng không có trong điều hướng: ' + v);
});

/* ── 2. từng màn ─────────────────────────────────────── */
var dungTu = {};
function quetChuoi(o, duong) {
  if (typeof o === 'string') {
    if (o.trim() === '') L('Chuỗi rỗng tại ' + duong);
    if (/(\bTODO\b|\bFIXME\b|\bXXX\b|đang cập nhật|sắp ra mắt|nội dung sẽ bổ sung)/.test(o))
      L('Chữ tạm tại ' + duong + ': ' + o.slice(0, 50));
  } else if (Array.isArray(o)) {
    /* cho/cam trong bảng ghi đè được phép rỗng — rỗng nghĩa là
       "vai này không cấp thêm gì" chứ không phải quên điền */
    if (!o.length && !/\.(cho|cam)$/.test(duong)) L('Mảng rỗng tại ' + duong);
    o.forEach(function (x, i) { quetChuoi(x, duong + '[' + i + ']'); });
  } else if (o && typeof o === 'object') {
    Object.keys(o).forEach(function (k) { quetChuoi(o[k], duong + '.' + k); });
  }
}

Object.keys(G.MAN || {}).forEach(function (v) {
  var m = G.MAN[v];
  ['k', 't', 'khoi'].forEach(function (f) { if (!m[f]) L('Màn ' + v + ' thiếu trường ' + f); });
  if (!m.p) C('Màn ' + v + ' không có câu dẫn (p)');
  if (!m.q) L('Màn ' + v + ' CHƯA GẮN QUYỀN (q)');
  else if (!G.QUYEN_MAX || !(m.q in G.QUYEN_MAX)) L('Màn ' + v + ' gắn quyền lạ: ' + m.q);
  if (m.bac && !/^B[1-6]$/.test(m.bac)) L('Màn ' + v + ' có bậc tối thiểu lạ: ' + m.bac);
  (m.khoi || []).forEach(function (o, i) {
    var d = v + '.khoi[' + i + ']';
    if (!o.k) { L(d + ' thiếu loại khối'); return; }
    if (!LOAI[o.k]) L(d + ' dùng loại khối không tồn tại: ' + o.k);
    if (o.tu) {
      dungTu[o.tu] = true;
      if (!(o.tu in G.TU)) { L(d + ' trỏ tới khoá tra không có: ' + o.tu); return; }
      var dl = G.TU[o.tu];
      if (dl == null || (Array.isArray(dl) && !dl.length)) L(d + ' lấy dữ liệu rỗng: ' + o.tu);
      if (o.k === 'bang' && Array.isArray(dl)) {
        dl.forEach(function (h, j) {
          if (!Array.isArray(h)) L(d + ' bảng có dòng không phải mảng (dòng ' + j + ')');
          else if (h.length !== o.cot.length)
            L(d + ' bảng lệch cột: đầu bảng ' + o.cot.length + ' ô, dòng ' + j + ' có ' + h.length);
        });
      }
    } else if (o.k === 'bang' && o.hang) {
      o.hang.forEach(function (h, j) {
        if (h.length !== o.cot.length) L(d + ' bảng tay lệch cột ở dòng ' + j);
      });
    } else if (!o.ds && !o.t && o.k !== 'muc' && o.k !== 'phamvi' && o.k !== 'an' && o.k !== 'chimuc') {
      C(d + ' không có tu, ds hay t');
    }
  });
});

/* ── 3. khoá tra mồ côi ────────────────────────────────
      Từ khi nen/dan-xuat.js để mọi kho tự đăng ký, phần lớn khoá
      tra là tự động — và nhiều khoá tự động chỉ được dùng GIÁN
      TIẾP qua một khoá có biến đổi (TC_BAN_DO → TC_BAN_DO_L).
      Nên phân biệt: khoá KHAI TAY mà không màn nào dùng là lỗi
      chép thừa; khoá TỰ ĐỘNG mà không nơi nào chạm tới là NỘI
      DUNG CHẾT — viết ra rồi không ai đọc. */
var vanMan = ['man-hinh.js', 'nen/dan-xuat.js'].map(function (t) {
  return fs.readFileSync(path.join(GOC, t), 'utf8');
}).join('\n');
Object.keys(G.TU || {}).forEach(function (k) {
  if (dungTu[k]) return;
  if ((G.TU_TU_DONG || {})[k]) {
    if (vanMan.indexOf('GV.' + k) < 0 && vanMan.indexOf('G.' + k) < 0)
      C('NỘI DUNG CHẾT: kho có ' + k + ' nhưng không màn nào dựng ra nó');
    return;
  }
  C('Khoá tra khai tay mà không màn nào dùng: ' + k);
});

/* ── 4. mã màu trong kho ─────────────────────────────── */
function quetMau(o, duong) {
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(function (k) {
      if (k === 'mau' && typeof o[k] === 'string' && !/^#[0-9A-Fa-f]{6}$/.test(o[k]))
        L('Mã màu sai định dạng tại ' + duong + '.' + k + ': ' + o[k]);
      else quetMau(o[k], duong + '.' + k);
    });
  }
}
Object.keys(G).forEach(function (k) {
  if (k === 'MAN' || k === 'TU' || k === 'NHOM') return;
  quetMau(G[k], 'GV.' + k);
});

/* ── 5. quét chuỗi rỗng và chữ tạm trên toàn kho ─────── */
Object.keys(G).forEach(function (k) {
  if (k === 'TU') return;               /* TU chỉ là bản chiếu của kho */
  quetChuoi(G[k], 'GV.' + k);
});

/* ── 6. phân quyền ───────────────────────────────────── */
if (!G.VAI || !G.QUYEN_MAX) {
  L('Chưa có bảng vai hoặc bảng quyền (du-lieu-quyen.js)');
} else {
  var maVai = {};
  G.VAI.forEach(function (r) {
    if (maVai[r.ma]) L('Mã vai trùng: ' + r.ma);
    maVai[r.ma] = r;
    if (typeof r.lv !== 'number') L('Vai ' + r.ma + ' thiếu bậc lv');
    if (!r.t || !r.ln) L('Vai ' + r.ma + ' thiếu tên hoặc mô tả');
  });
  if (typeof G.duocPhep !== 'function') L('Chưa nạp được bộ máy quyền (quyen.js)');
  /* Đếm bằng CHÍNH bộ máy mà ứng dụng dùng — không tính lại theo cách
     riêng, vì hai chỗ tính khác nhau là hai chỗ sẽ lệch nhau. */
  var demVai = {};
  G.VAI.forEach(function (r) {
    var d = G.demMan(r.ma, 'B1');
    demVai[r.ma] = d;
    if (d === 0) L('Vai ' + r.ma + ' (' + r.t + ') không mở được màn nào');
  });
  /* vai theo bậc: bậc cao phải mở nhiều hơn hoặc bằng bậc thấp */
  G.VAI.filter(function (r) { return r.theoBac; }).forEach(function (r) {
    var truoc = -1;
    G.BAC_MO.forEach(function (b) {
      var d = G.demMan(r.ma, b.bac);
      if (d < truoc) L('Vai ' + r.ma + ' bậc ' + b.bac + ' mở ÍT hơn bậc trước (' + d + ' < ' + truoc + ')');
      truoc = d;
    });
  });
  var tong = Object.keys(G.MAN).length;
  if (demVai.R01 !== tong) L('Super Admin phải thấy toàn bộ ' + tong + ' màn, hiện thấy ' + demVai.R01);
  /* đối chiếu tỉ lệ mong muốn */
  (G.TY_LE || []).forEach(function (r) {
    r.vai.forEach(function (ma) {
      var that = Math.round(demVai[ma] / tong * 100);
      if (Math.abs(that - r.pt) > 3)
        L('Vai ' + ma + ' mở ' + that + '% số màn, bảng TY_LE ghi ' + r.pt + '% (lệch quá 3 điểm)');
    });
  });
  /* mọi quyền khai báo phải được ít nhất một màn dùng */
  var dungQ = {};
  Object.keys(G.MAN).forEach(function (v) { dungQ[G.MAN[v].q] = true; });
  Object.keys(G.QUYEN_MAX).forEach(function (q) {
    if (!dungQ[q]) C('Quyền khai báo nhưng không màn nào dùng: ' + q);
  });
}

/* ── 6b. Thư viện: số chân dung khai báo phải khớp số thật ── */
if (G.TV_QUYEN) {
  var maQ = ['TV_Q1', 'TV_Q2', 'TV_Q3', 'TV_Q4', 'TV_Q5', 'TV_Q6'];
  G.TV_QUYEN.forEach(function (q, i) {
    var that = (G[maQ[i]] || []).length;
    if (q.so !== that)
      L('Thư viện: ' + q.q + ' khai ' + q.so + ' chân dung nhưng kho có ' + that);
  });
  maQ.forEach(function (k2) {
    (G[k2] || []).forEach(function (n, j) {
      ['ten', 'nam', 'danh', 'viec', 'quyet', 'mothuc', 'tru', 'pc', 'lam', 'hoi'].forEach(function (f) {
        if (!n[f]) L('Chân dung ' + k2 + '[' + j + '] (' + (n.ten || '?') + ') thiếu trường ' + f);
      });
    });
  });
}

/* ── 6c. Trải nghiệm · giá trị · tin cậy: đủ trường bắt buộc ── */
var TRUONG = {
  TN_HANH_TRINH: ['ma', 't', 'khi', 'nghi', 'so', 'lam', 'vat', 'roi', 'cuu', 'mau'],
  TN_KHOANH_KHAC: ['so', 't', 'thuong', 'minh', 'do'],
  TN_CAM_KET: ['ma', 'hua', 'do', 'nguong', 'den'],
  TN_HIEN_VAT: ['t', 'khi', 'ai', 'cach', 'vi'],
  TN_PHUC_HOI: ['b', 't', 'ai', 'n', 'ra'],
  TN_NGHI: ['t', 'dh', 'can', 'lam', 'bay', 'mau'],
  TN_DO_CAM: ['mau', 'b', 'n', 'lam', 'cham'],
  GT_GOI: ['ma', 't', 'cho', 'gom', 'nhip', 'cam', 'khong', 'mau'],
  GT_BAO_DAM: ['t', 'dk', 'duoc', 'ai', 'gioi', 'mau'],
  GT_PHEU: ['b', 't', 'ai', 'n', 'ra'],
  GT_PHAN_DOI: ['t', 'sau', 'hoi', 'noi', 'khong', 'mau'],
  GT_NHA_TRUONG: ['t', 'dh', 'can', 'lam', 'bay', 'mau'],
  GT_NHAN_RONG: ['t', 'dh', 'can', 'lam', 'bay', 'mau'],
  TC_TANG_BC: ['so', 't', 'n', 'v'],
  TC_THIET_KE: ['b', 't', 'ai', 'n', 'ra'],
  TC_THEO_DOI: ['m', 't', 'v'],
  TC_KHUNG_HOANG: ['t', 'dau', 'phanh'],
  TC_24H: ['b', 't', 'ai', 'n', 'ra']
};
Object.keys(TRUONG).forEach(function (k2) {
  var kho = G[k2];
  if (!Array.isArray(kho)) { L('Kho ' + k2 + ' thiếu hoặc không phải mảng'); return; }
  if (!kho.length) L('Kho ' + k2 + ' rỗng');
  kho.forEach(function (x, j) {
    TRUONG[k2].forEach(function (f) {
      var v2 = x[f];
      if (v2 == null || v2 === '' || (Array.isArray(v2) && !v2.length))
        L('Kho ' + k2 + '[' + j + '] thiếu trường ' + f);
    });
  });
});

/* Mỗi cam kết dịch vụ phải có thứ ĐỀN — một lời hứa không có thứ
   đền chỉ là một câu quảng cáo. Đây là luật của cả chương. */
(G.TN_CAM_KET || []).forEach(function (x) {
  if (!x.den || x.den.length < 15)
    L('Cam kết ' + x.ma + ' chưa ghi rõ đền gì khi không giữ được');
});

/* Mỗi gói phải nói được nó KHÔNG hợp với ai. */
(G.GT_GOI || []).forEach(function (x) {
  if (!x.khong || x.khong.indexOf('Không phù hợp') < 0)
    L('Gói ' + x.ma + ' chưa nói rõ không phù hợp với ai');
});

/* Câu hỏi thường gặp: đủ nhóm, mỗi câu có hỏi và có đáp. */
if (G.TC_FAQ) {
  if (G.TC_FAQ.length < 6) L('TC_FAQ chỉ có ' + G.TC_FAQ.length + ' nhóm, cần đủ sáu nhóm người hỏi');
  G.TC_FAQ.forEach(function (n) {
    if (!n.nhom || !Array.isArray(n.ds) || !n.ds.length) L('TC_FAQ có nhóm rỗng');
    (n.ds || []).forEach(function (x, j) {
      if (!x.h || !x.d) L('TC_FAQ · ' + n.nhom + '[' + j + '] thiếu câu hỏi hoặc câu trả lời');
    });
  });
}

/* Sổ ghi lỗi: cột cuối (luật sinh ra từ lỗi) không được để trống —
   lỗi không sinh ra luật mới thì sẽ lặp lại. */
(G.TC_LOI_MAU || []).forEach(function (r, j) {
  if (r.length !== 4) L('TC_LOI_MAU[' + j + '] không đủ bốn cột');
  if (!r[3]) L('TC_LOI_MAU[' + j + '] chưa ghi luật sinh ra từ lỗi này');
});

/* ── 6d. Nhận diện thương hiệu và bản quyền ───────────────
      Khối "ansai" VẼ tám hình sai, còn kho TH_AN_SAI giữ tám chú
      thích. Hai danh sách này nằm ở hai tệp khác nhau nên rất dễ
      lệch nhau khi sửa một bên — và lệch thì hình số 7 mang chú
      thích của cách sai số 8. Đếm và so. */
var mSai = /var kieu = \[([\s\S]*?)\n    \];/.exec(
  fs.readFileSync(path.join(GOC, 'giao-dien.js'), 'utf8'));
if (!mSai) L('Không tìm thấy danh sách hình vẽ của khối ansai trong giao-dien.js');
else {
  var soHinh = (mSai[1].match(/\{\s*(s:|a:|nen:)/g) || []).length;
  var soChu = (G.TH_AN_SAI || []).length;
  if (soHinh !== soChu)
    L('Ấn: khối ansai vẽ ' + soHinh + ' hình nhưng kho TH_AN_SAI có ' +
      soChu + ' chú thích — hình và chú thích sẽ lệch nhau');
}
(G.TH_AN_SAI || []).forEach(function (r, j) {
  if (!Array.isArray(r) || r.length !== 2 || !r[0] || !r[1])
    L('TH_AN_SAI[' + j + '] phải có đúng hai cột: tên cách sai và vì sao sai');
});

/* Mọi mã màu trong bảng nhận diện phải đúng dạng #rrggbb, và mã
   trong cột hex phải TRÙNG mã dùng để tô ô màu — lệch một chữ là
   nhà in nhận sai màu. */
(G.TH_MAU || []).forEach(function (x) {
  ['t', 'hex', 'rgb', 'cmyk', 'pantone', 'vai', 'tp', 'mau'].forEach(function (f) {
    if (!x[f]) L('Bảng màu · ' + (x.t || '?') + ' thiếu trường ' + f);
  });
  if (!/^#[0-9A-Fa-f]{6}$/.test(x.hex || ''))
    L('Bảng màu · ' + x.t + ': mã "' + x.hex + '" không đúng dạng #rrggbb');
  if (x.hex !== x.mau)
    L('Bảng màu · ' + x.t + ': cột mã ghi ' + x.hex + ' nhưng ô màu tô ' + x.mau);
});

/* Ánh xạ sang chuẩn quốc gia phải phủ ĐỦ mười hai trục — thiếu một
   trục là một câu hỏi bỏ ngỏ trước hội đồng thẩm định. */
if (G.BQ_ANH_XA_NL && G.TRU) {
  var truHe = [];
  G.TRU.forEach(function (t) { t.truc.forEach(function (x) { truHe.push(t.k + x.so); }); });
  var daAnh = G.BQ_ANH_XA_NL.map(function (r) { return String(r[0]).split(' ')[0]; });
  truHe.forEach(function (m) {
    if (daAnh.indexOf(m) < 0) L('Ánh xạ chuẩn quốc gia thiếu trục ' + m);
  });
  if (G.BQ_ANH_XA_NL.length !== truHe.length)
    L('Ánh xạ chuẩn: có ' + G.BQ_ANH_XA_NL.length + ' dòng nhưng hệ có ' + truHe.length + ' trục');
  ['Tự chủ và tự học', 'Giao tiếp và hợp tác', 'Giải quyết vấn đề và sáng tạo'].forEach(function (nl) {
    var co = G.BQ_ANH_XA_NL.some(function (r) { return String(r[2]).indexOf(nl) > -1; });
    if (!co) L('Ánh xạ chuẩn: không trục nào phủ năng lực chung “' + nl + '”');
  });
}
if (G.BQ_ANH_XA_PC && G.PHAM_CHAT && G.BQ_ANH_XA_PC.length !== G.PHAM_CHAT.length)
  L('Ánh xạ phẩm chất: có ' + G.BQ_ANH_XA_PC.length + ' dòng nhưng hệ có ' +
    G.PHAM_CHAT.length + ' phẩm chất');

/* Kho bản quyền phải luôn mở đầu bằng ranh giới của tài liệu —
   đây là tài liệu chuẩn bị hồ sơ, không phải tư vấn pháp lý. */
if (!G.BQ_RANH_GIOI || G.BQ_RANH_GIOI.length < 3)
  L('Kho bản quyền thiếu phần ranh giới: phải nói rõ đây không phải tư vấn pháp lý');
else if (!G.BQ_RANH_GIOI.join(' ').match(/không phải tư vấn pháp lý/))
  L('Kho bản quyền: phần ranh giới chưa nói rõ “không phải tư vấn pháp lý”');

/* ── 6e. LỜI HỨA TREO ─────────────────────────────────────
      Loại lỗi khó thấy nhất trong một hệ tài liệu lớn: kho nhắc
      tới một hiện vật ("bộ bảy câu hỏi bàn ăn", "Sổ Chuẩn") nhiều
      lần như thể nó có thật, mà không chỗ nào giao nội dung của
      nó. Người đọc đi tìm và không thấy — và một hệ dạy trẻ
      "hứa thì phải giữ" mà tự nó hứa suông thì mất nhiều hơn là
      thiếu một trang.
      Luật: mỗi hiện vật dưới đây phải có MỘT màn mang tên nó
      trong tiêu đề, hoặc một khoá tra mang nội dung của nó. */
var HUA = [
  ['bảy câu hỏi bàn ăn', 'CT_BAY_CAU'],
  ['bản đọc ca', 'CT_DOC_CA'],
  ['Sổ Chuẩn', 'TC_SO_CHUAN_LA'],
  ['sổ phục hồi', 'CT_SO_PHUC_HOI'],
  ['Goal Map', 'CT_GOAL_MAP'],
  ['bản đồ cá nhân', 'CT_BAN_DO_11'],
  ['thư tuần', 'CT_THU'],
  ['thư tay', 'CT_THU'],
  ['giáo án', 'CT_GIAO_AN'],
  ['bảng số bảy cột', 'CLB_BANGSO'],
  ['sổ ghế', 'BIEU_MAU'],
  ['hộ chiếu nhân tài', 'HO_CHIEU_JSON']
];
var vanKho = TEP.map(function (t) {
  return fs.readFileSync(path.join(GOC, t), 'utf8');
}).join('\n');
HUA.forEach(function (h) {
  var soNhac = (vanKho.match(new RegExp(h[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
  if (!soNhac) return;                       /* không nhắc thì không nợ */
  var coKho = G.TU && (h[1] in G.TU);
  if (!coKho)
    L('LỜI HỨA TREO: kho nhắc “' + h[0] + '” ' + soNhac +
      ' lần nhưng không có khoá tra ' + h[1] + ' giao nội dung của nó');
});

/* Mỗi khối trong nhóm "cầm lên dùng được" phải THẬT SỰ dùng được:
   thư mẫu phải có bản viết sẵn, kịch bản phải có lời mở và lời cấm,
   giáo án phải có lời Coach nói. Mô tả suông thì không tính. */
(G.CT_THU || []).forEach(function (x) {
  if (!x.vd || x.vd.length < 120)
    L('Thư mẫu ' + x.ma + ' chưa có bản viết sẵn đủ dài để dùng thẳng');
  if (!x.cam) L('Thư mẫu ' + x.ma + ' chưa ghi điều không được làm');
});
(G.CT_KICH_BAN || []).forEach(function (x) {
  ['mo', 'ket', 'cam'].forEach(function (f) {
    if (!x[f]) L('Kịch bản gọi ' + x.ma + ' thiếu trường ' + f);
  });
  if (!Array.isArray(x.giua) || x.giua.length < 3)
    L('Kịch bản gọi ' + x.ma + ' phải có đủ ba câu giữa');
});
(G.CT_GIAO_AN || []).forEach(function (x, j) {
  ['p', 't', 'ai', 'n', 'loi', 'hong'].forEach(function (f) {
    if (!x[f]) L('Giáo án khối ' + (x.p || j) + ' thiếu trường ' + f);
  });
});
if (G.CT_GIAO_AN) {
  var tongPhut = 0;
  G.CT_GIAO_AN.forEach(function (x) {
    var m2 = /^(\d+)[–-](\d+)$/.exec(String(x.p).trim());
    if (m2) tongPhut = Math.max(tongPhut, Number(m2[2]));
  });
  if (tongPhut !== 90)
    L('Giáo án: khối cuối kết thúc ở phút ' + tongPhut + ', phải là 90');
}
/* Bảng chấm chi tiết phải cộng đúng 100 và khớp bảng cổng gốc. */
if (G.CT_CHAM && G.CONG) {
  var tongD = 0;
  G.CT_CHAM.forEach(function (x) { tongD += x.d; });
  if (tongD !== 100) L('Bảng chấm chi tiết cộng ra ' + tongD + ' điểm, phải là 100');
  if (G.CT_CHAM.length !== G.CONG.bang.length)
    L('Bảng chấm chi tiết có ' + G.CT_CHAM.length + ' cột nhưng cổng gốc có ' + G.CONG.bang.length);
  G.CONG.bang.forEach(function (c3, j) {
    var x = G.CT_CHAM[j];
    if (!x) return;
    if (x.t !== c3.t) L('Bảng chấm cột ' + j + ': “' + x.t + '” lệch với cổng gốc “' + c3.t + '”');
    if (x.d !== c3.d) L('Bảng chấm cột “' + x.t + '”: ' + x.d + ' điểm, cổng gốc ghi ' + c3.d);
    if (!Array.isArray(x.muc) || x.muc.length < 4)
      L('Bảng chấm cột “' + x.t + '” phải có đủ bốn mức');
  });
}

/* ── 6g. HỆ NÓI VỀ CHÍNH NÓ CÓ ĐÚNG KHÔNG ─────────────────
      Tiêu đề viết "Mười hai khoảnh khắc", kho giữ mảng khoảnh khắc.
      Hai thứ ở hai tệp, không gì buộc chúng khớp. Thêm mục thứ mười
      ba thì tiêu đề thành nói dối — một lời nói dối rất nhỏ, rất khó
      thấy, và chính vì thế mà nó sống lâu. nen/so-lieu.js đọc số
      viết bằng chữ rồi đối chiếu với độ dài mảng thật. */
if (typeof G.doiChieuSo === 'function') {
  G.doiChieuSo().forEach(function (m4) { L('SỐ LỆCH: ' + m4); });
}

/* ── 6f. VA CHẠM TÊN GIỮA CÁC KHO ─────────────────────────
      Mọi kho cùng ghi vào một đối tượng GV. Hai kho đặt cùng một
      tên thì kho nạp sau ĐÈ kho trước, im lặng, không báo gì —
      và màn dùng tên ấy dựng ra nội dung rỗng. Đã xảy ra thật một
      lần với tên VAI, và không lớp kiểm nào trước đây thấy được,
      vì màn vẫn dựng ra đủ thẻ, chỉ là thẻ không có chữ. */
var datTen = {};
/* Chỉ soi các KHO NỘI DUNG. Tầng nền cố ý gộp thêm vào GV.TU
   (G.TU = G.TU || {}) — đó là gộp, không phải đè. */
TEP.filter(function (t) { return /^du-lieu.*\.js$/.test(t); }).forEach(function (t) {
  var van = fs.readFileSync(path.join(GOC, t), 'utf8');
  var re2 = /^[ \t]*(?:G|GV)\.([A-Z][A-Z0-9_]*)[ \t]*=/gm, m3;
  while ((m3 = re2.exec(van))) {
    (datTen[m3[1]] = datTen[m3[1]] || []).push(t);
  }
});
Object.keys(datTen).forEach(function (k) {
  var ds3 = datTen[k].filter(function (x, i, a) { return a.indexOf(x) === i; });
  if (ds3.length > 1)
    L('VA CHẠM TÊN: ' + ds3.join(' và ') + ' cùng đặt GV.' + k +
      ' — kho nạp sau đè kho trước, âm thầm');
});

/* ── 7. vỏ và bộ gộp phải nạp đủ tệp ─────────────────── */
var html = fs.readFileSync(path.join(GOC, 'index.html'), 'utf8');
TEP.concat(['giao-dien.js']).forEach(function (t) {
  if (html.indexOf(t) < 0) L('index.html chưa nạp ' + t);
});
var goi = fs.readFileSync(path.join(GOC, 'dong-goi-artifact.cjs'), 'utf8');
TEP.concat(['giao-dien.js']).forEach(function (t) {
  if (goi.indexOf(t) < 0) L('dong-goi-artifact.cjs chưa gộp ' + t);
});
if (html.indexOf('Content-Security-Policy') < 0) L('index.html chưa đặt Content-Security-Policy');

/* ── 8. lớp giao diện: những thứ không được có ───────── */
if (/\beval\s*\(|new Function\s*\(/.test(gd)) L('giao-dien.js có eval hoặc new Function');
if (/document\.write/.test(gd)) L('giao-dien.js có document.write');
/* mọi biểu thức nội suy vào HTML phải qua e() hoặc dm() */
/* Chỉ soi những chỗ nội suy một TRƯỜNG DỮ LIỆU (có dấu chấm) mà không
   đi qua e(), dm(), mau() hay ds(). Số đếm cục bộ và .length thì tha. */
var noiSuy = gd.match(/'\s*\+\s*(?!e\(|dm\(|mau\(|ds\()[A-Za-z_][A-Za-z0-9_]*\.[A-Za-z0-9_.]+\s*\+\s*'/g) || [];
noiSuy.filter(function (m) { return !/\.length/.test(m); })
      .forEach(function (m) { L('Trường dữ liệu vào HTML mà chưa thoát ký tự: ' + m.trim()); });

/* ── LỚP CHẠY — mở bằng trình duyệt thật ─────────────── */
function lopChay(xong) {
  var pw;
  try { pw = require('/opt/node22/lib/node_modules/playwright'); }
  catch (x) { try { pw = require('playwright'); } catch (y) {
    C('Không có playwright — bỏ qua lớp chạy. Cài rồi chạy lại trước khi phát hành thật.');
    return xong();
  } }
  var duong = 'file://' + path.join(GOC, 'index.html');
  pw.chromium.launch().then(function (b) {
    return b.newPage({ viewport: { width: 1400, height: 1000 } }).then(function (p) {
      var loiJs = [];
      p.on('pageerror', function (er) { loiJs.push(er.message); });
      return p.goto(duong, { waitUntil: 'domcontentloaded' }).then(function () {
        /* 1. mọi màn dựng được, với vai Super Admin */
        return p.evaluate(async function () {
          var G = window.GV, xau = [];
          var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
          var ds = Object.keys(G.MAN);
          for (var i = 0; i < ds.length; i++) {
            location.hash = ds[i];
            await nhip();
            var m = document.querySelector('.chinh');
            var t = m.innerText || '';
            if (t.length < 400) xau.push(ds[i] + ' dựng ra chỉ ' + t.length + ' ký tự');
            if (/thiếu loại khối|undefined|\[object Object\]/.test(m.innerHTML))
              xau.push(ds[i] + ' có dấu hiệu dựng hỏng');
            /* KHỐI RỖNG — một khối dựng ra đủ khung nhưng không có
               chữ. Cả màn vẫn dài, nên phép đo tổng ký tự ở trên
               không thấy. Đây chính là dấu hiệu của va chạm tên
               giữa hai kho: dữ liệu bị đè, khung vẫn vẽ ra. */
            var oCon = m.querySelectorAll('.the, .mt, .cd4, .goi, .bd, .pd-h, .nv, ' +
                                          '.qs, .ht-c, .kb article, .tm article, .ga-h');
            var rong = 0;
            for (var q = 0; q < oCon.length; q++) {
              if ((oCon[q].innerText || '').replace(/\s/g, '').length < 12) rong++;
            }
            if (rong > 0)
              xau.push(ds[i] + ' có ' + rong + '/' + oCon.length + ' khối dựng ra RỖNG');
          }
          return xau;
        });
      }).then(function (xau) {
        console.log('LỚP CHẠY  · dựng thử ' + Object.keys(G.MAN).length + ' màn với vai Super Admin');
        xau.forEach(function (m) { L('Lớp chạy: ' + m); });
        /* 2. CỔNG: vào thẳng bằng hash một màn ngoài quyền phải ra thẻ khoá */
        return p.evaluate(async function () {
          var G = window.GV, hong = [];
          var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
          var thu = [['R16', 'B1'], ['R16', 'B4'], ['R15', 'B1'], ['R17', 'B1'],
                     ['R14', 'B1'], ['R13', 'B1'], ['R05', 'B1'], ['R12', 'B1']];
          for (var i = 0; i < thu.length; i++) {
            var vai = thu[i][0], bac = thu[i][1];
            localStorage.setItem('genviet365.vai', vai);
            localStorage.setItem('genviet365.bac', bac);
            location.hash = '';
            window.GVdung(document.getElementById('ung-dung'));
            await nhip();
            var ds = Object.keys(G.MAN);
            for (var j = 0; j < ds.length; j++) {
              var v = ds[j];
              if (G.duocPhep(vai, bac, v)) continue;
              location.hash = v;
              await nhip();
              var m = document.querySelector('.chinh');
              if (!m.querySelector('.the.khoa'))
                hong.push(vai + '/' + bac + ' vào được ' + v + ' mà không bị khoá');
              if (m.querySelectorAll('table, .bso, .clg, .lt, .thap, .vong').length)
                hong.push(vai + '/' + bac + ' thấy nội dung của ' + v + ' dù bị khoá');
              if (document.querySelector('.muc a[data-v="' + v + '"]'))
                hong.push(vai + '/' + bac + ' vẫn còn mục ' + v + ' trong mục lục');
            }
          }
          localStorage.removeItem('genviet365.vai');
          localStorage.removeItem('genviet365.bac');
          localStorage.removeItem('genviet365.man');
          return hong;
        });
      }).then(function (hong) {
        var thuVai = [['R16','B1'],['R16','B4'],['R15','B1'],['R17','B1'],
                      ['R14','B1'],['R13','B1'],['R05','B1'],['R12','B1']];
        var soLan = 0;
        thuVai.forEach(function (c2) {
          Object.keys(G.MAN).forEach(function (v) { if (!G.duocPhep(c2[0], c2[1], v)) soLan++; });
        });
        console.log('CỔNG      · thử vào thẳng ' + soLan + ' màn ngoài quyền, trên ' +
                    thuVai.length + ' cấu hình vai · ' + (hong.length ? hong.length + ' chỗ lọt' : 'không chỗ nào lọt'));
        hong.slice(0, 12).forEach(function (m) { L('CỔNG PHÂN QUYỀN: ' + m); });
        if (hong.length > 12) L('CỔNG PHÂN QUYỀN: và ' + (hong.length - 12) + ' lỗi nữa');
        return null;
      }).then(function () {
        /* 2b. Ô TÌM không được là lối vòng qua cổng. Gõ đúng tiêu đề
           một màn ngoài quyền thì kết quả phải KHÔNG có màn ấy. */
        return p.evaluate(async function () {
          var G = window.GV, hong = [], soThu = 0;
          var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
          var thu = [['R16', 'B1'], ['R15', 'B1'], ['R17', 'B1'], ['R14', 'B1']];
          for (var i = 0; i < thu.length; i++) {
            var vai = thu[i][0], bac = thu[i][1];
            localStorage.setItem('genviet365.vai', vai);
            localStorage.setItem('genviet365.bac', bac);
            location.hash = '';
            window.GVdung(document.getElementById('ung-dung'));
            await nhip();
            var ds = Object.keys(G.MAN);
            for (var j = 0; j < ds.length; j++) {
              var v = ds[j];
              if (G.duocPhep(vai, bac, v)) continue;
              soThu++;
              location.hash = 'tim=' + encodeURIComponent(G.MAN[v].t);
              await nhip();
              var a2 = document.querySelectorAll('.chinh .kq a');
              for (var k = 0; k < a2.length; k++) {
                if (a2[k].getAttribute('href') === '#' + v)
                  hong.push(vai + '/' + bac + ' tìm ra ' + v + ' dù không có quyền');
              }
            }
          }
          localStorage.removeItem('genviet365.vai');
          localStorage.removeItem('genviet365.bac');
          localStorage.removeItem('genviet365.man');
          return { hong: hong, so: soThu };
        });
      }).then(function (r2) {
        console.log('Ô TÌM     · gõ đúng tiêu đề ' + r2.so + ' màn ngoài quyền, trên 4 cấu hình vai · ' +
                    (r2.hong.length ? r2.hong.length + ' chỗ lọt' : 'không chỗ nào lọt'));
        r2.hong.slice(0, 8).forEach(function (m) { L('Ô TÌM LỌT QUYỀN: ' + m); });
        /* 3. tràn ngang ở ba khổ */
        var kho = [[1400, 1000], [900, 800], [390, 844]];
        var buoc = Promise.resolve([]);
        kho.forEach(function (k) {
          buoc = buoc.then(function (acc) {
            return p.setViewportSize({ width: k[0], height: k[1] }).then(function () {
              return p.evaluate(async function (rong) {
                var G = window.GV, xau = [];
                var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
                var ds = Object.keys(G.MAN);
                for (var i = 0; i < ds.length; i++) {
                  location.hash = ds[i];
                  await nhip();
                  if (document.documentElement.scrollWidth > window.innerWidth + 1)
                    xau.push(ds[i] + ' tràn ngang ở khổ ' + rong);
                }
                return xau;
              }, k[0]).then(function (x) { return acc.concat(x); });
            });
          });
        });
        return buoc;
      }).then(function (tran) {
        console.log('KHỔ MÀN   · soi tràn ngang ở 1400, 900 và 390 điểm ảnh');
        tran.slice(0, 8).forEach(function (m) { L('Lớp chạy: ' + m); });
        loiJs.forEach(function (m) { L('Lỗi JS khi chạy: ' + m); });

        /* 4. TƯƠNG PHẢN — mọi mã màu chữ phải đạt WCAG AA (4.5:1) trên
              nền của chính chế độ ấy, ở CẢ hai chế độ sáng và tối. Màu
              chữ không đủ tương phản là một lỗi loại trừ người đọc, và
              nó trôi vào kho rất dễ vì trên màn hình đẹp thì trông vẫn ổn. */
        var TOKEN = ['--muc', '--muc2', '--muc3', '--son', '--do', '--xanh', '--vang', '--cam'];
        function doTP(che) {
          return b.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: che })
            .then(function (p2) {
              return p2.goto('file://' + path.join(GOC, 'index.html'))
                .then(function () { return p2.waitForTimeout(150); })
                .then(function () {
                  return p2.evaluate(function (ds) {
                    function sang(r, g, bl) {
                      var f = function (v) {
                        v /= 255;
                        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
                      };
                      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl);
                    }
                    function tuHex(h) {
                      h = h.replace('#', '').trim();
                      return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); });
                    }
                    var nen = getComputedStyle(document.body).backgroundColor.match(/\d+/g).map(Number);
                    var ln = sang(nen[0], nen[1], nen[2]);
                    var cs = getComputedStyle(document.documentElement), ra = [];
                    ds.forEach(function (t) {
                      var v = cs.getPropertyValue(t).trim();
                      if (!/^#[0-9A-Fa-f]{6}$/.test(v)) { ra.push([t, v, -1]); return; }
                      var c = tuHex(v), lc = sang(c[0], c[1], c[2]);
                      var tp = (Math.max(ln, lc) + 0.05) / (Math.min(ln, lc) + 0.05);
                      ra.push([t, v, Math.round(tp * 100) / 100]);
                    });
                    return ra;
                  }, TOKEN);
                })
                .then(function (r) { return p2.close().then(function () { return r; }); });
            });
        }
        return doTP('light').then(function (sang) {
          return doTP('dark').then(function (toi) {
            [['sáng', sang], ['tối', toi]].forEach(function (cap) {
              cap[1].forEach(function (r) {
                if (r[2] < 0) L('Tương phản: ' + r[0] + ' ở chế độ ' + cap[0] +
                                ' không phải mã màu #rrggbb (' + r[1] + ')');
                else if (r[2] < 4.5) L('Tương phản: ' + r[0] + ' ' + r[1] + ' ở chế độ ' + cap[0] +
                                       ' chỉ đạt ' + r[2] + ':1 — dưới ngưỡng WCAG AA 4.5:1');
              });
            });
            console.log('TƯƠNG PHẢN· ' + TOKEN.length + ' mã màu chữ, hai chế độ · ngưỡng WCAG AA 4.5:1');
            return b.close();
          });
        });
      });
    });
  }).then(xong).catch(function (x) { L('Lớp chạy hỏng: ' + x.message); xong(); });
}

/* ── LỚP CẮT — bản phát hành cho vai thấp có thật sự không mang
      theo phần ngoài quyền không ─────────────────────────────── */
function lopCat() {
  var cp = require('child_process');
  var os = require('os');
  var thu = [['R16', 'B1'], ['R16', 'B4'], ['R15', 'B1'], ['R17', 'B1'], ['R14', 'B1']];
  var goi = path.join(GOC, 'dong-goi-artifact.cjs');
  thu.forEach(function (c2) {
    var ra = path.join(os.tmpdir(), 'gv-cat-' + c2[0] + '-' + c2[1] + '.html');
    try {
      cp.execFileSync(process.execPath, [goi, '--vai=' + c2[0], '--bac=' + c2[1], ra],
                      { stdio: 'ignore' });
    } catch (x) { L('Không dựng được bản cắt cho ' + c2[0] + ': ' + x.message); return; }
    var noi = fs.readFileSync(ra, 'utf8');
    /* Một chuỗi có thể xuất hiện hợp lệ trong phần vai này ĐƯỢC thấy
       (ví dụ tên một màn bị khoá được nhắc trong bảng tầng hiển thị,
       hay trong một bảng so sánh mà vai này mở được). Nên không so
       "có hay không", mà so SỐ LẦN: nhiều hơn phần hợp lệ mới là rò. */
    var duocThay = { TANG: G.TANG_HT_UI, VAI: G.VAI, BAC: G.BAC_MO, MAN: {}, TU: {} };
    Object.keys(G.MAN).forEach(function (v) {
      if (!G.duocPhep(c2[0], c2[1], v)) return;
      duocThay.MAN[v] = G.MAN[v];
      (G.MAN[v].khoi || []).forEach(function (o) {
        if (o.tu && (o.tu in G.TU)) duocThay.TU[o.tu] = G.TU[o.tu];
      });
    });
    /* Bộ gộp còn đóng gói THANH ĐIỀU HƯỚNG đã lọc — tên nhóm và câu
       giới thiệu nhóm cũng đi ra theo. Mô hình "nội dung hợp lệ" phải
       khớp đúng thứ bộ gộp thật sự gửi đi, nếu không thì một chữ nằm
       trong câu giới thiệu nhóm sẽ bị báo là rò rỉ. */
    duocThay.NHOM = (G.NHOM || []).map(function (n) {
      return { id: n.id, no: n.no, t: n.t, s: n.s, mau: n.mau,
               ds: (n.ds || []).filter(function (i) { return duocThay.MAN[i.v]; }) };
    }).filter(function (n) { return n.ds.length; });
    var vanHopLe = JSON.stringify(duocThay);
    function dem(chuoi, kim) {
      if (!kim) return 0;
      var d = 0, i = chuoi.indexOf(kim);
      while (i > -1) { d++; i = chuoi.indexOf(kim, i + kim.length); }
      return d;
    }
    function roRi(kim) { return kim && dem(noi, kim) > dem(vanHopLe, kim); }
    var lot = [];
    Object.keys(G.MAN).forEach(function (v) {
      if (G.duocPhep(c2[0], c2[1], v)) return;
      var m = G.MAN[v];
      if (roRi(m.t)) lot.push('tiêu đề màn ' + v);
      (m.khoi || []).forEach(function (o) {
        if (!o.tu || !(o.tu in G.TU)) return;
        var dl = G.TU[o.tu], mau1 = null;
        if (Array.isArray(dl) && dl.length) {
          var d0 = dl[0];
          if (Array.isArray(d0)) mau1 = d0[0];
          else if (typeof d0 === 'string') mau1 = d0;
          else if (d0 && typeof d0 === 'object') {
            var kk = Object.keys(d0).filter(function (x) {
              return typeof d0[x] === 'string' && d0[x].length > 25;
            });
            if (kk.length) mau1 = d0[kk[0]];
          }
        } else if (typeof dl === 'string') mau1 = dl.slice(0, 60);
        if (mau1 && mau1.length > 25 && roRi(mau1)) lot.push('dữ liệu ' + o.tu);
      });
    });
    var da = {};
    lot = lot.filter(function (x) { if (da[x]) return false; da[x] = 1; return true; });
    if (lot.length) {
      lot.slice(0, 6).forEach(function (x) {
        L('RÒ RỈ BẢN CẮT ' + c2[0] + '/' + c2[1] + ': tệp vẫn chứa ' + x);
      });
      if (lot.length > 6) L('RÒ RỈ BẢN CẮT ' + c2[0] + ': và ' + (lot.length - 6) + ' chỗ nữa');
    }
    try { fs.unlinkSync(ra); } catch (x) {}
  });
  console.log('BẢN CẮT   · dựng ' + thu.length + ' bản cho vai thấp và soi rò rỉ nội dung ngoài quyền');
}

/* ── kết ─────────────────────────────────────────────── */
function ket() {
console.log('KIỂM TĨNH · ' + Object.keys(G.MAN || {}).length + ' màn · ' +
            demNav + ' mục điều hướng · ' + Object.keys(LOAI).length + ' loại khối · ' +
            Object.keys(G.TU || {}).length + ' khoá tra');
if (canh.length) { console.log('\nCẢNH BÁO (' + canh.length + ')'); canh.forEach(function (m) { console.log('  · ' + m); }); }
if (loi.length) {
  console.log('\nLỖI (' + loi.length + ')');
  loi.forEach(function (m) { console.log('  ✗ ' + m); });
  console.log('\nKHÔNG ĐƯỢC PHÁT HÀNH.');
  process.exit(1);
}
console.log('\nKhông lỗi. Đạt.');
}

if (loi.length) { ket(); } else { lopCat(); lopChay(ket); }
