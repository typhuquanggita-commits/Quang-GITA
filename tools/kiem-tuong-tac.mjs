/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm TƯƠNG TÁC của bản web, không chỉ kiểm trang có dựng được.
 *
 * Vì sao cần bài này: bài kiem-ban-web.mjs chỉ xác nhận mỗi tab có nội dung và
 * không có lỗi trên bảng điều khiển. Nó sẽ vẫn xanh khi ô nhập ngừng lọc, nút
 * lọc ngừng đổi trạng thái, hay ô chọn ngừng liên động — đúng những chỗ dễ hỏng
 * nhất khi đổi thư viện render. Bài này bấm và gõ thật rồi kiểm kết quả.
 *
 * Chạy:  BASE=http://localhost:4173 node tools/kiem-tuong-tac.mjs
 */
import {chromium} from 'playwright';
import {moXemTruoc} from './mo-xem-truoc.mjs';

// Tự dựng máy chủ xem trước nếu chưa có. Đặt BASE=<địa chỉ> để dùng máy
// chủ có sẵn. Xem tools/mo-xem-truoc.mjs.
const {base: B, dong: dongXemTruoc} = await moXemTruoc();
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
/*
 * Phân quyền đã được BẬT, nên vai mặc định chỉ mở 32 trên 37 thẻ. Bài kiểm
 * chạy bằng vai mặc định sẽ bỏ sót năm thẻ vận hành mà không báo gì. Đặt
 * vai chủ nhiệm chuyên môn — vai duy nhất mở đủ 37 thẻ — trước khi trang
 * dựng, để phạm vi kiểm không bị phân quyền thu hẹp trong im lặng.
 */
const ctx = await b.newContext({viewport:{width:1440,height:1000}});
await ctx.addInitScript(() => {
  try {
    localStorage.setItem('engwin365.vai.v1', 'gv-5');
  } catch {
    /* chặn ghi thì chạy bằng vai mặc định; bài kiểm sẽ báo thiếu thẻ */
  }
});
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
p.on('console',m=>m.type()==='error'&&errs.push(m.text().slice(0,150)));
let bad=0;
const ok=(n,c,x='')=>{ if(c) console.log(`  ✓ ${n}`); else {bad++;console.log(`  ✗ ${n}${x?` — ${x}`:''}`);} };
const tab=async n=>{await p.locator('aside nav [data-tab]').filter({hasText:n}).first().click();await p.waitForTimeout(600);};

await p.goto(B,{waitUntil:'networkidle'});
console.log('\n  KIỂM TƯƠNG TÁC SÂU\n');

// 1. Ô nhập số + lọc dẫn xuất (Hồ sơ 365 ngày)
await tab('Hồ sơ 365 ngày');
await p.locator('#dossier-jump').fill('100');
await p.waitForTimeout(400);
ok('ô nhập số lọc đúng', (await p.locator('h4').count())===7, `thấy ${await p.locator('h4').count()}`);
const t100=(await p.locator('h4').first().textContent())||'';
ok('nhảy tới đúng ngày 100', /VÒNG 5/.test(t100), t100);
await p.getByRole('button',{name:'Xoá'}).click(); await p.waitForTimeout(400);
ok('nút xoá khôi phục danh sách', (await p.locator('h4').count())===90);

// 2. Nút lọc đổi trạng thái (quý)
const truocQuy=(await p.locator('h3').allTextContents()).join(' | ');
await p.getByRole('button',{name:/^Quý 3/}).click(); await p.waitForTimeout(600);
const sauQuy=(await p.locator('h3').allTextContents()).join(' | ');
ok('đổi quý cập nhật nội dung',
   /QUÝ 3/.test(sauQuy) && !/QUÝ 1/.test(sauQuy) && truocQuy!==sauQuy,
   sauQuy.slice(0,90));
const ngayQ3=(await p.locator('h4').first().textContent())||'';
ok('ngày đầu quý 3 đúng vòng 9', /VÒNG 9/.test(ngayQ3), ngayQ3);

// 3. Hai ô chọn liên động (Đánh giá — kho giải pháp)
await tab('Đánh giá định kỳ');
await p.getByRole('button',{name:'Kho 1.000 giải pháp'}).click(); await p.waitForTimeout(600);
const truoc=(await p.locator('h2, p').allTextContents()).join(' ');
await p.selectOption('#sy-pick',{index:5});
await p.selectOption('#lv-pick',{index:20});
await p.waitForTimeout(500);
const sau=(await p.locator('p').allTextContents()).join(' ');
ok('đổi ô chọn làm đơn kê đổi theo', truoc!==sau);
ok('đơn kê không còn số âm', !/-\d/.test(sau));
ok('cấp hiển thị trong 1–5', /cấp [1-5]\/5/.test(sau), (sau.match(/cấp [^ ]+/)||[''])[0]);

// 4. Bộ lọc theo kỹ năng đổi danh sách triệu chứng
await p.getByRole('button',{name:/^Phát âm/}).click(); await p.waitForTimeout(400);
const opts=await p.locator('#sy-pick option').count();
ok('lọc kỹ năng thu hẹp danh sách', opts===5, `thấy ${opts} lựa chọn`);

// 5. Accordion mở/đóng (bộ đề)
await p.getByRole('button',{name:'Bốn bộ đề'}).click(); await p.waitForTimeout(500);
const trg=p.locator('button, summary').filter({hasText:'BÀI RA VÒNG — ĐO TỰ ĐỘNG HOÁ'}).first();
const trc=(await p.locator('table').count());
await trg.click(); await p.waitForTimeout(500);
ok('accordion mở ra thêm nội dung', (await p.locator('table').count())>trc);

// 6. Biểu mẫu có lưu trạng thái (Kế hoạch của tôi)
await tab('Kế hoạch của tôi');
const radio=p.locator('input[type=radio], button').filter({hasText:/./});
const btns=await p.locator('main button, div.min-w-0 button').count();
ok('tab kế hoạch dựng được điều khiển', btns>5, `${btns} nút`);

// 7. Bộ lọc tuyến phải THẬT SỰ ẩn mục, không chỉ đổi màu nút
//    Lưu ý: innerText trả về chữ đã hoa theo CSS uppercase, nên các biểu thức
//    so khớp tiêu đề bên dưới đều dùng cờ i.
const hv=()=>p.locator('aside nav > div').first().locator('[data-tab]').count();
const co=async id=>(await p.locator(`aside nav [data-tab="${id}"]`).count())>0;
const locTuyen=async n=>{await p.locator('aside').getByRole('button',{name:n,exact:true}).click();await p.waitForTimeout(400);};

const caHai=await hv();
ok('mặc định hiện đủ mục học viên', caHai>=20, `thấy ${caHai}`);
ok('có bộ lọc tuyến trên thanh bên', await p.locator('aside').getByText('Tuyến của tôi').count()>0);

await locTuyen('Chuyên Anh');
const chuyenN=await hv();
ok('chọn tuyến chuyên thì số mục giảm', chuyenN<caHai, `${chuyenN} so với ${caHai}`);
ok('tuyến chuyên vẫn thấy mục luyện thi chuyên', await co('chuyen'));
ok('tuyến chuyên ẩn mục Lộ trình 36 tháng', !(await co('roadmap')));
ok('tuyến chuyên ẩn mục Hồ sơ 365 ngày', !(await co('dossier')));
ok('có báo số mục đang ẩn', await p.locator('aside').getByText(/Đang ẩn \d+ mục/).count()>0);

await locTuyen('IELTS 8.0');
ok('tuyến IELTS thấy lại mục Lộ trình', await co('roadmap'));
ok('tuyến IELTS ẩn mục luyện thi chuyên', !(await co('chuyen')));
ok('tuyến IELTS ẩn mục Thi tốt nghiệp', !(await co('exams')));

await locTuyen('Cả hai');
ok('bỏ lọc thì mục quay lại đủ', (await hv())===caHai);

// 8. Tab Hai tuyến — bảng phân kỳ và phần tinh tuý
await tab('Hai tuyến');
ok('bảng phân kỳ có đủ 10 trục', (await p.locator('table tbody tr').count())===10, `${await p.locator('table tbody tr').count()} dòng`);
await p.locator('main').getByRole('button',{name:'Phần dùng chung',exact:true}).click(); await p.waitForTimeout(400);
ok('phần dùng chung có 7 mục', (await p.locator('main h3').count())===7, `${await p.locator('main h3').count()}`);
await p.locator('main').getByRole('button',{name:'Phần tinh tuý',exact:true}).click(); await p.waitForTimeout(500);
const tuyIelts=await p.locator('main').innerText();
ok('tinh tuý IELTS ghi lõi 55 phút', /Lõi ngày — 55 phút/i.test(tuyIelts));
ok('tinh tuý IELTS có 7 đòn bẩy', /7 đòn bẩy/i.test(tuyIelts));
await p.locator('main').getByRole('button',{name:/TUYẾN CHUYÊN ANH/}).click(); await p.waitForTimeout(500);
const tuyChuyen=await p.locator('main').innerText();
ok('đổi sang tuyến chuyên thì lõi thành 70 phút', /Lõi ngày — 70 phút/i.test(tuyChuyen));
ok('tinh tuý chuyên có 9 đòn bẩy', /9 đòn bẩy/i.test(tuyChuyen));
ok('tinh tuý chuyên hiện nhịp bốn bậc', /90\s*phút\/ngày/.test(tuyChuyen));

// 9. Ô tìm kiếm toàn hệ thống
await p.keyboard.press('Control+k'); await p.waitForTimeout(1200);
ok('Ctrl+K mở ô tìm', (await p.locator('[role=dialog]').count())===1);
ok('chỉ mục nạp xong', /\d[\d.]{2,}\s*mẩu nội dung/.test(await p.locator('[role=dialog]').innerText()));
await p.keyboard.type('phat am'); await p.waitForTimeout(700);
const soKq=await p.locator('[data-hang]').count();
ok('gõ KHÔNG DẤU vẫn ra kết quả', soKq>3, `${soKq} kết quả`);
ok('kết quả trả về đúng chữ có dấu', /phát âm/i.test(await p.locator('[role=dialog]').innerText()));
await p.keyboard.press('ArrowDown'); await p.waitForTimeout(200);
await p.keyboard.press('Enter'); await p.waitForTimeout(900);
ok('Enter đóng ô tìm và nhảy tới mục', (await p.locator('[role=dialog]').count())===0);
await p.keyboard.press('Control+k'); await p.waitForTimeout(400);
await p.keyboard.type('ngay 100'); await p.waitForTimeout(700);
ok('tìm được một ngày trong hồ sơ 365', /Ngày 100/.test(await p.locator('[role=dialog]').innerText()));
await p.locator('[data-hang="0"]').click(); await p.waitForTimeout(900);
ok('bấm kết quả nhảy đúng tab Hồ sơ', /VÒNG/.test(await p.locator('main').innerText()));
await p.keyboard.press('Control+k'); await p.waitForTimeout(300);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
ok('Esc đóng ô tìm', (await p.locator('[role=dialog]').count())===0);

// 10. Làm phiếu → chấm → xem đáp án → lưu vào hồ sơ → lộ trình cá nhân hoá
await tab('Phiếu luyện');
await p.locator('main').getByRole('button',{name:'Làm · chấm · xem đáp án',exact:true}).click();
await p.waitForTimeout(600);
ok('mở được phần làm và chấm', (await p.locator('input[type=range]').count())===5);
const truocGiai=await p.locator('main').innerText();
ok('chưa bấm thì CHƯA hiện đáp án', !/Dạng này kiểm gì/i.test(truocGiai));
await p.getByRole('button',{name:'Xem đáp án và phân tích'}).click();
await p.waitForTimeout(500);
const sauGiai=await p.locator('main').innerText();
ok('bấm rồi thì hiện bộ giải', /Dạng này kiểm gì/i.test(sauGiai));
ok('bộ giải có phân tích theo phần', /Phân tích theo phần/i.test(sauGiai));
await p.getByRole('button',{name:'Lưu lần làm này vào hồ sơ'}).click();
await p.waitForTimeout(500);
ok('lưu được vào hồ sơ', /Đã lưu/.test(await p.locator('main').innerText()));

await tab('Hồ sơ của tôi');
await p.waitForTimeout(700);
const hs=await p.locator('main').innerText();
ok('hồ sơ nhận được bản ghi vừa lưu', /lần làm/i.test(hs) && !/Hồ sơ đang trống/i.test(hs));
ok('hồ sơ hiện lịch sử', /Lịch sử/i.test(hs));

// 11. Bộ phiếu chuyên đề: bảy phiếu và phiếu giải mở theo yêu cầu
await tab('Bộ phiếu chuyên đề');
await p.waitForTimeout(700);
const cd=await p.locator('main').innerText();
ok('chuyên đề có đủ bảy loại phiếu', (await p.getByRole('button',{name:'Xem đáp án và bảng phân tích'}).count())===7);
// Không so bằng cụm "bảng phân tích chuyên sâu": cụm đó có sẵn trong phần
// giới thiệu của tab. Cột "Hay nhầm với" chỉ tồn tại trong chính bảng.
ok('chưa mở thì chưa có bảng phân tích', !/Hay nhầm với/i.test(cd));
await p.getByRole('button',{name:'Xem đáp án và bảng phân tích'}).first().click();
await p.waitForTimeout(400);
const cd2=await p.locator('main').innerText();
ok('mở phiếu giải thì hiện bảng phân tích chuyên sâu', /Bảng phân tích chuyên sâu/i.test(cd2));
ok('bảng phân tích có cột hay nhầm với', /Hay nhầm với/i.test(cd2));

// 12. Làm bài: chọn sai một câu rồi chấm, phải nhận lại nhận xét CỦA CHÍNH Ô
//     mình chọn chứ không phải một lời giải chung cho cả câu.
await tab('Làm bài');
await p.waitForTimeout(700);
const lb0 = await p.locator('main').innerText();
// Không so bằng cụm có sẵn trong phần giới thiệu tab. Dấu "Lời giải —" chỉ
// xuất hiện trong khối đáp án của một câu đã mở, nên nó mới là bằng chứng.
ok('chưa chấm thì chưa hiện lời giải câu nào', !/Lời giải —/.test(lb0));
ok('nút chấm bị khoá khi chưa chọn câu nào',
   await p.getByRole('button', {name: 'Chấm và xem đáp án'}).isDisabled());

// Chọn ô A ở câu 1. Ô A đúng hay sai tuỳ chuyên đề, nên bài kiểm không đoán:
// nó đọc lại trạng thái sau khi chấm và kiểm đúng cái đã xảy ra.
const cau1 = p.locator('main .rounded-2xl').filter({hasText: 'Câu 1'}).first();
await cau1.locator('button').nth(1).click();
await p.waitForTimeout(300);
ok('nút chấm mở khoá sau khi chọn',
   !(await p.getByRole('button', {name: 'Chấm và xem đáp án'}).isDisabled()));

await p.getByRole('button', {name: 'Xem đáp án câu này'}).first().click();
await p.waitForTimeout(400);
const le = await cau1.innerText();
ok('xem đáp án một câu thì hiện lời giải của đúng câu đó', /Lời giải —/.test(le));
ok('xem đáp án một câu không mở luôn cả phiếu',
   (await p.locator('main').innerText()).split('Lời giải —').length - 1 === 1);
ok('câu đã mở có điểm kiến thức', /Điểm kiến thức —/.test(le));
// Bốn nhận xét cho bốn ô là lời hứa chính của ngân hàng. Đếm dòng nhận xét
// trong đúng câu vừa mở, chứ không tìm chữ ở đâu đó trên trang.
ok('câu đã mở hiện đủ bốn nhận xét cho bốn ô',
   (await cau1.locator('p.pl-9').count()) === 4);

await p.getByRole('button', {name: 'Chấm và xem đáp án'}).click();
await p.waitForTimeout(500);
const sauCham = await p.locator('main').innerText();
ok('chấm xong báo tỉ lệ đúng', /đúng \d+\/\d+/.test(sauCham), sauCham.slice(0, 80));
ok('chấm xong đưa hướng đi tiếp',
   /Nâng cấp độ|Thử thách tiếp|Làm lại/.test(sauCham));
ok('chấm xong nút đổi thành đã chấm',
   (await p.getByRole('button', {name: 'Đã chấm'}).count()) === 1);
// Nút "Xoá lịch sử" chỉ dựng khi đã có ít nhất một lượt được ghi, nên sự
// tồn tại của nó là bằng chứng lượt đã vào kho, khác với chữ "lượt" vốn có
// sẵn ở phần thống kê đầu tab.
ok('lượt vừa chấm được ghi vào lịch sử',
   (await p.getByRole('button', {name: 'Xoá lịch sử'}).count()) === 1);
// Mới một lượt thì hệ thống PHẢI nói chưa đủ và PHẢI KHÔNG kết luận chuyên
// đề nào yếu. Hai vế, không phải một trong hai.
ok('chưa đủ dữ liệu thì nói thẳng là chưa đủ', /Chưa đủ 3 lượt/.test(sauCham));
ok('chưa đủ dữ liệu thì không kết luận chuyên đề yếu',
   !/Chuyên đề yếu nhất/.test(sauCham));

await p.getByRole('button', {name: 'Làm lại'}).click();
await p.waitForTimeout(400);
const lai = await p.locator('main').innerText();
ok('làm lại xoá hết đáp án đã mở', !/Lời giải —/.test(lai));
ok('làm lại giữ nguyên lịch sử đã lưu', /trung bình/i.test(lai));

// 13. PHÂN QUYỀN ĐANG BẬT THẬT, KHÔNG PHẢI CHỈ MÔ TẢ.
//     Bài kiểm này chạy trên MỘT TRÌNH DUYỆT RIÊNG với vai mặc định, vì
//     phiên hiện tại đã đặt vai gv-5 để quét đủ thẻ.
{
  const ctx2 = await b.newContext({viewport: {width: 1440, height: 1000}});
  const p2 = await ctx2.newPage();
  await p2.goto(B, {waitUntil: 'networkidle'});

  const dem = async (pg) => (await pg.locator('aside nav [data-tab]').count());
  const co = async (pg, id) =>
    (await pg.locator(`aside nav [data-tab="${id}"]`).count()) > 0;

  /*
   * Không gõ cứng con số. Thêm một thẻ mới là con số đổi, và một bài kiểm
   * đỏ vì lý do đó chỉ dạy người ta sửa con số cho xanh. Cái đáng giữ là
   * QUAN HỆ: vai mặc định phải mở ÍT hơn tổng số thẻ, còn vai chủ nhiệm
   * chuyên môn phải mở ĐỦ. Quan hệ đó vỡ thì mới là phân quyền hỏng thật.
   */
  const tongThe = await p.locator('aside nav [data-tab]').count();
  const soMacDinh = await dem(p2);
  ok('vai mặc định mở ít thẻ hơn tổng — phân quyền có tác dụng thật',
     soMacDinh > 0 && soMacDinh < tongThe, `mặc định ${soMacDinh} / tổng ${tongThe}`);
  ok('vai mặc định KHÔNG thấy thẻ Chấm bài', !(await co(p2, 'grading')));
  ok('vai mặc định KHÔNG thấy thẻ Xưởng học liệu', !(await co(p2, 'studio')));
  ok('vai mặc định vẫn thấy thẻ học của mình', await co(p2, 'phieu'));

  // Thẻ bị chặn phải KHÔNG được dựng, chứ không phải dựng rồi che đi.
  const html = await p2.content();
  ok('thẻ bị chặn không nằm trong cây DOM dưới dạng bị ẩn',
     !html.includes('data-tab="grading"'));

  // Dải vai phải nói rõ đang ẩn bao nhiêu, không ẩn lặng lẽ.
  const dai = await p2.locator('aside').innerText();
  ok('dải vai nói rõ vai đang dùng', /Vai đang dùng/i.test(dai));
  ok('dải vai đếm đúng số thẻ đang ẩn',
     new RegExp(`ẩn ${tongThe - soMacDinh}`).test(dai), dai.slice(0, 200));

  // Đổi sang vai chủ nhiệm chuyên môn thì mở đủ 37.
  await p2.getByRole('button', {name: 'Đổi vai'}).click();
  await p2.waitForTimeout(300);
  await p2.locator('button[data-vai="gv-5"]').click();
  await p2.waitForTimeout(500);
  const soGv5 = await dem(p2);
  ok('đổi sang CHỦ NHIỆM CHUYÊN MÔN thì mở ĐỦ mọi thẻ',
     soGv5 === tongThe, `thấy ${soGv5} / tổng ${tongThe}`);
  ok('vai gv-5 thấy được thẻ Chấm bài', await co(p2, 'grading'));

  // SUPER ADMIN phải thấy ÍT thẻ hơn coach — quyền kỹ thuật không kèm quyền
  // chuyên môn. Đây là luật quan trọng nhất của bảng, nên phải có bài kiểm.
  await p2.getByRole('button', {name: 'Đổi vai'}).click();
  await p2.waitForTimeout(300);
  await p2.locator('button[data-vai="qt-3"]').click();
  await p2.waitForTimeout(500);
  const soSuper = await dem(p2);
  ok('SUPER ADMIN thấy ít thẻ hơn CHỦ NHIỆM CHUYÊN MÔN',
     soSuper < soGv5, `super ${soSuper} vs coach ${soGv5}`);
  ok('SUPER ADMIN KHÔNG thấy thẻ Chấm bài', !(await co(p2, 'grading')));
  ok('SUPER ADMIN KHÔNG thấy thẻ Làm bài', !(await co(p2, 'lambai')));

  // Vai phải sống qua lần nạp lại trang.
  await p2.reload({waitUntil: 'networkidle'});
  ok('vai còn nguyên sau khi nạp lại trang', (await dem(p2)) === soSuper);

  // Và phải nói thẳng đây không phải bảo mật.
  await p2.getByRole('button', {name: 'Đổi vai'}).click();
  await p2.waitForTimeout(300);
  const loiCanhBao = await p2.locator('aside').innerText();
  ok('nói thẳng đổi vai KHÔNG phải đổi quyền thật',
     /không phải đổi quyền thật/i.test(loiCanhBao));

  await ctx2.close();
}

ok('không có lỗi trên bảng điều khiển', errs.length===0, errs.slice(0,2).join(' | '));
console.log(`\n  ${bad===0?'ĐẠT':`HỎNG — ${bad} lỗi`}\n`);
await b.close();
dongXemTruoc(), process.exit(bad?1:0);
