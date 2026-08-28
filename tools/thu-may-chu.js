/* ═══════════════════════════════════════════════════════════════
   GITA 365 — THỬ MÁY CHỦ TRƯỚC KHI ĐƯA LÊN GOOGLE

       node tools/thu-may-chu.js

   Máy chủ của GITA chạy trên Google Apps Script, mà Apps Script thì
   không thử được ở máy: không có trình chạy, không có bước gỡ lỗi tử tế,
   và mỗi lần sai là phải sửa trực tiếp trên bản đang chạy thật.

   Tệp này dựng một bản giả lập tối thiểu của Apps Script — bảng tính,
   Script Properties, Cache, thư điện tử — rồi chạy toàn bộ mã trong
   thư mục server/ trên đó. Nhờ vậy luồng đăng ký, OTP, kích hoạt, nâng
   tầng và cấp khoá đều được soi ở máy trước, thay vì soi trên đầu
   khách hàng thật.

   Đây KHÔNG thay thế một lần chạy thử trên máy chủ thật sau khi triển
   khai. Nó chỉ bắt những lỗi bắt được sớm.
   ═══════════════════════════════════════════════════════════════ */
/* Cố ý KHÔNG bật 'use strict': mã Apps Script được nạp bằng eval và cần
   khai báo hàm ra phạm vi chung, đúng như cách Apps Script nạp các tệp .gs. */
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const fs = require('fs'), crypto = require('crypto');
const props={}, cache={};
let thu=[];
global.PropertiesService={getScriptProperties:()=>({
  getProperty:k=>props[k]===undefined?null:props[k], setProperty:(k,v)=>{props[k]=String(v);}})};
global.CacheService={getScriptCache:()=>({
  get:k=>cache[k]===undefined?null:cache[k], put:(k,v)=>{cache[k]=String(v);}, remove:k=>{delete cache[k];}})};
global.Utilities={
  getUuid:()=>crypto.randomUUID(),
  DigestAlgorithm:{SHA_256:'SHA-256'}, Charset:{UTF_8:'utf8'},
  computeDigest:(a,s)=>Array.from(crypto.createHash('sha256').update(s,'utf8').digest())
    .map(b=>b>127?b-256:b)
};
global.MailApp={sendEmail:(to,cd,than)=>{thu.push({to,cd,than});}};
global.Logger={log:()=>{}};
global.ContentService={createTextOutput:t=>({setMimeType:()=>({_:t}),_:t}),MimeType:{JSON:'json'}};
/* Drive giả lập: bốn thư mục có thật, và một cái CỐ TÌNH chỉ cho xem —
   để bộ kiểm chứng minh nó phát hiện được thư mục không ghi được, chứ không
   phải chỉ báo xanh vì mọi thứ đều dễ. */
const thuMuc = {
  '1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU': {ten:'Dữ Liệu GITA365', ghiDuoc:true, tep:[]},
  '1jVOnIH7286glI95fC4aqfXApecxEj7Xz': {ten:'Mã máy chủ GITA365', ghiDuoc:true, tep:[]}
};
global.MimeType={PLAIN_TEXT:'text/plain'};
global.Session={getEffectiveUser:()=>({getEmail:()=>'typhuquanggita@gmail.com'})};
global.DriveApp={
  getFolderById:id=>{
    const t=thuMuc[id];
    if(!t) throw new Error('Không tìm thấy thư mục: '+id);
    return {
      getName:()=>t.ten,
      addFile:()=>{},
      createFile:(ten,noi)=>{
        if(!t.ghiDuoc) throw new Error('Không có quyền ghi');
        const f={ten, bo:false};
        t.tep.push(f);
        return {setTrashed:v=>{f.bo=v;}, getName:()=>ten};
      }
    };
  },
  getFileById:()=>({})
};
global.__thuMuc=thuMuc;

/* Bảng tính giả: mỗi trang là một mảng hàng */
const trang={};
function moTrang(ten){
  if(!trang[ten]) trang[ten]=[];
  const t=trang[ten];
  return {
    getName:()=>ten,
    appendRow:h=>{t.push(h.slice());},
    getDataRange:()=>({getValues:()=>t.map(r=>r.slice())}),
    getLastRow:()=>t.length,
    setFrozenRows:()=>{},
    getRange:(d,c,nr,nc)=>({setValues:v=>{t[d-1]=v[0].slice();}})
  };
}
const so={
  getId:()=>'SO-GIA-LAP',
  getSheetByName:n=>trang[n]?moTrang(n):null,
  insertSheet:n=>{trang[n]=[];return moTrang(n);},
  getSheets:()=>Object.keys(trang).map(moTrang),
  deleteSheet:s=>{delete trang[s.getName()];}
};
global.SpreadsheetApp={create:()=>so, openById:()=>so};

/* Nạp mã máy chủ */
/* Chạy được trên cả hai bản: bảy tệp rời, hoặc tệp gộp dán một lần.
   node tools/thu-may-chu.js --gop  → thử bản gộp.
   Bản gộp là thứ anh Quang dán lên Apps Script, nên nó phải được thử
   bằng chính bộ này chứ không suy ra từ bản bảy tệp. */
if (process.argv.indexOf('--gop') >= 0) {
  eval(fs.readFileSync('server/GITA365_TATCA.gs', 'utf8'));
} else {
  for (const f of ['GITA_Nen.gs','GITA_CapPhep.gs','GITA_DangKy.gs','GITA_MatKhau.gs',
                   'GITA_TaiLieu.gs','GITA_DongBo.gs','GITA_XuatSheet.gs'])
    eval(fs.readFileSync('server/'+f,'utf8'));
}

const H={thu:()=>thu, xoaThu:()=>{thu=[];}, props, trang};

let loi=0;
const bao=(ok,ten,ct)=>{ if(!ok)loi++; console.log((ok?'  ✓ ':'  ✗ ')+ten+(ct?' — '+ct:'')); };

console.log('\nTHỬ MÁY CHỦ GITA 365 TRÊN BẢN GIẢ LẬP' +
  (process.argv.indexOf('--gop') >= 0 ? ' · BẢN GỘP MỘT TỆP' : ' · BẢY TỆP RỜI') + '\n');
console.log('1 · CÀI ĐẶT LẦN ĐẦU');
const cd = caiDatLanDau();
bao(/Đã dựng 8 bảng/.test(cd), 'dựng đủ 8 bảng dữ liệu');
bao(/Đã tạo Admin@gita365/.test(cd), 'tạo được tài khoản Super Admin');
const mkTam = (cd.match(/Mật khẩu tạm: (\S+)/) || [])[1];
bao(!!mkTam && mkTam.length >= 20, 'sinh mật khẩu tạm ngẫu nhiên, đủ dài', mkTam);
/* Sinh nhiều lần rồi soi tất cả. Thử một lần thì một âm tiết hỏng nằm lẫn
   trong danh sách chỉ thỉnh thoảng mới lộ ra — và bộ kiểm thỉnh thoảng mới
   đúng là bộ kiểm không dùng được. */
const KHUON = /^([A-Z][a-z]{2,}-){5}\d{4}$/;
const mau = []; for (let i = 0; i < 400; i++) mau.push(gitaMatKhauTam_());
const hong = mau.filter(x => !KHUON.test(x));
bao(KHUON.test(mkTam || ''), 'mật khẩu tạm đọc và chép lại được');
bao(hong.length === 0, '400 lần sinh, lần nào cũng đúng khuôn', hong.slice(0,3).join(' · ') || 'sạch');
bao(new Set(mau).size >= 395, '400 lần sinh ra gần như không trùng nhau',
  new Set(mau).size + ' mật khẩu khác nhau');
const nguon = fs.readdirSync('server').filter(f=>f.endsWith('.gs'))
  .map(f=>fs.readFileSync('server/'+f,'utf8')).join('');
bao(!/toiyeugita365/.test(nguon), 'KHÔNG còn mật khẩu nào nằm cứng trong mã nguồn');
bao(mkTam !== gitaMatKhauTam_(), 'hai lần sinh ra hai mật khẩu khác nhau');
bao(/không tạo lại/.test(taoTaiKhoanKhoiDau()), 'chạy lại không tạo trùng tài khoản');

console.log('\n2 · ĐĂNG NHẬP');
bao(!gitaDangNhap_({u:'Admin@gita365', mk:'sai-mat-khau'}).ok, 'sai mật khẩu thì từ chối');
bao(!gitaDangNhap_({u:'khongcó@gita365.vn', mk:'x'}).ok, 'tài khoản không có thì từ chối');
const dn = gitaDangNhap_({u:'Admin@gita365', mk:mkTam});
bao(dn.ok && dn.token, 'mật khẩu tạm đăng nhập được', dn.ok?dn.hoSo.role+' · '+dn.hoSo.maKhachHang:'');
bao(dn.phaiDoiMk === true, 'đăng nhập báo rõ đang dùng mật khẩu tạm');
bao(!!readSession_(dn.token), 'phiên đọc lại được');
bao(!readSession_('token-bia-dat'), 'token bịa đặt thì không có phiên');

console.log('\n3 · ĐĂNG KÝ · OTP · KÍCH HOẠT');
H.xoaThu();
const hoSo={hoTen:'Nguyễn Văn A', email:'phuhuynh.thu@gmail.com', dienThoai:'0912345678',
  tenCon:'Nguyễn Minh An', lop:'Lớp 9', tinh:'Hà Nội', maGioiThieu:'CTV-007'};
bao(!gitaDangKy_({hoSo:Object.assign({},hoSo,{email:'sai-email'})}).ok, 'email sai định dạng thì từ chối');
bao(!gitaDangKy_({hoSo:Object.assign({},hoSo,{dienThoai:'123'})}).ok, 'số điện thoại sai thì từ chối');
const dk = gitaDangKy_({hoSo});
bao(dk.ok, 'gửi đăng ký thành công');
const thuOtp = H.thu().slice(-1)[0];
const ma = (thuOtp.than.match(/là: (\d{6})/)||[])[1];
bao(!!ma, 'thư OTP có mã sáu số', ma);
bao(!/\b'+ma+'\b/.test(JSON.stringify(H.trang.dangKyCho)), 'mã KHÔNG lưu dạng đọc được trong bảng');

bao(!gitaXacThucOtp_({email:hoSo.email, ma:'000000'}).ok, 'mã sai thì từ chối');
for(let i=0;i<4;i++) gitaXacThucOtp_({email:hoSo.email, ma:'000000'});
const huy = gitaXacThucOtp_({email:hoSo.email, ma:ma});
bao(!huy.ok && /huỷ/.test(huy.error), 'sai năm lần thì mã bị huỷ', huy.error);

const lai = gitaGuiLaiOtp_({email:hoSo.email});
bao(lai.ok, 'xin lại được mã mới');
const ma2 = (H.thu().slice(-1)[0].than.match(/của anh chị: (\d{6})/)||[])[1];
const xt = gitaXacThucOtp_({email:hoSo.email, ma:ma2});
bao(xt.ok, 'mã mới đúng thì qua', xt.thongBao);
const lien = H.thu().slice(-1)[0].than.match(/#kichhoat=(\S+)/);
bao(!!lien, 'thư kích hoạt có đường dẫn');

bao(!gitaKichHoat_({token:lien[1], mk:'ngan'}).ok, 'mật khẩu ngắn thì không kích hoạt được');
const kh = gitaKichHoat_({token:lien[1], mk:'GiaDinh2026#'});
bao(kh.ok && /^GITA-\d{4}$/.test(kh.maKhachHang||''), 'kích hoạt xong có mã số khách hàng', kh.maKhachHang);
bao(!gitaKichHoat_({token:lien[1], mk:'GiaDinh2026#'}).ok, 'đường dẫn dùng một lần, không dùng lại được');

const dn2 = gitaDangNhap_({u:hoSo.email, mk:'GiaDinh2026#'});
bao(dn2.ok && dn2.hoSo.role==='R13', 'tài khoản mới đăng nhập được, đúng vai phụ huynh');

const trung = gitaDangKy_({hoSo});
bao(trung.ok && /Nếu email này chưa có tài khoản/.test(trung.thongBao),
  'email đã có tài khoản: trả lời y hệt, không lộ danh sách khách');

console.log('\n4 · PHẠM VI CẤP PHÉP');
const ph = kiemTraPhien_(dn2.token, hoSo.email);
bao(ph && ph.role==='R13', 'đọc được hồ sơ phiên của phụ huynh');
bao(gitaPhamViCapPhep({role:'R13', tier:0}).join()==='nen', 'nhà chưa vào tầng: chỉ gói nền');
bao(gitaPhamViCapPhep({role:'R13', tier:2}).join()==='nen,tang1,tang2', 'nhà tầng 2: nền + tầng 1,2');
bao(gitaPhamViCapPhep({role:'R07', tier:0}).length===7, 'Coach: đủ bảy gói');
bao(gitaPhamViCapPhep({role:'R15', tier:5}).join()==='nen', 'cộng tác viên: chỉ gói nền');

console.log('\n5 · NÂNG TẦNG');
const hv = Store.all('students')[0];
const admin = kiemTraPhien_(dn.token, 'Admin@gita365');
let r = gitaNangTang_({maHocVien:hv.id, tang:1, maKhachHang:kh.maKhachHang}, admin);
bao(!r.ok && /KPI/.test(r.error), 'KPI chưa đủ thì không nâng tầng', r.error);
Store.update('students', hv.id, {kpi:88});
r = gitaNangTang_({maHocVien:hv.id, tang:1, maKhachHang:kh.maKhachHang}, admin);
bao(!r.ok && /thanh toán/.test(r.error), 'chưa xác nhận thanh toán thì không nâng tầng');
Store.insert('thanhToan', {id:'TT1', maKhachHang:kh.maKhachHang, tier:1, soTien:5000000,
  trangThai:'daXacNhan', nguoiDuyet:'Admin', luc:new Date().toISOString(), ghiChu:''});
r = gitaNangTang_({maHocVien:hv.id, tang:1, maKhachHang:kh.maKhachHang}, admin);
bao(r.ok && r.tang===1, 'đủ cả KPI và thanh toán thì nâng tầng');
r = gitaNangTang_({maHocVien:hv.id, tang:3, maKhachHang:kh.maKhachHang}, admin);
bao(!r.ok && /một tầng/.test(r.error), 'không nhảy tầng — mỗi lần một bậc');
const tuVan = {role:'R11', phien:{uid:'x'}, u:'tv'};
bao(!gitaNangTang_({maHocVien:hv.id, tang:2, maKhachHang:kh.maKhachHang}, tuVan).ok,
  'Tư vấn không nâng tầng được — chỉ R01–R03');

console.log('\n6 · MẬT KHẨU');
bao(checkPwStrength_('abc')!==true, 'mật khẩu ngắn bị chặn');
bao(checkPwStrength_('gita365abc1')!==true, 'mật khẩu chứa chuỗi dễ đoán bị chặn');
bao(checkPwStrength_('MotNhaBinhYen2026')===true, 'mật khẩu đủ mạnh thì qua');
bao(safeEqual_(hashPw_('a','m'), hashPw_('a','m')), 'băm ổn định với cùng muối');
bao(!safeEqual_(hashPw_('a','m1'), hashPw_('a','m2')), 'muối khác thì băm khác');

console.log('\n7 · NHẬT KÝ');
bao(Store.all('audit').length>=5, 'mọi việc đều vào nhật ký', Store.all('audit').length+' dòng');
bao(Store.all('audit').some(x=>x.viec==='DANG_KY_XONG'), 'có dòng đăng ký hoàn tất');
bao(Store.all('audit').some(x=>x.viec==='NANG_TANG'), 'có dòng nâng tầng');

console.log('\n8 · CỬA VÀO doPost');
const goi = y => JSON.parse(doPost({postData:{contents:JSON.stringify(y)}})._);
bao(!goi({fn:'viecLa'}).ok, 'việc không có trong danh sách thì từ chối');
bao(!goi({fn:'capKhoa', token:'bia', u:'x'}).ok, 'xin khoá bằng token bịa thì từ chối');
const kq = goi({fn:'capKhoa', token:dn2.token, u:hoSo.email, goi:['nen','nghe','tang5']});
bao(!kq.ok && kq.code==='NOKEY', 'chưa nạp bộ khoá thì báo rõ NOKEY');
PropertiesService.getScriptProperties().setProperty('GITA_KHOA_KHO',
  JSON.stringify({nen:'K1',nghe:'K2',tang1:'K3',tang2:'K4',tang3:'K5',tang4:'K6',tang5:'K7'}));
const kq2 = goi({fn:'capKhoa', token:dn2.token, u:hoSo.email, goi:['nen','nghe','tang1','tang5']});
bao(kq2.ok, 'nạp khoá rồi thì cấp được');
bao(!kq2.khoa.nghe, 'phụ huynh KHÔNG nhận được khoá kho nghề');
bao(!kq2.khoa.tang5, 'phụ huynh tầng 1 KHÔNG nhận được khoá tầng 5');
bao(!!kq2.khoa.nen && !!kq2.khoa.tang1, 'nhận đúng gói nền và tầng 1', Object.keys(kq2.khoa).join(', '));

console.log('\n9 · MẬT KHẨU TẠM CHẶN MỞ KHO');
const chan = goi({fn:'capKhoa', token:dn.token, u:'Admin@gita365', goi:['nen']});
bao(!chan.ok && chan.code==='MUSTCHANGE',
  'Super Admin dùng mật khẩu tạm thì KHÔNG mở được kho', chan.error||'');
bao(Store.all('audit').some(x=>x.viec==='CAP_KHOA_CHAN'), 'lần bị chặn có vào nhật ký');

const mkMoi = 'MotNhaBinhYen2026';
const doiSai = goi({fn:'doiMatKhau', token:dn.token, u:'Admin@gita365', cu:'sai', moi:mkMoi});
bao(!doiSai.ok, 'đổi mật khẩu mà nhập sai mật khẩu cũ thì từ chối');
const doi = goi({fn:'doiMatKhau', token:dn.token, u:'Admin@gita365', cu:mkTam, moi:mkMoi});
bao(doi.ok, 'đổi được mật khẩu ngay cả khi kho đang bị chặn', doi.error||'');

const dn3 = gitaDangNhap_({u:'Admin@gita365', mk:mkMoi});
bao(dn3.ok && dn3.phaiDoiMk === false, 'đăng nhập lại bằng mật khẩu mới, không còn cờ phải đổi');
bao(!gitaDangNhap_({u:'Admin@gita365', mk:mkTam}).ok, 'mật khẩu tạm hết dùng được');
const mo = goi({fn:'capKhoa', token:dn3.token, u:'Admin@gita365', goi:['nen','nghe','tang5']});
bao(mo.ok && Object.keys(mo.khoa).length===3, 'đổi xong thì kho mở đủ cho Super Admin',
  Object.keys(mo.khoa||{}).join(', '));

const dl = datLaiMatKhauSuperAdmin();
const mkTam2 = (dl.match(/Mật khẩu tạm: (\S+)/) || [])[1];
bao(!!mkTam2 && mkTam2 !== mkTam, 'đặt lại được mật khẩu Super Admin từ Apps Script');
const dn4 = gitaDangNhap_({u:'Admin@gita365', mk:mkTam2});
bao(dn4.ok && dn4.phaiDoiMk === true, 'đặt lại xong thì lại bắt buộc đổi');
bao(!goi({fn:'capKhoa', token:dn4.token, u:'Admin@gita365', goi:['nen']}).ok,
  'và kho lại bị chặn cho tới khi đổi');

console.log('\n10 · XÁC NHẬN QUYỀN VÀO DRIVE');
const bc = kiemTraQuyenDrive();
bao(/Đạt 4\/4 thư mục/.test(bc), 'bốn thư mục đều mở được và ghi được');
bao(/typhuquanggita@gmail\.com/.test(bc), 'báo rõ máy chủ đang chạy dưới tài khoản nào');
bao(/Dữ Liệu GITA365/.test(bc) && /Mã máy chủ GITA365/.test(bc),
  'gọi đúng tên thư mục thật, không chỉ đọc lại mã');
const conRac = Object.keys(__thuMuc).some(k =>
  __thuMuc[k].tep.some(f => !f.bo));
bao(!conRac, 'tệp dấu dùng để thử đã dọn sạch, không để rác trong Drive');

/* Thư mục chỉ cho xem: phải bị bắt, không được báo xanh.
   Ba hằng DRIVE, TAILIEU và XUAT hiện cùng trỏ vào một thư mục của Học viện,
   nên hạ quyền thư mục ấy là ba mục cùng rớt — đúng như thực tế sẽ xảy ra. */
__thuMuc['1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU'].ghiDuoc = false;
const bc2 = kiemTraQuyenDrive();
bao(/Đạt 1\/4 thư mục/.test(bc2), 'thư mục chỉ cho xem thì KHÔNG được tính là đạt');
bao(/KHÔNG ghi được/.test(bc2) && /Người chỉnh sửa/.test(bc2),
  'nói rõ thiếu quyền gì và sửa thế nào');
bao(/CÁCH SỬA/.test(bc2), 'kèm hướng dẫn sửa khi có thư mục hỏng');
__thuMuc['1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU'].ghiDuoc = true;

/* Mã thư mục sai — chỉ hỏng đúng một mục, ba mục kia vẫn đạt */
const idThat = GITA_THU_MUC_MA;
GITA_THU_MUC_MA = '1khongtontai0000000000000000000';
const bc3 = kiemTraQuyenDrive();
bao(/Đạt 3\/4/.test(bc3) && /Không mở được/.test(bc3),
  'mã thư mục sai thì báo rõ đúng một mục, không im lặng và không đổ oan mục khác');
GITA_THU_MUC_MA = idThat;

/* Qua doPost: chỉ R01–R02 */
const drAdmin = goi({fn:'kiemDrive', token:dn3.token, u:'Admin@gita365'});
bao(drAdmin.ok && drAdmin.dat===4 && drAdmin.thuMuc.length===4,
  'Super Admin kiểm được quyền Drive từ ứng dụng', drAdmin.taiKhoan||'');
const drPh = goi({fn:'kiemDrive', token:dn2.token, u:hoSo.email});
bao(!drPh.ok, 'phụ huynh KHÔNG kiểm được quyền Drive');
bao(Store.all('audit').some(x=>x.viec==='KIEM_QUYEN_DRIVE'), 'mỗi lần kiểm đều vào nhật ký');

console.log('\n11 · MỤC LỤC HÀM');
const ml = mucLucHam();
['caiDatLanDau','kiemTraQuyenDrive','napBoKhoaMotLan','datLaiMatKhauSuperAdmin']
  .forEach(h2 => bao(ml.indexOf(h2) >= 0, 'mục lục có hàm ' + h2));

console.log('\n' + (loi ? '✗ CÒN '+loi+' ĐIỂM CHƯA ĐẠT' : '✓ TOÀN BỘ ĐẠT — máy chủ chạy đúng'));
process.exit(loi?1:0);
