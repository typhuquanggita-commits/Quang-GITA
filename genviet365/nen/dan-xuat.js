/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · TẦNG DẪN XUẤT
   Nạp SAU toàn bộ kho và sau man-hinh.js, TRƯỚC giao-dien.js.

   Nguyên tắc của cả tầng này: *sự thật đếm được thì không được
   chép tay.* Mỗi con số một người phải gõ lại khi hệ lớn lên là
   một con số sẽ lệch — và đã lệch năm lần trong quá trình dựng.

   Tầng này dẫn ra bốn thứ, không thứ nào còn phải sửa tay nữa:
     1. Bảng khoá tra — mọi kho tự đăng ký, không cần dòng keo dán
     2. Tỉ lệ hiển thị từng vai và từng bậc — đếm thật, không khai
     3. Bộ số của hệ — nhóm, màn, khối, khoá, vai
     4. Màn liên quan — tính bằng từ hiếm dùng chung, không xếp tay
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  var tuDong = 0;

  /* ── 0 · Những khoá thuộc về BỘ MÁY, không phải nội dung ──── */
  var MAY = {
    META: 1, NHOM: 1, MAN: 1, TU: 1, VAI: 1, QUYEN_MAX: 1, GHI_DE: 1,
    BAC_MO: 1, BAC_SO: 1, TY_LE: 1, LUAT_QUYEN: 1, TANG_HT_UI: 1,
    LUOC_DO: 1, SO: 1, LIEN_QUAN: 1, DAU: 1, KHOA_VAI: 1, KHOA_BAC: 1,
    TU_TU_DONG: 1
  };

  /* ── 2 · Tỉ lệ hiển thị — ĐẾM, không khai ───────────────────
     Phần chữ (cột "ghi") vẫn do người viết, vì đó là nhận định.
     Phần số thì máy đếm, vì đó là sự thật. */
  var tongMan = Object.keys(G.MAN || {}).length;
  function ptVai(ma, bac) {
    if (!G.demMan || !tongMan) return 0;
    return Math.round(G.demMan(ma, bac || 'B1') / tongMan * 100);
  }
  (G.TY_LE || []).forEach(function (r) { r.pt = ptVai(r.vai[0], 'B1'); });
  (G.BAC_MO || []).forEach(function (r) { r.pt = ptVai('R16', r.bac); });

  /* ── 2b · Bảng vai theo tổ chức — SINH RA từ bảng phân quyền ─
     Trước tầng này, hệ có hai bảng vai chép tay ở hai tệp: một
     bảng theo việc (16 vai) và một bảng theo bậc quyền (17 vai).
     Chúng lệch nhau, và không lớp kiểm nào thấy vì cả hai đều
     "đúng" trong tệp của mình. Nay chỉ còn một bảng, hai cách nhìn. */
  var THU_TU_TO = ['Giữ chuẩn', 'Dẫn dắt', 'Cộng đồng',
                   'Người học và gia đình', 'Vận hành'];
  function gomTheoTo(ds, moi) {
    var o = {};
    (ds || []).forEach(function (r) {
      var to = r.to || 'Khác';
      (o[to] = o[to] || []).push({ v: r.t, l: r.ln || '', moi: !!moi });
    });
    return o;
  }
  var oTrong = gomTheoTo(G.VAI, false);
  var oNgoai = gomTheoTo(G.VAI_NGOAI, true);
  function dungBang(o) {
    var ra = [];
    THU_TU_TO.forEach(function (t) { if (o[t]) ra.push({ nhom: t, ds: o[t] }); });
    Object.keys(o).forEach(function (t) {
      if (THU_TU_TO.indexOf(t) < 0) ra.push({ nhom: t, ds: o[t] });
    });
    return ra;
  }
  G.VAI_NHOM = dungBang(oTrong);
  G.VAI_NGOAI_NHOM = dungBang(oNgoai);

  /* ── 4 · Màn liên quan — tính, không xếp tay ────────────────
     Ở một trăm ba mươi hai màn, thứ người đọc thiếu không phải là
     mục lục mà là *đường ngang*: đang đọc màn này thì còn màn nào
     nói tiếp chuyện này.
     Cách tính: mỗi màn thành một túi từ (tiêu đề · nhãn · câu dẫn ·
     câu gợi ở mục lục). Từ hiếm nặng hơn từ phổ biến — nếu không
     thì "hệ", "của", "một" sẽ nối mọi màn với mọi màn. */
  var DUNG = { va: 1, cua: 1, mot: 1, cho: 1, khi: 1, nao: 1, gi: 1, la: 1,
               co: 1, khong: 1, nguoi: 1, he: 1, cac: 1, nhung: 1, moi: 1,
               nay: 1, do: 1, thi: 1, ma: 1, de: 1, tu: 1, den: 1, trong: 1,
               ra: 1, voi: 1, theo: 1, con: 1, nhat: 1, hon: 1, phai: 1 };
  var BANG_DAU = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
  var BANG_KHONG = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
  function boDau(t) {
    t = String(t == null ? '' : t).toLowerCase();
    var r = '', i, j;
    for (i = 0; i < t.length; i++) {
      j = BANG_DAU.indexOf(t.charAt(i));
      r += j > -1 ? BANG_KHONG.charAt(j) : t.charAt(i);
    }
    return r;
  }
  function tuiTu(s) {
    var ra = {}, ds = boDau(s).split(/[^a-z0-9]+/);
    ds.forEach(function (t) { if (t.length > 2 && !DUNG[t]) ra[t] = 1; });
    return ra;
  }

  var goiY = {};
  (G.NHOM || []).forEach(function (n) {
    (n.ds || []).forEach(function (x) { goiY[x.v] = (x.h || '') + ' ' + n.t; });
  });
  var tui = {}, df = {};
  Object.keys(G.MAN || {}).forEach(function (v) {
    var m = G.MAN[v];
    /* Cố ý KHÔNG lấy câu dẫn (m.p): đó là văn xuôi, đầy từ ngẫu
       nhiên, và chính nó tạo ra những đường ngang vô nghĩa. Chỉ
       lấy tiêu đề, nhãn, và câu gợi ở mục lục. */
    tui[v] = tuiTu([m.t, m.t, m.k, goiY[v] || ''].join(' '));
    Object.keys(tui[v]).forEach(function (t) { df[t] = (df[t] || 0) + 1; });
  });
  var nhomCua = {};
  (G.NHOM || []).forEach(function (n) {
    (n.ds || []).forEach(function (x) { nhomCua[x.v] = n.id; });
  });

  G.LIEN_QUAN = {};
  Object.keys(tui).forEach(function (a) {
    var diem = [];
    Object.keys(tui).forEach(function (b) {
      if (a === b) return;
      var d = 0, chung = 0;
      Object.keys(tui[a]).forEach(function (t) {
        if (!tui[b][t]) return;
        chung++;
        /* nghịch đảo độ phổ biến: từ xuất hiện ở ít màn thì nặng hơn */
        d += Math.log(tongMan / df[t]);
      });
      /* Một từ hiếm dùng chung là trùng hợp, không phải liên quan.
         Đòi ít nhất HAI từ — thà thiếu đường ngang còn hơn có đường
         ngang dẫn tới chỗ không dính dáng gì. */
      if (chung < 2 || d <= 0) return;
      /* ưu tiên nhẹ cho màn ở nhóm KHÁC — cùng nhóm thì mục lục đã
         đặt cạnh nhau rồi, đường ngang mới là thứ còn thiếu */
      if (nhomCua[a] !== nhomCua[b]) d *= 1.18;
      diem.push({ v: b, d: d });
    });
    diem.sort(function (x, y) { return y.d - x.d; });
    G.LIEN_QUAN[a] = diem.slice(0, 4).filter(function (x) { return x.d > 5.6; })
                          .map(function (x) { return x.v; });
  });

  /* ── 5 · Kho tự đăng ký vào bảng khoá tra ───────────────────
     Chạy CUỐI CÙNG, sau mọi dẫn xuất — nếu chạy trước thì những
     bảng do chính tầng này sinh ra (VAI_NHOM…) sẽ không được đăng ký.
     Trước tầng này, mỗi kho mới cần một dòng "X: GV.X" chép tay
     trong man-hinh.js — một trăm ba mươi hai dòng như thế, và mỗi
     dòng là một chỗ để quên. Nay bất kỳ khoá GV nào viết HOA_GẠCH
     và mang dữ liệu đều dùng được ngay bằng `tu: 'X'`.
     Khoá đã khai tay trong GV.TU thì GIỮ NGUYÊN — vì đó là những
     khoá có biến đổi, và biến đổi thì không đoán được. */
  G.TU = G.TU || {};
  G.TU_TU_DONG = {};   /* khoá nào do tầng này đăng ký — bộ kiểm cần phân biệt */
  Object.keys(G).forEach(function (k) {
    if (MAY[k]) return;
    if (!/^[A-Z][A-Z0-9_]*$/.test(k)) return;
    var v = G[k];
    if (v == null || typeof v === 'function') return;
    if (typeof v !== 'object' && typeof v !== 'string') return;
    if (k in G.TU) return;
    G.TU[k] = v;
    G.TU_TU_DONG[k] = 1;
    tuDong++;
  });

  /* ── 6 · Bộ số của hệ ───
     Tính SAU CÙNG: nếu tính trước bước tự đăng ký thì số khoá tra
     đếm hụt, và bộ dựng in ra một con số không đúng với bộ kiểm.────────────────────────────────────
     Mọi con số hệ tự nói về mình đều lấy từ đây. Màn "Tổng quan"
     và bộ sinh tài liệu đọc chỗ này, không gõ số vào chỗ khác. */
  var loaiKhoi = {}, khoaDung = {}, soKhoi = 0;
  Object.keys(G.MAN || {}).forEach(function (v) {
    (G.MAN[v].khoi || []).forEach(function (o) {
      loaiKhoi[o.k] = 1; soKhoi++;
      if (o.tu) khoaDung[o.tu] = 1;
    });
  });
  G.SO = {
    nhom: (G.NHOM || []).length,
    man: tongMan,
    khoi: soKhoi,
    loaiKhoi: Object.keys(loaiKhoi).length,
    khoaTra: Object.keys(G.TU).length,
    khoaDung: Object.keys(khoaDung).length,
    khoaTuDong: tuDong,
    vai: (G.VAI || []).length,
    vaiNgoai: (G.VAI_NGOAI || []).length,
    tang: Object.keys(G.QUYEN_MAX || {}).length,
    bac: (G.BAC || []).length,
    truc: (G.TRU || []).reduce(function (a, t) { return a + (t.truc || []).length; }, 0),
    chanDung: ['TV_Q1', 'TV_Q2', 'TV_Q3', 'TV_Q4', 'TV_Q5', 'TV_Q6']
      .reduce(function (a, k) { return a + ((G[k] || []).length); }, 0),
    camKet: (G.TN_CAM_KET || []).length,
    tuDien: (G.TC_TU_DIEN || []).reduce(function (a, n) { return a + (n.ds || []).length; }, 0)
  };

})(window.GV = window.GV || {});
