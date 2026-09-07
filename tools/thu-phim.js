/* ═══════════════════════════════════════════════════════════════
   GITA 365 — THỬ ĐƯỜNG DỰNG PHIM, TỪ ĐỀ BÀI TỚI TỆP MP4
   Chạy: xvfb-run -a node tools/thu-phim.js

   ══ ĐO CẢ ĐƯỜNG, KHÔNG ĐO TỪNG KHÚC ══

   Đường dựng phim đi qua ba nhà: bộ vẽ trong trình duyệt → tệp PNG →
   ffmpeg. Đo từng khúc thì mỗi khúc đều xanh mà cuốn phim vẫn có thể
   sai — chỗ sai của một đường ba khúc gần như luôn nằm ở MỐI NỐI:
   khổ tấm không khớp, một cảnh rơi mất, thời lượng không bằng công
   thức. Nên bộ này chạy trọn đường một lần và đo tệp RA, không đo
   lời khai của hàm.

   ══ TÁM PHÉP ĐO VÀ SÁU PHÉP PHÁ ══

   Đo — trên TỆP RA, không trên lời khai của hàm:
     · cả bộ ra đủ tấm, không tấm nào rơi trong im lặng
     · mọi tấm cùng khổ, và khổ ấy đúng khổ bộ vẽ đã khoá
     · thời lượng, đo bằng ffprobe, bằng đúng n·giây − (n−1)·chồng
     · số khung hình khớp thời lượng ấy ở đúng nhịp hình
     · phim đúng khổ của bộ, và đủ số cảnh
     · tệp ra là H.264 / yuv420p — máy nào cũng mở được

   Phá (một phép kiểm chưa từng đỏ thì chưa phải phép kiểm):
     · một tấm khác khổ → TỪ CHỐI, và từ chối nêu tên tấm
     · thư mục rỗng → TỪ CHỐI
     · bộ có một tấm bộ vẽ không vẽ được → raAnh phải KHAI ra, chứ
       không lặng lẽ trả về phần còn lại
     · tấm CHƯA phát hành → TỪ CHỐI, nêu đúng bậc nó đang đứng (C19)
     · ảnh lạ thả vào thư mục, không có trong sổ nguồn → TỪ CHỐI
     · mất nguon.json → TỪ CHỐI
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { raAnh } = require('./tam-ra-anh');
const phim = require('./dung-phim');

/* Bài thử là nội dung GITA thật, không phải chữ lấp chỗ: một tấm lấp
   chỗ ngắn thì bố cục nào cũng vừa, và cuốn phim dựng từ nó không
   giống cuốn phim dựng từ tấm thật ở chỗ nào đáng đo cả. */
/* `trangThai: 'phatHanh'` ở mọi bản ghi — luật C19 đòi thế, và bài
   thử phải đi đúng đường thật chứ không đi một đường riêng cho dễ. */
const DE = [
  {id: 'TG-phim-1', tang: 'T1', loaiHinh: 'AP_PHICH', soatTang: 'thử',
   trangThai: 'phatHanh',
   nhiemVu: 'Cho thấy bảy ngày đầu gồm những gì.', nguoiXem: ['PHUHUYNH'],
   noiDung: 'BẢY NGÀY ĐẦU\n\nNHÃN: Chặng nền\n' +
     'PHỤ: Bảy ngày đầu chỉ để nhìn cho đúng\n' +
     'KÝ: Nhìn đúng trước, sửa sau.\n' +
     'Ô | Bộ test đầu vào | Cho cả học viên lẫn phụ huynh\n' +
     'Ô | Buổi tiếp nhận | Bốn mươi lăm tới sáu mươi phút\n' +
     'Ô | Phiếu ghi bảy ngày | Kèm hướng dẫn ghi từng ngày\n' +
     'Ô | Buổi đọc hồ sơ | Có mặt cả nhà\n' +
     'Ô | Cổng nghiệm thu ngày bảy | Một quyết định rõ cho chặng sau\n' +
     'Ô | Cùng bạn | Kiến tạo phiên bản tốt nhất của chính mình'},
  {id: 'TG-phim-2', tang: 'T1', trangThai: 'phatHanh', loaiHinh: 'KHUNG', soatTang: 'thử',
   nhiemVu: 'Cho thấy phần việc của mỗi người trong chặng nền.',
   nguoiXem: ['PHUHUYNH'],
   noiDung: 'LẮNG NGHE — Nghe hết câu chuyện của con mà chưa vội chữa\n' +
     'GHI LẠI — Ghi phiếu bảy ngày, mỗi ngày một dòng ngắn\n' +
     'ĐỌC CÙNG — Ngồi lại đọc hồ sơ, có mặt cả nhà\n' +
     'CHỌN MỘT — Chốt một việc cho chặng sau, không chốt mười\n' +
     'GIỮ NHỊP — Giữ đúng nhịp hai mươi mốt ngày, không nhanh hơn\n' +
     'CÙNG BẠN — Kiến tạo phiên bản tốt nhất của chính mình'},
  {id: 'TG-phim-3', tang: 'T1', trangThai: 'phatHanh', loaiHinh: 'MOT_SO', soatTang: 'thử',
   nhiemVu: 'Cho thấy một chuỗi giữ nhịp dài bao nhiêu ngày.',
   nguoiXem: ['PHUHUYNH'],
   noiDung: '21 ngày\n\nMột chuỗi giữ nhịp dài hai mươi mốt ngày. Hết chuỗi ' +
     'có một buổi ngồi lại, và buổi ấy cho một quyết định rõ cho chặng sau ' +
     'chứ không cho một lời khen.'},
  {id: 'TG-phim-4', tang: 'T1', trangThai: 'phatHanh', loaiHinh: 'CONG', soatTang: 'thử',
   nhiemVu: 'Cho thấy điều kiện qua cổng ngày bảy.', nguoiXem: ['PHUHUYNH'],
   noiDung: 'CỔNG | Cổng nghiệm thu ngày bảy\n' +
     'Phiếu bảy ngày — Ghi đủ bảy ngày, mỗi ngày một dòng\n' +
     'Buổi đọc hồ sơ — Đã ngồi lại đủ bốn mươi lăm phút\n' +
     'Một việc chốt — Nhà chọn được một việc cho chặng sau'}
];

const GIAY = 3;   /* ngắn hơn bản thật, chỉ để đo công thức */

function doTep(tep) {
  const r = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=codec_name,width,height,pix_fmt,nb_frames',
    '-show_entries', 'format=duration', '-of', 'default=nw=1', tep]).toString();
  const lay = k => (new RegExp('^' + k + '=(.*)$', 'm').exec(r) || [])[1];
  return {ma: lay('codec_name'), w: +lay('width'), h: +lay('height'),
          diem: lay('pix_fmt'), khung: +lay('nb_frames'),
          giay: +lay('duration')};
}

let loi = 0;
const bao = (ok, ten, chi) => {
  if (!ok) loi++;
  console.log('  ' + (ok ? '✓ ' : '✗ ') + ten + (chi ? ' — ' + chi : ''));
};

(async () => {
  if (!phim.coFfmpeg()) {
    console.log('\n⚠ Máy này chưa có ffmpeg/ffprobe — không đo được đường ' +
      'dựng phim.\n  Cài: apt-get install -y ffmpeg\n');
    process.exit(1);
  }

  const tam = fs.mkdtempSync(path.join(os.tmpdir(), 'gita-phim-'));
  try {
    console.log('\n══ 1. TỪ ĐỀ BÀI RA TẤM ══\n');
    const anh = path.join(tam, 'anh');
    const bo = await raAnh(DE, anh);
    bao(bo.hong.length === 0, 'không tấm nào rơi',
      bo.hong.length ? bo.hong.map(h => h.id + ': ' + h.error).join(' · ') : null);
    bao(bo.tep.length === DE.length, 'ra đủ tấm',
      bo.tep.length + '/' + DE.length);

    const khoTam = bo.tep.map(t => phim.coAnh(t));
    bao(khoTam.every(k => k.w === bo.kg.w && k.h === bo.kg.h),
      'mọi tấm cùng khổ đã khoá',
      bo.kg.w + '×' + bo.kg.h + ' · nền ' + bo.khoa.che);

    console.log('\n══ 2. TỪ TẤM RA PHIM ══\n');
    const ra = path.join(tam, 'phim.mp4');
    const kq = phim.dungPhim(anh, ra, GIAY);
    const d = doTep(ra);

    /* Công thức, không phải lời khai: mỗi mối nối chồng CHONG giây,
       nên n cảnh dài n·giây − (n−1)·chồng. Đo trên TỆP RA — hàm tự
       khai đúng mà tệp ra sai là chuyện đã xảy ra ở kho này. */
    const dung = DE.length * GIAY - (DE.length - 1) * phim.CHONG;
    bao(Math.abs(d.giay - dung) < 0.05, 'thời lượng bằng công thức',
      d.giay + ' giây (đợi ' + dung.toFixed(1) + ')');
    bao(d.khung === Math.round(dung * phim.FPS), 'đủ khung hình',
      d.khung + ' khung @ ' + phim.FPS + ' hình/giây');
    bao(d.w === bo.kg.w && d.h === bo.kg.h, 'phim đúng khổ của bộ',
      d.w + '×' + d.h);
    bao(d.ma === 'h264' && d.diem === 'yuv420p', 'H.264 / yuv420p',
      d.ma + ' / ' + d.diem);
    bao(kq.soCanh === DE.length, 'đủ cảnh', kq.soCanh + ' cảnh · ' + kq.kb + ' KB');

    console.log('\n══ 3. SÁU PHÉP PHÁ ══\n');

    /* PHÁ 1 — một tấm khác khổ. Đây là chỗ hỏng THẬT dễ xảy ra nhất:
       ai đó vẽ thêm một tấm bằng G.veThiGiac() (không qua bộ) rồi bỏ
       chung thư mục. xfade sẽ ném một dòng lỗi khó đọc ở giữa chừng
       nếu không chặn trước. */
    /* Dựng một bản sao của thư mục ảnh để mỗi phép phá tự do đập. */
    const chep = function (ten, sua) {
      const t = path.join(tam, ten);
      fs.mkdirSync(t);
      bo.tep.forEach(f => fs.copyFileSync(f, path.join(t, path.basename(f))));
      const so = JSON.parse(JSON.stringify(bo.nguon));
      if (sua) sua(t, so);
      if (so) fs.writeFileSync(path.join(t, 'nguon.json'),
        JSON.stringify(so, null, 1), 'utf8');
      return t;
    };

    {
      /* Tấm lạ được GHI VÀO sổ nguồn với bậc đã phát hành, để phép
         phá này chạm đúng chỗ định chạm — nếu bỏ nó ngoài sổ thì cửa
         sổ-nguồn chặn trước, và phép đo khổ không bao giờ được thử. */
      const t2 = chep('lech', function (t, so) {
        execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
          '-f', 'lavfi', '-i', 'color=c=black:s=640x640', '-frames:v', '1',
          path.join(t, 'zzz-lech.png')]);
        so.tam.push({tep: 'zzz-lech.png', id: 'TG-lech', loaiHinh: 'BIA',
          trangThai: 'phatHanh'});
      });
      let noi = null;
      try { phim.dungPhim(t2, path.join(tam, 'x.mp4'), GIAY); }
      catch (e) { noi = e.message; }
      bao(noi && noi.indexOf('zzz-lech.png') >= 0 && noi.indexOf('640×640') >= 0,
        'tấm khác khổ bị từ chối, và từ chối nêu tên tấm',
        noi ? noi.slice(0, 60) + '…' : 'KHÔNG TỪ CHỐI');
    }

    /* PHÁ 2 — thư mục rỗng. Không chặn thì ffmpeg dựng một tệp 0 cảnh
       và bộ này vẫn xanh. */
    {
      const t3 = path.join(tam, 'rong');
      fs.mkdirSync(t3);
      let noi = null;
      try { phim.dungPhim(t3, path.join(tam, 'y.mp4'), GIAY); }
      catch (e) { noi = e.message; }
      bao(!!noi && /Không có ảnh nào/.test(noi), 'thư mục rỗng bị từ chối',
        noi || 'KHÔNG TỪ CHỐI');
    }

    /* PHÁ 3 — một đề bài bộ vẽ không vẽ được. MOT_SO không có con số
       là chỗ từ chối có thật của bộ vẽ. raAnh phải KHAI tấm rơi ra,
       vì một cuốn phim thiếu một cảnh trông y hệt một cuốn phim đủ. */
    {
      const de2 = DE.slice(0, 2).concat([Object.assign({}, DE[2], {
        id: 'TG-phim-hong',
        noiDung: 'Vài ngày\n\nMột chuỗi giữ nhịp, không nêu con số nào cả.'})]);
      const bo2 = await raAnh(de2, path.join(tam, 'anh2'));
      bao(bo2.hong.length === 1 && bo2.hong[0].id === 'TG-phim-hong',
        'tấm không vẽ được thì được khai ra',
        bo2.hong.length ? bo2.hong[0].id : 'KHÔNG KHAI');
      bao(bo2.tep.length === 2, 'và không lẫn vào thư mục ảnh',
        bo2.tep.length + ' tấm');
    }

    /* ── BA PHÉP PHÁ CỦA LUẬT C19 ──
       Phim đi xa hơn tấm rời, nên nếu nó dựng được từ tấm chưa duyệt
       thì cả thang duyệt thị giác có một lối vòng. Ba cách vòng, ba
       phép phá: hạ bậc một tấm · thả thêm một ảnh ngoài sổ · bỏ sổ
       đi. Cả ba phải bị chặn, và chặn có nêu tên. */
    {
      const t4 = chep('chuaduyet', function (t, so) {
        so.tam[1].trangThai = 'duyet'; });
      let noi = null;
      try { phim.dungPhim(t4, path.join(tam, 'z1.mp4'), GIAY); }
      catch (e) { noi = e.message; }
      bao(!!noi && /C19/.test(noi) && noi.indexOf('(duyet)') >= 0,
        'tấm chưa phát hành bị từ chối, nêu đúng bậc nó đang đứng',
        noi ? noi.slice(0, 70) + '…' : 'KHÔNG TỪ CHỐI');
    }
    {
      const t5 = chep('anhla', function (t, so) {
        fs.copyFileSync(bo.tep[0], path.join(t, 'zzz-la.png'));
        /* KHÔNG ghi vào sổ — đó chính là chỗ đang thử. */
      });
      let noi = null;
      try { phim.dungPhim(t5, path.join(tam, 'z2.mp4'), GIAY); }
      catch (e) { noi = e.message; }
      bao(!!noi && noi.indexOf('zzz-la.png') >= 0,
        'ảnh không có trong sổ nguồn bị từ chối',
        noi ? noi.slice(0, 70) + '…' : 'KHÔNG TỪ CHỐI');
    }
    {
      const t6 = chep('mat-so', null);
      fs.rmSync(path.join(t6, 'nguon.json'), {force: true});
      let noi = null;
      try { phim.dungPhim(t6, path.join(tam, 'z3.mp4'), GIAY); }
      catch (e) { noi = e.message; }
      bao(!!noi && /Thiếu nguon\.json/.test(noi),
        'mất sổ nguồn thì không dựng được phim',
        noi ? noi.slice(0, 70) + '…' : 'KHÔNG TỪ CHỐI');
    }
  } finally {
    fs.rmSync(tam, {recursive: true, force: true});
  }

  console.log('');
  if (loi) { console.log('✗ CÒN ' + loi + ' CHỖ ĐỂ SỬA\n'); process.exit(1); }
  console.log('✓ ĐƯỜNG DỰNG PHIM CHẠY TRỌN, TỆP RA ĐÚNG KHỔ VÀ ĐÚNG CÔNG THỨC\n');
})().catch(e => { console.error('✗ ' + e.stack); process.exit(1); });
