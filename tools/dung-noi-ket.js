#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — DỰNG LỚP NỐI

       node tools/dung-noi-ket.js

   ── VẤN ĐỀ ──
   Kho có 1.000 kịch bản, 600 chuyện theo cấp, 77 chuyện người thật,
   220 phác đồ, 250 tình huống. Đo ra thì KHÔNG MỘT kịch bản nào gắn
   với phác đồ nào (kbGanPhacDo = 0).

   Nên người mở một phác đồ chỉ đọc được nguyên nhân và giải pháp. Muốn
   tìm kịch bản dùng cho ca ấy thì phải sang màn khác, tự nhớ tên, tự
   dò trong một nghìn cái. Trên thực tế là không ai làm.

   Kho không thiếu nội dung. Kho thiếu ĐƯỜNG ĐI GIỮA CÁC NỘI DUNG.

   ── CÁCH NỐI ──
   Không nối bằng tay 220 × 5 lần. Nối bằng cách đo độ trùng từ khoá
   giữa phác đồ và kịch bản, có bỏ dấu, có bỏ từ rỗng, và có trọng số
   theo độ hiếm của từ — từ nào xuất hiện khắp nơi thì gần như không
   mang tin, từ hiếm mới định vị được.

   ── VÀ NÓI THẲNG MỘT ĐIỀU ──
   Nối tự động thì có cái nối trúng, có cái nối trật. Nên:
     · Có ngưỡng. Dưới ngưỡng thì KHÔNG nối, để trống còn hơn nối sai
       — một kịch bản sai gắn vào một ca thật là một buổi hỏng.
     · Mỗi mối nối ghi kèm ĐIỂM và LÝ DO (từ khoá nào trùng), để người
       duyệt kiểm lại được, và để biết cái nào yếu.
     · Công cụ báo độ phủ thật, kể cả khi con số khó nhìn.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const GOC = path.join(__dirname, '..');
const NGUON = path.join(GOC, 'kho-goc');

global.window = {};
for (const t of fs.readdirSync(NGUON).filter(f => f.endsWith('.js')).sort())
  require(path.join(NGUON, t));
const G = global.window.G;

/* ─── Tách từ tiếng Việt ───
   Bản đầu bỏ dấu rồi so từng âm tiết. Đo tay thì thấy hỏng ngay:
   "Không gian học nhiều nhiễu" nối vào "lịch học thêm gây quá tải",
   vì bỏ dấu xong "không gian" và "thời gian" đều thành "gian", "lộn
   xộn" và "lớn" đều thành "lon". Máy khớp đúng chuỗi ký tự, mà chuỗi
   ấy đã mất nghĩa từ trước.

   Độ phủ khi ấy là 100% — và đó chính là dấu hiệu hỏng: ngưỡng thấp
   tới mức cái gì cũng khớp được cái gì.

   Nay làm ngược lại:
     · GIỮ NGUYÊN DẤU. Tiếng Việt có dấu thì không nhập nhằng.
     · Ghép ĐÔI ÂM TIẾT. Nghĩa của tiếng Việt nằm ở từ ghép — "không
       gian", "thời gian", "tập trung" — chứ không nằm ở âm tiết rời.
       Một âm tiết đứng một mình gần như không mang tin.
     · Âm tiết rời vẫn tính, nhưng chỉ một phần tư trọng số. */
const RONG = new Set(('và của cho khi nào một hai là có không được trong ngoài trên dưới ' +
  'này đó kia ấy thì mà nhưng nếu vì nên bởi từ đến với về theo các những mọi tất cả ' +
  'con người học sinh gia đình phụ huynh coach học viên em mình bạn anh chị ' +
  'làm việc cách cần phải sẽ đã đang chưa ra vào lên xuống hơn rất quá cũng ' +
  'gì sao đâu đây thế như ta chúng tôi họ nó ngày tuần tháng năm giờ phút lần ' +
  'bước mục phần nội dung hoặc thêm nữa lại chỉ vẫn còn đều mỗi').split(/\s+/));

function amTiet(s) {
  return String(s || '').toLowerCase()
    .split(/[^a-zà-ỹđ0-9]+/i)
    .filter(w => w.length >= 2);
}

/* Ghép đôi: "không gian học" → ["không gian", "gian học"].
   Bỏ cặp mà cả hai vế đều là từ rỗng. */
function tach(s) {
  const a = amTiet(s), ra = [];
  for (let i = 0; i < a.length; i++) {
    if (!RONG.has(a[i])) ra.push('·' + a[i]);          /* âm tiết rời, đánh dấu · */
    if (i + 1 < a.length && !(RONG.has(a[i]) && RONG.has(a[i + 1])))
      ra.push(a[i] + ' ' + a[i + 1]);                   /* từ ghép đôi */
  }
  return ra;
}

/* ─── Trọng số theo độ hiếm ─── */
function dungIDF(cacVanBan) {
  const df = new Map();
  for (const v of cacVanBan) {
    for (const w of new Set(tach(v))) df.set(w, (df.get(w) || 0) + 1);
  }
  const N = cacVanBan.length;
  return w => Math.log((N + 1) / ((df.get(w) || 0) + 1)) + 1;
}

function diem(aTu, bSet, idf) {
  let d = 0; const trung = [];
  for (const w of new Set(aTu)) if (bSet.has(w)) {
    /* Âm tiết rời (đánh dấu ·) chỉ một phần tư trọng số: nó hay trùng
       ngẫu nhiên. Từ ghép đôi mới là chỗ mang nghĩa. */
    const le = w.charCodeAt(0) === 183;
    d += idf(w) * (le ? 0.25 : 1);
    if (!le) trung.push(w);
  }
  return { d: d / Math.sqrt(aTu.length || 1), trung: trung.sort().slice(0, 5) };
}

/* ═══════════ NGUỒN ═══════════ */
const KB = (G.KICHBAN || []).map(k => ({
  ma: k.ma, tang: k.tang, loai: k.loai, ten: k.ten,
  van: [k.ten, k.muc, k.nhom, k.mo].filter(Boolean).join(' ')
}));
const CH = (G.CHUYEN || []).map(c => ({
  ma: c.ma, cap: c.cap, mach: c.mach, ten: c.ten,
  van: [c.ten, c.ke, c.xoay, c.hoc, c.lam].filter(Boolean).join(' ')
}));
const TG = (G.CHUYEN_TG || []).map(c => ({
  ma: c.ma, ten: c.ten, mach: c.mach,
  van: [c.ten, c.viec, c.kho, c.lam, c.bai].filter(Boolean).join(' ')
}));

const idfKB = dungIDF(KB.map(x => x.van));
const idfCH = dungIDF(CH.map(x => x.van));
const idfTG = dungIDF(TG.map(x => x.van));

const setKB = KB.map(x => new Set(tach(x.van)));
const setCH = CH.map(x => new Set(tach(x.van)));
const setTG = TG.map(x => new Set(tach(x.van)));

/* Ngưỡng: dưới mức này thì để trống, không nối bừa */
const NGUONG_KB = 0.9, NGUONG_CH = 0.7, NGUONG_TG = 0.7;

function topN(aTu, kho, sets, idf, n, nguong, loc) {
  const ra = [];
  for (let i = 0; i < kho.length; i++) {
    if (loc && !loc(kho[i])) continue;
    const r = diem(aTu, sets[i], idf);
    if (r.d >= nguong) ra.push({ ma: kho[i].ma, d: +r.d.toFixed(2), vi: r.trung });
  }
  ra.sort((a, b) => b.d - a.d);
  return ra.slice(0, n);
}

/* ═══════════ NỐI PHÁC ĐỒ ═══════════ */
const pd = {};
let coKB = 0, coCH = 0, coTG = 0;
for (const p of (G.PHACDO || [])) {
  const tu = tach([p.ten, p.nguyenNhan, p.giaiPhap, p.nhomTen].join(' '));
  const kb = topN(tu, KB, setKB, idfKB, 4, NGUONG_KB);
  const ch = topN(tu, CH, setCH, idfCH, 3, NGUONG_CH);
  const tg = topN(tu, TG, setTG, idfTG, 2, NGUONG_TG);
  if (kb.length) coKB++; if (ch.length) coCH++; if (tg.length) coTG++;
  pd[p.ma] = { kb, ch, tg, nhom: p.nhom };
}

/* ═══════════ NỐI TÌNH HUỐNG ═══════════ */
const th = {};
let tCoKB = 0, tCoCH = 0;
for (const t of (G.TINHHUONG || [])) {
  const id = t.tang + '-' + t.stt;
  const tu = tach([t.th, t.mo, t.pt, t.chot, t.gp].join(' '));
  /* Kịch bản CÙNG TẦNG trước — một ca tầng 1 không dùng kịch bản tầng 5 */
  let kb = topN(tu, KB, setKB, idfKB, 4, NGUONG_KB, k => k.tang === t.tang);
  if (!kb.length) kb = topN(tu, KB, setKB, idfKB, 3, NGUONG_KB);
  const ch = topN(tu, CH, setCH, idfCH, 3, NGUONG_CH);
  if (kb.length) tCoKB++; if (ch.length) tCoCH++;
  th[id] = { kb, ch, tang: t.tang, nhom: t.nhom };
}

/* ═══════════ GHI RA ═══════════ */
function gonMa(a) { return a.map(x => ({ ma: x.ma, d: x.d, vi: x.vi })); }

const ra =
  '/* ═══════════════════════════════════════════════════════════════\n' +
  '   GITA 365 — LỚP NỐI (TỆP DỰNG RA, KHÔNG PHẢI MÃ NGUỒN)\n' +
  '\n' +
  '   Dựng lại bằng: node tools/dung-noi-ket.js\n' +
  '   Đừng sửa ở đây — sửa cách nối trong công cụ rồi dựng lại.\n' +
  '\n' +
  '   Nối 220 phác đồ và 250 tình huống với kịch bản, chuyện theo cấp\n' +
  '   và chuyện người thật, bằng độ trùng từ khoá có trọng số theo độ\n' +
  '   hiếm. Mỗi mối nối mang điểm (d) và từ khoá trùng (vi) để người\n' +
  '   duyệt kiểm lại được.\n' +
  '\n' +
  '   Dưới ngưỡng thì KHÔNG nối. Để trống còn hơn nối sai — một kịch\n' +
  '   bản sai gắn vào một ca thật là một buổi hỏng.\n' +
  '   ═══════════════════════════════════════════════════════════════ */\n' +
  "'use strict';\nvar G = window.G || {}; window.G = G;\n\n" +
  'G.NOI_KET = {\n  luc:' + JSON.stringify(new Date().toISOString().slice(0, 10)) + ',\n' +
  '  nguong:{kb:' + NGUONG_KB + ', ch:' + NGUONG_CH + ', tg:' + NGUONG_TG + '},\n' +
  '  pd:' + JSON.stringify(pd) + ',\n' +
  '  th:' + JSON.stringify(th) + '\n};\n';

fs.writeFileSync(path.join(NGUON, 'data.noi-ket.js'), ra);

const n = (a, b) => a + '/' + b + ' (' + Math.round(a * 100 / b) + '%)';
console.log('PHÁC ĐỒ   ' + (G.PHACDO || []).length + ' cái');
console.log('  có kịch bản      ' + n(coKB, G.PHACDO.length));
console.log('  có chuyện cấp    ' + n(coCH, G.PHACDO.length));
console.log('  có người thật    ' + n(coTG, G.PHACDO.length));
console.log('TÌNH HUỐNG ' + (G.TINHHUONG || []).length + ' cái');
console.log('  có kịch bản      ' + n(tCoKB, G.TINHHUONG.length));
console.log('  có chuyện cấp    ' + n(tCoCH, G.TINHHUONG.length));
console.log('Tệp: kho-goc/data.noi-ket.js · ' +
  Math.round(fs.statSync(path.join(NGUON, 'data.noi-ket.js')).size / 1024) + ' KB');
