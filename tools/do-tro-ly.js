/* ═══════════════════════════════════════════════════════════════
   GITA 365 — ĐO TRỢ LÝ
   Chạy: xvfb-run -a node tools/do-tro-ly.js

   ĐO ĐỘ TRÚNG, KHÔNG ĐO ĐỘ CÓ TRẢ VỀ

   Bộ đo đầu tiên tôi viết đếm "trợ lý có trả về gì không" và ra
   20/20 = 100%. Con số ấy lừa: trợ lý LUÔN trả về mười hai tư liệu,
   vì chấm điểm theo từ khoá thì kho nào cũng có thứ gần giống.

   Nên bộ này khai với mỗi câu hỏi một KHO ĐÁNG LẼ PHẢI RA, và đếm
   xem kho ấy có nằm trong ba kết quả đầu không. Đo lần đầu: 1/20.

   Sau khi mở kho, khớp trọn tiếng và chấm theo độ hiếm: 10/20.

   VÌ SAO KHÔNG ĐẶT ĐÍCH 20/20

   Một bộ đo mà đạt điểm tuyệt đối thường là bộ đo đã được viết vừa
   khít với lời giải. Đích ở đây là KHÔNG TỤT: bản sau phải trúng
   bằng hoặc hơn bản trước, và ngày nào tụt thì phải biết ngay là
   tụt vì đâu.
   ═══════════════════════════════════════════════════════════════ */
const { chromium } = require(process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
/* Mỗi câu khai KHO ĐÁNG LẼ PHẢI TRÚNG. */
const HOI = [
  ['Coach một người phụ trách tối đa mấy nhà', 'BV_VAI'],
  ['Bàn làm việc của Coach có mấy ngăn', 'BLV'],
  ['Trần hoa hồng của đại sứ là bao nhiêu', 'HOAHONG'],
  ['Ký hợp đồng lao động thì dùng cấp chữ ký nào', 'HSH_KY'],
  ['Có bao nhiêu hợp đồng trong bộ hồ sơ', 'HSH_HD'],
  ['Điều khoản DK16 nói gì', 'HSH_DK'],
  ['Khách hàng xin xoá dữ liệu thì làm thế nào', 'PL_CO'],
  ['Bảy quyền của gia đình gồm những gì', 'PL_QUYEN'],
  ['Máy không được nhận những việc gì', 'TDH_CHAN'],
  ['Trần thông báo mỗi ngày là bao nhiêu', 'BTN_TRAN'],
  ['Ai đọc được bảng tin nội bộ', 'BTN_NGAN'],
  ['Super Admin mỗi ngày phải làm gì', 'STA_NHIP'],
  ['Mười tám virus của hành lang thành công', 'HL_VIRUS'],
  ['Sáu Nhịp gồm những nhịp nào', 'HL_SAUNHIP'],
  ['Chuẩn bằng chứng có mấy tính chất', 'BCD_TINHCHAT'],
  ['Bảy cửa trước khi ký kết là gì', 'KK_CUA'],
  ['Phụ huynh nói con tôi lười học thì trả lời sao', 'TINHHUONG'],
  ['Nhà mình không có thời gian thì làm thế nào', 'TINHHUONG'],
  ['Phác đồ cho trẻ mất tập trung', 'PHACDO'],
  ['Mô thức về dòng thời gian', 'MOTHUC'],
];
(async () => {
  const khoa = JSON.parse(fs.readFileSync('/home/user/Quang-GITA/kho/khoa.json','utf8')).khoa;
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.addInitScript(x => { window.GITA_KHOA = x; }, khoa);
  await p.goto('http://127.0.0.1:8099/index.html');
  await p.waitForFunction(() => window.G && window.G.doLogin, null, {timeout:30000});
  await p.evaluate(() => G.doLogin('coach@gita365.vn'));
  await p.waitForFunction(() => window.G.TDH_HE && typeof window.G.aiTra === 'function', null, {timeout:40000});
  const r = await p.evaluate((HOI) => HOI.map(function(h){
    var kq = G.aiTra(h[0]) || [];
    /* Trúng = kho đáng lẽ phải ra nằm trong 3 kết quả đầu */
    var top3 = kq.slice(0,3).map(function(x){ return (x.khoNguon||'') + '|' + x.loai + '|' + x.ma; });
    var trung = top3.some(function(s){ return s.indexOf(h[1]) >= 0; });
    return { hoi: h[0], can: h[1], so: kq.length, trung: trung,
      dau: kq.length ? (kq[0].loai + ' · ' + String(kq[0].ten).slice(0,40)) : '(trống)' };
  }), HOI);
  let t = 0; r.forEach(x => { if (x.trung) t++; });
  r.forEach(x => console.log((x.trung ? ' ✓ ' : ' ✗ ') + x.hoi +
    '\n     cần ' + x.can + ' · nhận ' + x.dau));
  const ti = Math.round(t/r.length*100);
  console.log('\nTRÚNG ' + t + '/' + r.length + ' = ' + ti + '%');
  /* MỐC KHÔNG ĐƯỢC TỤT. Đặt bằng đúng số đo được lúc dựng bộ này.
     Tụt xuống dưới là có người vừa làm hỏng phần tra kho — và lớp
     hỏng ấy im lặng, vì trợ lý vẫn trả lời, chỉ là trả lời sai. */
  const MOC = 10;
  if (t < MOC) {
    console.log('✗ TỤT so với mốc ' + MOC + '/' + r.length + ' — phần tra kho vừa hỏng ở đâu đó');
    await b.close(); process.exit(1);
  }
  console.log('✓ Không tụt so với mốc ' + MOC + '/' + r.length);
  await b.close();
})();
