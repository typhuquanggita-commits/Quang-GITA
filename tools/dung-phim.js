#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — DỰNG PHIM TỪ MỘT BỘ ẢNH ĐÃ VẼ

   Chủ hệ chốt 9.99.31: làm phim.

   ══ LÀM THEO CÁCH CỦA KHO NÀY, KHÔNG THEO BẢN ĐỀ XUẤT ══

   Bản đề xuất dựng phim bằng bốn dịch vụ ngoài: Kling sinh chuyển
   động, OpenAI đọc lời, MusicGen soạn nhạc, và một mô hình thị giác
   viết kịch bản từ NỘI DUNG SÁCH gửi ra ngoài.

   Ba trong bốn thứ ấy cần một khoá API mà chủ hệ chưa nạp. Thứ thứ tư
   — gửi nội dung sách ra ngoài để viết kịch bản — là chỗ luật C11 cấm
   thẳng.

   Nên bộ này làm phần LÀM ĐƯỢC HÔM NAY, và làm trọn:

     · Ảnh vào là chính những tấm BỘ VẼ TRONG MÁY đã dựng — cùng khoá
       kiểu, cùng khổ, cùng nền (luật boAnh)
     · Chuyển động: Ken Burns — phóng chậm và trôi ngang, luân phiên
       vào/ra để có nhịp. Đây không phải "3D giả": nó là cách một cuốn
       phim tài liệu làm cho một tấm ảnh tĩnh sống, và nó có từ trước
       khi có mô hình sinh video
     · Nối cảnh bằng crossfade
     · Không lời đọc, không nhạc, không chữ cháy thêm — vì chữ ĐÃ nằm
       trong tấm rồi, do máy đặt, đo được từng chữ (luật C14)

   ══ VÌ SAO KHÔNG BURN PHỤ ĐỀ ══

   Bản đề xuất cháy phụ đề bằng ffmpeg drawtext với font Playfair. Ở
   đây không cần: mỗi cảnh LÀ một tấm áp phích đã có tiêu đề, câu phụ,
   ô việc — tất cả đã qua phép đo tương phản và phép đo chữ-trong-khung.
   Cháy thêm một lớp chữ nữa là chồng chữ lên chữ.

   ══ CHỈ DỰNG TỪ TẤM ĐÃ PHÁT HÀNH (luật C19) ══

   Thư mục ảnh phải có `nguon.json` do `tam-ra-anh.js` ghi: mỗi tệp
   PNG truy về một bản ghi thị giác và bậc duyệt của nó. Không có sổ,
   có ảnh ngoài sổ, hay có tấm chưa tới bậc `phatHanh` thì dừng.

   Chạy:  node tools/tam-ra-anh.js <đề-bài.json> <thư mục ảnh>
          node tools/dung-phim.js  <thư mục ảnh> <tệp ra.mp4> [giây/cảnh]
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FPS = 30;
const GIAY_MOI_CANH = 5;
const CHONG = 0.8;          /* crossfade chồng bao nhiêu giây */

/* ── CÓ FFMPEG KHÔNG ──
   Thiếu ffmpeg thì execFileSync ném ENOENT — một dòng lỗi không nói
   được phải làm gì. Hỏi trước, và trả lời bằng câu người đọc hiểu. */
function coFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], {stdio: 'ignore'});
    execFileSync('ffprobe', ['-version'], {stdio: 'ignore'});
    return true;
  } catch (e) { return false; }
}

function chay(args) {
  return execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error'].concat(args),
    {maxBuffer: 1 << 28});
}

/* Đo tấm ra bao nhiêu điểm ảnh — đọc từ chính tệp, không tin tên. */
function coAnh(tep) {
  const r = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', tep])
    .toString().trim().split('x');
  return {w: Number(r[0]), h: Number(r[1])};
}

/* ── MỘT CẢNH: KEN BURNS ──
   zoompan phóng từ 1,0 tới 1,10 trong đúng số khung của cảnh. Luân
   phiên phóng-vào và phóng-ra: mười cảnh cùng phóng vào thì phim ra
   một nhịp đều đều, và nhịp đều đều thì người xem thôi nhìn.

   PHÓNG TỪ BẢN GẤP ĐÔI. zoompan lấy mẫu lại ảnh ở mỗi khung; phóng
   thẳng trên ảnh gốc thì nét chữ rung lăn tăn suốt cảnh — thấy rõ nhất
   ở chữ nhỏ, mà tấm nào của kho này cũng có chữ nhỏ. */
function veCanh(anh, ra, giay, vao, kg) {
  const khung = Math.round(giay * FPS);
  const z = vao ? `min(zoom+${(0.10 / khung).toFixed(6)},1.10)`
                : `max(1.10-${(0.10 / khung).toFixed(6)}*on,1.0)`;
  chay(['-y', '-loop', '1', '-i', anh, '-t', String(giay),
    '-vf', `scale=${kg.w * 2}:${kg.h * 2}:flags=lanczos,` +
           `zoompan=z='${z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
           `d=${khung}:s=${kg.w}x${kg.h}:fps=${FPS},format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-an', ra]);
}

/* ── NỐI BẰNG CROSSFADE ──
   xfade chồng hai cảnh, nên MỖI mối nối ăn mất CHONG giây của tổng.
   Bản đề xuất tính offset bằng một biến `label` gán hai lần với hai
   luật khác nhau — chuỗi filter nó dựng ra không hợp lệ khi có hơn hai
   cảnh. Ở đây offset cộng dồn tường minh, và tổng thời lượng tính lại
   theo đúng công thức chứ không đoán. */
function noiCanh(ds, ra, kg) {
  if (ds.length === 1) { fs.copyFileSync(ds[0].tep, ra); return ds[0].giay; }
  const vao = [];
  ds.forEach(function (c) { vao.push('-i', c.tep); });
  let loc = '', nhan = '[0:v]', don = ds[0].giay;
  for (let i = 1; i < ds.length; i++) {
    const cuoi = i === ds.length - 1 ? '[ra]' : `[v${i}]`;
    loc += `${nhan}[${i}:v]xfade=transition=fade:duration=${CHONG}:` +
           `offset=${(don - CHONG).toFixed(3)}${cuoi};`;
    don = don + ds[i].giay - CHONG;
    nhan = cuoi;
  }
  chay(vao.concat(['-filter_complex', loc.replace(/;$/, ''), '-map', '[ra]',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-r', String(FPS), '-y', ra]));
  return don;
}

function dungPhim(thuMuc, raTep, giayMoiCanh) {
  if (!coFfmpeg()) throw new Error('Máy này chưa có ffmpeg/ffprobe — ' +
    'phim dựng bằng chúng. Cài: apt-get install -y ffmpeg');
  const giay = Number(giayMoiCanh) || GIAY_MOI_CANH;
  const anh = fs.readdirSync(thuMuc).filter(function (f) {
    return /\.(png|jpe?g)$/i.test(f); }).sort();
  if (!anh.length) throw new Error('Không có ảnh nào trong ' + thuMuc);

  /* ── SỔ NGUỒN, VÀ ĐÒI ĐỦ BẬC (luật C19) ──
     Phim chỉ dựng từ tấm ĐÃ phát hành. Tệp PNG không mang theo bậc
     duyệt của bản ghi sinh ra nó, nên nếu chỉ đọc thư mục ảnh thì
     luật ấy không kiểm được — nó thành một câu trong sổ.
     `tam-ra-anh.js` ghi kèm `nguon.json`. Ở đây ĐÒI sổ ấy, và đòi
     nó khớp từng tệp: danh sách trắng chứ không danh sách cấm, vì
     một danh sách cấm thì chỉ cần thả thêm một tệp lạ vào thư mục
     là qua được. */
  var soNguon;
  try {
    soNguon = JSON.parse(fs.readFileSync(path.join(thuMuc, 'nguon.json'), 'utf8'));
  } catch (e) {
    throw new Error('Thiếu nguon.json trong ' + thuMuc + '. Phim chỉ dựng từ ' +
      'tấm ĐÃ phát hành (luật C19), mà tệp PNG không mang theo bậc duyệt — ' +
      'sổ nguồn là chỗ duy nhất biết. Dựng tấm bằng: node tools/tam-ra-anh.js ' +
      '<đề-bài.json> ' + thuMuc);
  }
  var theoTen = {};
  (soNguon.tam || []).forEach(function (t) { theoTen[t.tep] = t; });
  var laTep = anh.filter(function (f) { return !theoTen[f]; });
  if (laTep.length) throw new Error('Có ảnh không nằm trong nguon.json: ' +
    laTep.join(', ') + '. Mỗi cảnh phải truy được về một bản ghi thị giác.');
  var chuaDuyet = anh.filter(function (f) {
    return theoTen[f].trangThai !== 'phatHanh'; })
    .map(function (f) { return f + ' (' + theoTen[f].trangThai + ')'; });
  if (chuaDuyet.length) throw new Error('Tấm chưa phát hành, không vào phim ' +
    'được (luật C19): ' + chuaDuyet.join(', ') + '. Phim đi xa hơn tấm rời, ' +
    'nên nó không được là lối vòng qua thang duyệt.');

  /* ── MỌI TẤM PHẢI CÙNG KHỔ ──
     Luật boAnh đã đòi thế. Chỗ chặn này thì để đỡ một lớp hỏng KHÁC.

     Tôi từng viết ở đây rằng "xfade từ chối nối hai luồng khác kích
     thước, nên phải chặn trước". SAI, và phép phá đã bắt: bỏ chỗ
     chặn này ra thì phim vẫn dựng xong, không một dòng lỗi nào. Vì
     `veCanh` scale từng cảnh về đúng kg.w×kg.h trước khi nối — nên
     một tấm 640×640 lọt vào bộ 1080×1080 sẽ được KÉO GIÃN cho vừa,
     và cuốn phim ra có một cảnh méo mà không ai được báo.

     Máy im lặng làm méo thì tệ hơn máy báo lỗi. Nên chặn — và chặn
     vì lý do ấy, không vì lý do tôi đoán lúc đầu. */
  const kg = coAnh(path.join(thuMuc, anh[0]));
  const lech = anh.map(function (f) {
    const c = coAnh(path.join(thuMuc, f));
    return (c.w !== kg.w || c.h !== kg.h) ? f + ' (' + c.w + '×' + c.h + ')' : null;
  }).filter(Boolean);
  if (lech.length) throw new Error('Ảnh khác khổ so với tấm đầu ' + kg.w + '×' +
    kg.h + ': ' + lech.join(', ') + '. Cả bộ phải cùng khổ — dựng bằng ' +
    'G.veThiGiacBo() thì khổ đã khoá sẵn.');

  const tam = fs.mkdtempSync(path.join(path.dirname(raTep), 'phim-'));
  try {
    const ds = anh.map(function (f, i) {
      const ra = path.join(tam, 'c' + String(i).padStart(3, '0') + '.mp4');
      veCanh(path.join(thuMuc, f), ra, giay, i % 2 === 0, kg);
      return {tep: ra, giay: giay};
    });
    const tong = noiCanh(ds, raTep, kg);
    const kb = Math.round(fs.statSync(raTep).size / 1024);
    return {soCanh: ds.length, giay: Math.round(tong * 10) / 10, kb: kb,
            w: kg.w, h: kg.h};
  } finally {
    fs.rmSync(tam, {recursive: true, force: true});
  }
}

module.exports = {dungPhim, coAnh, coFfmpeg, FPS, CHONG, GIAY_MOI_CANH};

if (require.main === module) {
  if (process.argv.length < 4) {
    console.log('Dùng: node tools/dung-phim.js <thư mục ảnh> <ra.mp4> [giây/cảnh]');
    process.exit(2);
  }
  const r = dungPhim(process.argv[2], process.argv[3], process.argv[4]);
  console.log('✓ ' + process.argv[3] + ' · ' + r.soCanh + ' cảnh · ' + r.giay +
    ' giây · ' + r.w + '×' + r.h + ' · ' + r.kb + ' KB');
}
