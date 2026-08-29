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

const B = process.env.BASE || 'http://localhost:4173';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:1440,height:1000}});
const errs=[]; p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
p.on('console',m=>m.type()==='error'&&errs.push(m.text().slice(0,150)));
let bad=0;
const ok=(n,c,x='')=>{ if(c) console.log(`  ✓ ${n}`); else {bad++;console.log(`  ✗ ${n}${x?` — ${x}`:''}`);} };
const tab=async n=>{await p.locator('aside nav button').filter({hasText:n}).first().click();await p.waitForTimeout(600);};

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
const hv=()=>p.locator('aside nav > div').first().locator('button').count();
const co=async id=>(await p.locator(`aside nav button[data-tab="${id}"]`).count())>0;
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

ok('không có lỗi trên bảng điều khiển', errs.length===0, errs.slice(0,2).join(' | '));
console.log(`\n  ${bad===0?'ĐẠT':`HỎNG — ${bad} lỗi`}\n`);
await b.close();
process.exit(bad?1:0);
