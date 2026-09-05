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

   9.73 — CHỈ MỤC TỰ DÒ. Trợ lý thôi tra 30 kho khai tay mà dò lấy
   toàn bộ kho vai ấy được cấp: 833 kho · 18.140 bản ghi. Bộ đo mở
   từ 20 lên 40 câu, hai mươi câu thêm nhắm đúng phần vừa mở ra.

     20 câu cũ, chỉ mục cũ  : 10/20
     20 câu cũ, chỉ mục mới : 17/20
     40 câu, chỉ mục mới    : 28/40

   Mốc đặt lại theo số đo được, không theo số mong muốn.

   VÌ SAO KHÔNG ĐẶT ĐÍCH 20/20

   Một bộ đo mà đạt điểm tuyệt đối thường là bộ đo đã được viết vừa
   khít với lời giải. Đích ở đây là KHÔNG TỤT: bản sau phải trúng
   bằng hoặc hơn bản trước, và ngày nào tụt thì phải biết ngay là
   tụt vì đâu.
   ═══════════════════════════════════════════════════════════════ */
const { chromium } = require(process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const doiKhoXong = require('./doi-kho-xong');
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

  /* ── HAI MƯƠI CÂU THÊM Ở 9.73 ──
     Hai mươi câu đầu viết khi trợ lý tra được 30 kho. Nay nó tra 833
     kho, nên bộ đo cũ đo một góc quá hẹp: đạt cao trên đó không nói
     được gì về phần vừa mở ra.

     Hai mươi câu này nhắm vào kho TRƯỚC ĐÂY KHÔNG TRA ĐƯỢC. Viết
     trước khi chạy, không sửa sau khi thấy kết quả — bộ đo mà chỉnh
     theo lời giải thì chỉ còn đo chính nó. */
  ['Khiếu nại của khách đi theo mấy bước', 'NAM_BUOC_KHIEUNAI'],
  ['Mười hai nguyên tắc gồm những gì', 'MUOIHAI_NGUYENTAC'],
  ['Tầm nhìn của Học viện là gì', 'TAM_NHIN'],
  ['Học phí từng tầng bao nhiêu', 'HP_TANG'],
  ['Huy hiệu có những loại nào', 'HUYHIEU'],
  ['Chín khoá bất biến của hành lang', 'HL_KHOA9'],
  ['Mười hai luật hành lang thành công', 'HL_LUAT12'],
  ['Đại sứ có mấy bậc hoa hồng', 'HH_BAC'],
  ['Sổ tay quản trị có mấy nhóm màn', 'STA_NHOM'],
  ['Bảng vinh danh xét theo tiêu chí nào', 'BTN_VINHDANH'],
  ['Văn bản pháp lý cần soạn gồm những gì', 'RSP_VB'],
  ['Luật mới về dữ liệu cá nhân hiệu lực khi nào', 'RSP_LUATMOI'],
  ['Thao tác nào sinh ra bằng chứng', 'BCD_THAOTAC'],
  ['Cây quyết định chọn hợp đồng nào', 'KK_CHON'],
  ['Việc nào máy đã làm được rồi', 'TDH_HE'],
  ['Chín bậc thu nhập của nhân sự', 'HSH_BAC'],
  ['Nghi lễ trong nhà gồm những nghi lễ nào', 'NGHILE'],
  ['Bản đồ cá nhân có mấy nhịp', 'BDCN_NHIP'],
  ['Trò chơi hành trình quy đổi điểm thế nào', 'TG_QUYDOI'],
  ['Ngôn từ nào bị cấm khi nói với phụ huynh', 'NGONTU_RANH'],
];
(async () => {
  const khoa = JSON.parse(fs.readFileSync('/home/user/Quang-GITA/kho/khoa.json','utf8')).khoa;
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.addInitScript(x => { window.GITA_KHOA = x; }, khoa);
  await p.goto('http://127.0.0.1:8099/index.html');
  await p.waitForFunction(() => window.G && window.G.doLogin, null, {timeout:30000});
  await p.evaluate(() => G.doLogin('coach@gita365.vn'));
  await p.waitForFunction(() => typeof window.G.aiTra === 'function', null, {timeout:40000});
  /* Đợi KHO XONG HẲN, không đợi một cái tên — xem tools/doi-kho-xong.js.
     Chính bộ đo này ra 28/40 khi chạy riêng và 27/40 khi chạy trong đường
     phát hành, chỉ vì đo sớm mất một gói; mốc chặn đúng bằng 28 nên đường
     phát hành dừng ở một chỗ không hỏng. */
  console.log('  (kho đã mở ' + (await doiKhoXong(p)) + ' gói)');
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
  const MOC = 28;
  if (t < MOC) {
    console.log('✗ TỤT so với mốc ' + MOC + '/' + r.length + ' — phần tra kho vừa hỏng ở đâu đó');
    await b.close(); process.exit(1);
  }
  console.log('✓ Không tụt so với mốc ' + MOC + '/' + r.length);
  await b.close();
})();
