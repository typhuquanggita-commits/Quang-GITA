/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.0 — LÕI DỮ LIỆU
   Kế thừa nguyên vẹn chuẩn phân quyền, năm tầng và mô thức G–I–T–A
   của hệ thống v6.9 (00_Config.gs), mở rộng cho giao diện Bản Đồ
   Gia Đình Thịnh Vượng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {};
window.G = G;

/* Số bản KHÔNG chỉ để trưng. Nó là thứ duy nhất phân biệt hai tệp cùng
   nằm trong thư mục Tải về, và là thứ người dùng đọc để biết mình đang
   xem bản nào. Nên mỗi lần phát hành phải nhích số này — tên tệp bản
   giới thiệu cũng sinh ra từ đây (xem tools/dong-goi.py).

   v7.5 → v7.8 giữ nguyên qua ba lần phát hành có nội dung mới, nên anh
   Quang mở nhầm tệp cũ và tưởng phần sửa chưa chạy. Số bản đứng yên
   trong khi nội dung đổi là một cách nói dối không cố ý. */
G.META = {
  name: 'GITA 365',
  version: '9.5',
  tagline: 'Hệ Sinh Thái Gia Đình Thịnh Vượng',
  hotline: '08.5555.4688',
  site: 'truongnhatquang.com',
  soKichBan: 1000, soPhacDo: 220, soMoThuc: 42,
  builtOn: 'Nối tiếp hệ thống GITA 365 v6.9 — 1.000 kịch bản · 220 phác đồ · 25 mô thức · 5 tầng'
};

/* ══════════ 1. VAI TRÒ — lv càng nhỏ càng nhiều quyền ══════════ */
G.ROLES = [
  {id:'R01',lv:1, n:'Super Admin',         short:'Super Admin',portal:'admin', c:'#185AB4',
   ln:'Người giữ chìa khoá gốc của hệ sinh thái.'},
  {id:'R02',lv:2, n:'Admin hệ thống',      short:'Admin',      portal:'admin', c:'#185AB4',
   ln:'Kiến trúc sư vận hành — dựng chuẩn, mở đường, giữ lửa.'},
  {id:'R03',lv:3, n:'Giám đốc',            short:'Giám đốc',   portal:'admin', c:'#F61824',
   ln:'Người cầm tầm nhìn và chịu trách nhiệm tăng trưởng.'},
  {id:'R04',lv:4, n:'Quản lý chuyên môn',  short:'QLCM',       portal:'admin', c:'#F61824',
   ln:'Người giữ chuẩn nghề của toàn bộ đội ngũ dẫn dắt.'},
  {id:'R05',lv:5, n:'Trưởng nhóm Coach',   short:'TN Coach',   portal:'coach', c:'#5140B4',
   ln:'Người tạo ra Coach giỏi, không chỉ làm Coach giỏi.'},
  {id:'R06',lv:6, n:'Senior Coach',        short:'S.Coach',    portal:'coach', c:'#5140B4',
   ln:'Người gỡ được những nút thắt mà người khác chưa gỡ nổi.'},
  {id:'R07',lv:7, n:'Coach',               short:'Coach',      portal:'coach', c:'#5140B4',
   ln:'Người thắp lửa chuyển hoá cho từng gia đình.'},
  {id:'R08',lv:8, n:'Giáo viên',           short:'Giáo viên',  portal:'coach', c:'#0B6675',
   ln:'Người dạy đúng thứ học viên đang cần để đi tiếp.'},
  {id:'R09',lv:9, n:'Mentor',              short:'Mentor',     portal:'coach', c:'#0B6675',
   ln:'Người chạy tám việc băng nền dưới cả năm khoang.'},
  {id:'R10',lv:10,n:'Chuyên gia đánh giá', short:'Assessor',   portal:'coach', c:'#0B6675',
   ln:'Người trả lại sự thật bằng dữ liệu, không bằng cảm giác.'},
  {id:'R11',lv:11,n:'Chuyên gia tư vấn',   short:'Tư vấn',     portal:'tuvan', c:'#BE0E16',
   ln:'Người mở cánh cửa cho gia đình đang tìm đường.'},
  {id:'R12',lv:12,n:'Phân tích dữ liệu',   short:'Phân tích',  portal:'admin', c:'#185AB4',
   ln:'Người đọc ra mô thức trước khi nó thành vấn đề.'},
  {id:'R13',lv:13,n:'Phụ huynh',           short:'Phụ huynh',  portal:'ph',    c:'#0B7350',
   ln:'Chủ nhân thật sự của bản đồ gia đình thịnh vượng.'},
  {id:'R14',lv:14,n:'Học viên',            short:'Học viên',   portal:'hs',    c:'#185AB4',
   ln:'Người đang viết chương hay nhất của đời mình.'},
  {id:'R15',lv:15,n:'CTV giới thiệu',      short:'Đại sứ',     portal:'ctv',   c:'#BE0E16',
   ln:'Người mang ánh sáng này tới nhà tiếp theo.'}
];

/* Quyền → cấp bậc TỐI ĐA được dùng (nguồn sự thật từ v6.9) */
G.PERM = {
  sys_config:1, sys_delete_user:1, sys_restore:1, sys_manage_user:2, sys_audit:2, sys_fraud:3,
  /* TÀI CHÍNH — chỉ R01, R02, R03. Trước đây fin_create_order mở tới bậc 11
     nên Tư vấn tạo được đơn thu; nay đóng lại theo đúng luật anh Quang đặt:
     chỉ ba vị trí đầu nhìn thấy tiền, để đo lường và giám sát. */
  /* Xem tài chính mở tới Quản lý chuyên môn (R04) ở mức CHỈ ĐỌC — để
     đo lường và giám sát hiệu quả hoạt động. Việc động vào tiền (duyệt
     chi, bảng lương, tạo đơn thu) vẫn dừng ở R03. */
  fin_view:4, fin_payout:3, fin_payroll:3, fin_create_order:3,
  pro_approve:4, pro_report:4, pro_override:4, pro_assign:5, pro_coach:8, pro_assess:10,
  pro_view_all:4, pro_consult:11,
  usr_self_data:15, usr_do_test:15, usr_referral:15,

  /* Ba vai cuối cùng bậc nhưng KHÁC việc. Nếu chỉ so bậc thì phụ huynh,
     học viên và cộng tác viên nhìn thấy y hệt nhau — đó là lỗi của v7.5.
     Bậc tách được phụ huynh khỏi học viên; phần còn lại do bảng phân
     quyền theo vai bên dưới quyết định. */
  kh_gia_dinh:13,     /* hồ sơ nhà, bảng số, nhịp sống — phụ huynh trở lên */
  kh_hanh_trinh:14,   /* hành trình của con, nhiệm vụ, bài test — học viên trở lên */
  kh_qua_tang:14,     /* kho quà mở theo tầng đã học */
  ctv_lien_ket:15,    /* mã liên kết và danh sách nhà mình giới thiệu */
  ctv_hoa_hong:15,    /* hoa hồng và số tài khoản nhận tiền */

  /* ══ BA TẦNG QUẢN TRỊ — nguồn của tỉ lệ hiển thị ══
     qt_trang   R01–R02  thư mục Quản trị trang: cấp quyền, mở, khoá, xoá tài khoản
     dh_toan_he R01–R04  điều hành toàn hệ và nhật ký
     nghe_chung R01–R12  toàn bộ kho nghề và công cụ dẫn dắt
     Ba mức này cộng với tài chính (R01–R03) tạo ra đúng bậc thang:
     100% · 95% · 91% · 90% — xem G.TAM_NHIN bên dưới. */
  qt_trang:2, dh_toan_he:4, nghe_chung:12,

  /* ══ THƯ VIỆN TÀI LIỆU ══
     Mọi vị trí đều được gửi tài liệu lên làm giàu kho chung — đó là
     cách kho lớn lên. Nhưng chỉ Super Admin và Admin hệ thống được
     kiểm duyệt, và chỉ tài liệu đã duyệt mới vào kho thật. */
  tl_gui:15,       /* gửi tài liệu lên — tất cả các vị trí */
  tl_xem_het:4,    /* xem toàn bộ tài liệu của mọi người */
  tl_duyet:2,      /* duyệt · yêu cầu chỉnh sửa · từ chối */

  /* ══ MINH CHỨNG NHIỆM VỤ ══
     Phụ huynh và học viên nộp ảnh, báo cáo hoặc tệp để xác nhận đã
     làm nhiệm vụ. Coach và giáo viên xác nhận. Khác thư viện: đây là
     bằng chứng của một nhà, không vào kho chung. */
  /* ══ GỬI TƯ LIỆU CHO GIA ĐÌNH ══
     Gia đình mở sẵn 30% kho. Phần còn lại KHÔNG tự mở ra: nó đi qua
     một người thật. Tư vấn và Coach đọc lời xin, nhìn KPI của nhà, rồi
     mới gửi — để tài liệu tới đúng nhà, đúng lúc, có người giải thích. */
  tl_gui_khach:11,

  /* ══ QUY TRÌNH XỬ LÝ CA ══
     Mở và đẩy ca: từ Tư vấn trở lên — chính họ ngồi với gia đình.
     Bảng đo lường toàn hệ: R01–R04, để soi chỗ nào đang tắc. */
  ca_xu_ly:11, ca_do_luong:4,

  /* Theo dõi mức dùng tài nguyên của đội ngũ — chỉ R01–R02.
     Một tài khoản chạm quá 20% kho thì Admin hệ thống nhận cảnh báo. */
  qt_tai_nguyen:2,
  mc_gui:15,       /* nộp minh chứng — tất cả, gồm phụ huynh và học viên */
  mc_duyet:8,      /* xác nhận minh chứng — giáo viên, Coach trở lên */
  /* Sửa chữ hiển thị trên toàn hệ thống — mặc định CHỈ Super Admin.
     Chữ trên màn hình là thứ hàng nghìn gia đình đọc, nên chỉ một
     người được đổi, và mọi lần đổi đều vào nhật ký. */
  sua_noi_dung:2,

  /* Xuất tài sản ra ngoài — chỉ người của GITA 365 từ cấp quản lý.
     Khách hàng (R13 phụ huynh, R14 học viên) và CTV (R15) KHÔNG có hai quyền này,
     nên không in được PDF và không đẩy được bảng tính lên Drive. */
  xuat_pdf:5, xuat_sheet:4
};

/* Tên tiếng Việt của từng quyền — bảng điều khiển phân quyền đọc từ đây. */
G.PERM_TEN = {
  sys_config:'Cấu hình hệ thống',        sys_delete_user:'Xoá tài khoản',
  sys_restore:'Khôi phục dữ liệu',       sys_manage_user:'Quản trị người dùng',
  sys_audit:'Nhật ký hệ thống',          sys_fraud:'Cảnh báo gian lận',
  fin_view:'Xem tài chính (chỉ đọc)',    fin_payout:'Duyệt chi',
  fin_payroll:'Bảng lương',              fin_create_order:'Tạo đơn thu',
  pro_approve:'Nghiệm thu chuyên môn',   pro_report:'Báo cáo toàn hệ',
  pro_override:'Vượt quyết định chuyên môn', pro_assign:'Phân công đội ngũ',
  pro_coach:'Công cụ Coach',             pro_assess:'Chấm đánh giá',
  pro_view_all:'Xem toàn bộ hồ sơ nhà',  pro_consult:'Công cụ tư vấn',
  usr_self_data:'Dữ liệu của chính mình',usr_do_test:'Làm bài test',
  usr_referral:'Giới thiệu người quen',
  kh_gia_dinh:'Hồ sơ và nhịp sống nhà mình', kh_hanh_trinh:'Hành trình của con',
  kh_qua_tang:'Kho quà theo tầng',
  ctv_lien_ket:'Mã liên kết cộng tác viên', ctv_hoa_hong:'Hoa hồng và tài khoản nhận tiền',
  qt_trang:'Quản trị trang — tài khoản và phân quyền',
  tl_gui:'Gửi tài liệu lên thư viện',
  tl_xem_het:'Xem toàn bộ tài liệu đã gửi',
  tl_duyet:'Kiểm duyệt tài liệu',
  tl_gui_khach:'Gửi tư liệu thêm cho gia đình',
  ca_xu_ly:'Mở và xử lý ca theo quy trình',
  ca_do_luong:'Bảng đo lường ca toàn hệ',
  qt_tai_nguyen:'Theo dõi tài nguyên của đội ngũ',
  mc_gui:'Nộp minh chứng nhiệm vụ',
  mc_duyet:'Xác nhận minh chứng',
  sua_noi_dung:'Sửa nội dung hiển thị',
  dh_toan_he:'Điều hành toàn hệ và nhật ký',
  nghe_chung:'Kho nghề và công cụ dẫn dắt',
  xuat_pdf:'Xuất bản in PDF',            xuat_sheet:'Đẩy Google Sheet về Drive'
};

/* Nhóm quyền — để bảng điều khiển xếp cột cho dễ đọc. */
G.PERM_NHOM = [
  {id:'sys', t:'HỆ THỐNG',   c:'#185AB4', ds:['sys_config','sys_delete_user','sys_restore','sys_manage_user','sys_audit','sys_fraud','qt_trang','sua_noi_dung','tl_duyet','tl_xem_het']},
  {id:'fin', t:'TÀI CHÍNH',  c:'#0B7350', ds:['fin_view','fin_payout','fin_payroll','fin_create_order']},
  {id:'pro', t:'CHUYÊN MÔN', c:'#5140B4', ds:['pro_approve','pro_report','pro_override','pro_assign','pro_coach','pro_assess','pro_view_all','pro_consult','dh_toan_he','nghe_chung','mc_duyet']},
  {id:'kh',  t:'KHÁCH HÀNG', c:'#0B6675', ds:['usr_self_data','usr_do_test','usr_referral','kh_gia_dinh','kh_hanh_trinh','kh_qua_tang','tl_gui','mc_gui']},
  {id:'ctv', t:'CỘNG TÁC',   c:'#BE0E16', ds:['ctv_lien_ket','ctv_hoa_hong']},
  {id:'out', t:'XUẤT RA NGOÀI', c:'#F61824', ds:['xuat_pdf','xuat_sheet']}
];

/* ══════════ BẢNG PHÂN QUYỀN THEO VAI ══════════
   Bậc quyết định phần lớn. Bảng này ghi đè cho những chỗ bậc không nói được:
   cho  = cấp thêm quyền mà bậc chưa cho
   cam  = thu lại quyền mà bậc đã cho
   Super Admin và Admin hệ thống sửa bảng này ở màn hình "Bảng phân quyền".
   Mặc định dưới đây là điểm khởi đầu, không phải thứ bất biến. */
G.PHANQUYEN_GOC = {
  R13:{cho:[], cam:['ctv_lien_ket','ctv_hoa_hong']},
  R14:{cho:[], cam:['ctv_lien_ket','ctv_hoa_hong']},
  R15:{cho:['ctv_lien_ket','ctv_hoa_hong'], cam:['kh_gia_dinh','kh_hanh_trinh','kh_qua_tang','usr_self_data']}
};

/* ══════════ TẦNG HIỂN THỊ — nguồn sự thật của "ai thấy gì" ══════════
   Trước v7.6 mỗi màn hình tự mang một quyền, gắn rời rạc, nên không ai
   trả lời được câu "vị trí này thấy bao nhiêu phần trăm hệ thống".
   Nay mọi màn hình thuộc đúng MỘT tầng hiển thị, và tầng quyết định quyền.
   Muốn đổi phạm vi một màn thì đổi tầng của nó ở đây, không sửa rải rác. */
G.TANG_HIENTHI = [
  {id:'chung',    perm:null,           t:'Chung cho mọi tài khoản',
   mo:'Ai đăng nhập cũng thấy — bản đồ, lộ trình, ranh giới, hệ sinh thái.'},
  {id:'nha',      perm:'kh_gia_dinh',  t:'Hồ sơ và nhịp sống nhà mình',
   mo:'Phụ huynh trở lên. Học viên và cộng tác viên không thấy hồ sơ nhà.'},
  {id:'con',      perm:'kh_hanh_trinh',t:'Hành trình của con',
   mo:'Học viên trở lên. Cộng tác viên không thấy.'},
  {id:'qua',      perm:'kh_qua_tang',  t:'Kho quà theo tầng',
   mo:'Mở dần theo tầng gia đình đã học.'},
  {id:'ctv',      perm:'ctv_hoa_hong', t:'Phần cộng tác viên',
   mo:'Cộng tác viên và đội ngũ GITA. Phụ huynh, học viên không thấy.'},
  {id:'nghe',     perm:'nghe_chung',   t:'Kho nghề và công cụ dẫn dắt',
   mo:'R01–R12. Toàn bộ khách hàng và cộng tác viên đều không thấy.'},
  {id:'dieuhanh', perm:'dh_toan_he',   t:'Điều hành toàn hệ',
   mo:'R01–R04. Trung tâm điều hành và nhật ký hệ thống.'},
  {id:'taichinh', perm:'fin_view',     t:'Tài chính',
   mo:'CHỈ R01–R03, để đo lường, giám sát và thúc đẩy hiệu quả hoạt động.'},
  {id:'quantri',  perm:'qt_trang',     t:'Quản trị trang',
   mo:'CHỈ R01–R02. Cấp quyền, mở, khoá và xoá tài khoản.'}
];

/* Tỉ lệ hiển thị mong muốn theo vị trí — bộ kiểm phát hành đối chiếu
   với số đếm thật, lệch quá biên là dừng phát hành. */
/* ══════════ CÔNG TẮC "MỞ HẾT" — CHỈ CẤP QUẢN TRỊ ══════════

   Giao diện cắt bớt để dễ đọc: danh sách hiện mười mục đầu, tóm tắt cắt
   ở một trăm hai mươi ký tự. Với người dùng thường thì đúng — màn hình
   dài quá thì không ai đọc.

   Nhưng chủ hệ thống cần nhìn A đến Z: không phải để dùng hằng ngày, mà
   để RÀ. Không thấy hết thì không rà được, và một chỗ hỏng nằm ở mục
   thứ mười một sẽ không bao giờ bị phát hiện.

   Nên cắt bớt thành một công tắc thay vì một luật cứng. Tắt là giao diện
   như cũ; bật là mọi danh sách và mọi đoạn chữ hiện đủ. Chỉ vai có quyền
   qt_trang bật được — Super Admin và Admin hệ thống.

   Trạng thái ghi vào máy đang dùng, không đi theo tài khoản: đây là thói
   quen đọc của một người trên một máy, không phải quyền của một vai. */
G.MO_HET = false;

G.moHetDuoc = function(){ return !!(G.can && G.can('qt_trang')); };

G.moHetBat = function(){ return !!(G.MO_HET && G.moHetDuoc()); };

/* Danh sách: trả đủ khi đang mở hết, ngược lại cắt như cũ. */
G.dsHet = function(ds, n){
  var a = ds || [];
  return G.moHetBat() ? a : a.slice(0, n);
};

/* Đoạn chữ: trả đủ khi đang mở hết; ngược lại cắt và tự thêm dấu ba
   chấm — nên chỗ gọi KHÔNG nối thêm '…' nữa, nếu không bản đầy đủ cũng
   bị treo một dấu ba chấm vô nghĩa ở cuối. */
G.chuHet = function(s, n){
  var t = String(s == null ? '' : s);
  if(G.moHetBat() || t.length <= n) return t;
  return t.slice(0, n) + '…';
};

G.moHetDoi = function(){
  if(!G.moHetDuoc()) return;
  G.MO_HET = !G.MO_HET;
  try { localStorage.setItem('gita_mo_het', G.MO_HET ? '1' : '0'); } catch(e){}
  if(G.U && G.U.toast)
    G.U.toast(G.MO_HET
      ? 'Đã mở hết — mọi danh sách và mọi đoạn chữ hiện đủ, không cắt bớt.'
      : 'Đã tắt mở hết — giao diện trở lại bản gọn.', 'ok');
  if(G.render) G.render();
};

try { G.MO_HET = localStorage.getItem('gita_mo_het') === '1'; } catch(e){}

G.TAM_NHIN = [
  {vai:['R01','R02'], pt:100,
   ghi:'Toàn bộ, không khoá gì. Super Admin và Admin hệ thống thấy mọi thứ.'},
  /* 80 chứ không phải 82. Ba màn mới ở đợt v8.x — Bốn tuyến chuyên môn,
     Quy trình toàn Web App, Kiểm thử theo vai — đều CHỈ mở cho R01–R02.
     Tử số của R03 đứng yên mà mẫu số tăng ba, nên tỉ lệ tụt.

     Đây là lúc phải sửa SỐ CÔNG BỐ, không sửa cách đếm: phần khoá của
     R03 không hề bị nới thêm một màn nào, chỉ có phần quản trị dày lên.
     Giữ 82 cho đẹp thì bài kiểm hoặc đỏ oan, hoặc phải nới dung sai —
     mà nới dung sai là mất tác dụng canh.

     Điều KHÔNG đổi và mới là thứ đáng canh: bậc thang không được đảo
     ngược, và R01–R02 phải thấy 100%. Hai phép ấy không phụ thuộc mẫu
     số nên không trôi theo mỗi lần thêm màn — xem mục ma trận màn × vai
     trong bộ kiểm. */
  {vai:['R03','R04'], pt:80,
   ghi:'Khoá đúng phần quản trị của R01–R02: quản trị tài khoản, phân quyền, bảo mật, nhật ký, kiểm duyệt.'},
  /* Tách làm hai dòng: bảy vị trí này trước nay gộp một con số, nhưng
     chúng KHÔNG thấy như nhau — R09–R11 kém hơn ba màn. Gộp lại thì phải
     nới dung sai để cả bảy cùng lọt, mà nới dung sai là mất tác dụng canh.
     Ghi hai con số thật thì canh được chặt hơn. */
  {vai:['R05','R06','R07','R08'], pt:75,
   ghi:'Khoá phần quản trị hệ thống, thêm tài chính và điều hành toàn hệ.'},
  {vai:['R09','R10','R11'], pt:73,
   ghi:'Như trên, và không mở ba màn thuộc phạm vi quản lý chuyên môn.'},
  /* R12 tách ra một dòng riêng, và con số thấp hơn là ĐÚNG chứ không phải
     thiệt thòi. Phân tích dữ liệu đọc được toàn bộ kho nghề và mọi màn số
     liệu tổng hợp, nhưng KHÔNG mở những màn chứa hồ sơ của một nhà cụ thể
     và những buồng lái thao tác với gia đình: hồ sơ VIP, tài liệu gia đình
     gửi lên, khoang mở cửa của Tư vấn, rà soát từng nhà.
     Trước đây trình đơn của R12 vẫn hiện những mục ấy rồi bấm vào chỉ ra
     một thẻ khoá — mười bốn mục chết. Nay ẩn đi, và con số tụt từ 75%
     xuống đúng mức thật. Ít mục hơn nhưng không mục nào chết. */
  {vai:['R12'], pt:62,
   ghi:'Toàn bộ kho nghề và màn số liệu tổng hợp · không mở hồ sơ từng nhà và buồng lái thao tác'},
  /* ═══ Ba tỉ lệ dưới: nói cho rõ kẻo lẫn với trần 30% ═══
     Đây là tỉ lệ SỐ MÀN HÌNH mở được, không phải tỉ lệ NỘI DUNG. Hai thứ
     khác hẳn nhau, và trần 30% anh Quang đặt là trần nội dung:

       · Trần nội dung  G.TRAN_KHACH = 0,30 trong src/kho-khach.js — mỗi kho
         tư liệu chỉ mở sẵn 30% cho gia đình, phần còn lại do Tư vấn và Coach
         gửi thêm khi đạt KPI 80%. Trần này KHÔNG đổi.
       · Tỉ lệ dưới đây chỉ đếm xem vai ấy bấm vào được bao nhiêu mục trong
         trình đơn.

     Con số nhích lên qua các đợt vì những màn mới đều là thứ gia đình,
     học viên và cộng tác viên PHẢI thấy mới đi được: vòng nhắc Đúng–Đủ–Sâu,
     hành trình 12 chặng, kho tổng, bản đồ cá nhân 11 ô, kho chuyện của
     chính cấp mình, sổ nhật ký và cuộc thi viết. Thêm một màn như thế
     không mở thêm một dòng tư liệu nghề nào. Ghi con số thật ở đây, và
     giữ nguyên trần nội dung ở chỗ của nó. */
  {vai:['R13'], pt:35, ghi:'Nhà mình, hành trình của con, gửi tài liệu và minh chứng, vòng nhắc, bản đồ cá nhân, sổ nhật ký, chuyện và thi viết, giới thiệu Học viện, đọc hoặc nghe'},
  {vai:['R14'], pt:29, ghi:'Chặng đường của em, nhiệm vụ, minh chứng, vòng nhắc, bản đồ cá nhân, sổ nhật ký, chuyện và thi viết'},
  {vai:['R15'], pt:25, ghi:'Phần giới thiệu, hoa hồng, gửi tài liệu, vòng nhắc, bản đồ cá nhân, sổ nhật ký, chuyện và thi viết'}
];

/* Sáu chân dung người dùng — lời mời bước vào, hiển thị ở Cổng vào */
/* Cộng tác viên đổ vào "Bắt đầu ở đây" như phụ huynh và học viên, thay
   vì vào màn Đại sứ. Lý do: G.VIEWS['bat-dau'] trước v9.2 chỉ có nhánh
   cho ph · hs · coach · tuvan · admin — không có nhánh ctv, nên cộng
   tác viên rơi vào nhánh dự phòng và nhận NĂM BƯỚC CỦA PHỤ HUYNH: viết
   bảng tầm nhìn của nhà mình, chốt bảng chín vai trong nhà. Nay có
   nhánh riêng, nên cổng này trỏ vào đó. */
G.PORTALS = {
  admin:{n:'Trung Tâm Điều Hành', ic:'shield', c:'#185AB4', home:'dieu-hanh',
    say:'Anh nhìn thấy toàn bộ trường năng lượng: từng gia đình đang ở đâu, đội ngũ đang giữ lửa thế nào, kho báu vật đang được dùng ra sao.'},
  coach:{n:'Buồng Lái Của Coach', ic:'flame', c:'#5140B4', home:'coach-deck',
    say:'Mỗi buổi anh chị bước vào là một gia đình đổi hướng. Đây là nơi anh chị thấy rõ nên chạm vào đâu trước.'},
  tuvan:{n:'Khoang Mở Cửa', ic:'compass', c:'#BE0E16', home:'tuvan-deck',
    say:'Người đối diện chưa cần nghe anh chị giỏi thế nào. Họ cần thấy nhà mình trong tấm bản đồ này.'},
  ph:{n:'Bản Đồ Nhà Mình', ic:'home', c:'#0B7350', home:'bat-dau',
    say:'Đây là bản đồ của chính gia đình anh chị. Không ai viết hộ. Hệ thống chỉ giữ chuẩn và soi đường.'},
  hs:{n:'Hành Trình Của Con', ic:'star', c:'#185AB4', home:'bat-dau',
    say:'Đây là hành trình của em. Mỗi ngày em đi thêm một bước, bản đồ này sáng thêm một chỗ.'},
  ctv:{n:'Vệ Tinh Lan Toả', ic:'share', c:'#BE0E16', home:'bat-dau',
    say:'Câu chuyện thật của anh chị là thứ mở được cánh cửa mà không quảng cáo nào mở nổi.'}
};

/* ══════════ 2. NĂM TẦNG ══════════ */
G.TIERS = [
  {id:1,code:'T1',name:'NHẬN DIỆN',q:'Đang có vấn đề gì?',days:7,c:'#185AB4',
   goal:'Lập baseline trung thực, phát hiện mô thức, hình thành 1–3 giả thuyết G–I–T–A.',
   note:'Tầng 1 KHÔNG chữa vấn đề. Chỉ quan sát, ghi dữ liệu, tìm mô thức.',
   feel:'Lần đầu cả nhà nhìn thấy sự thật mà không cãi nhau.'},
  {id:2,code:'T2',name:'GIẢI MÃ',q:'Vì sao vấn đề xảy ra?',days:21,c:'#5140B4',
   goal:'Kiểm chứng giả thuyết qua 3 vòng 7 ngày, chốt cơ chế ưu tiên.',
   note:'Mỗi vòng chỉ thay ít biến, ghi bằng chứng ủng hộ và phản bác.',
   feel:'Hết đổ lỗi. Bắt đầu hiểu cơ chế.'},
  {id:3,code:'T3',name:'KIẾN TẠO',q:'Cần làm gì và làm thế nào?',days:90,c:'#0B6675',
   goal:'4 chuỗi 21 ngày: có cấu trúc → tự điều hành → thích ứng → chuyển giao.',
   note:'Mỗi cấp có PDCA và cổng nghiệm thu.',
   feel:'Nhà mình có một hệ thống chạy được, do chính mình dựng.'},
  {id:4,code:'T4',name:'CHUYỂN HÓA',q:'Làm sao duy trì thay đổi thành năng lực?',days:365,c:'#0B7350',
   goal:'4 chu kỳ 90 ngày: năng lực nền → ổn định → thích ứng → chuyển giao.',
   note:'Tăng dần độ khó, giảm dần hỗ trợ Coach.',
   feel:'Quyền điều hành việc học đã nằm trong tay con.'},
  {id:5,code:'T5',name:'BỨT PHÁ',q:'Gia đình có thể phát triển tới đâu?',days:365,c:'#BE0E16',
   goal:'Đồng bộ học viên – phụ huynh – gia đình. Từ tự quản sang tạo giá trị.',
   note:'Coach đồng hành cả gia đình. Đích: hệ thống tự vận hành sau 365 ngày.',
   feel:'Một gia đình vận hành được mà không cần ai canh.'}
];

/* ══════════ 3. MÔ THỨC G–I–T–A ══════════ */
/* ══════════ MÔ THỨC HUẤN LUYỆN GITA — BỐN TRỤ ══════════

   BẢN CHUẨN, chép từ định nghĩa của chủ Học viện. Đây là tài sản trí tuệ
   gốc của GITA; mọi màn hình đọc bốn trụ đều đọc từ đây, không nơi nào
   được viết lại một bản khác.

   `inc` là danh sách thành tố của trụ — nó dài có chủ ý. Rút gọn cho gọn
   giao diện là làm mất chính thứ phân biệt mô thức này với bốn chữ cái
   viết tắt của nơi khác. Màn hình nào chật thì cắt ở màn hình, không cắt
   ở kho.                                                                */
G.GITA = [
  {k:'G',name:'Goal — Hệ thống mục tiêu',short:'Mục tiêu',c:'#185AB4',
   desc:'Học viên có hệ thống mục tiêu rõ, hướng tới kết quả xuất sắc, và đó có phải đích đến của chính quá trình học tập rèn luyện của em không?',
   probe:'Con muốn điều gì? Điều đó là của con hay của người lớn? Đạt được thì khác đi thế nào?',
   inc:['Hệ thống mục tiêu','Kết quả xuất sắc','Đích đến của quá trình học tập rèn luyện',
        'Kỳ tích','Nguyện vọng','Thành quả']},

  {k:'I',name:'Inspirits — Nội lực',short:'Nội lực',c:'#5140B4',
   desc:'Động lực, khát khao và niềm tin bên trong có đủ để em theo đuổi mục tiêu tới cùng, kể cả khi khó?',
   probe:'Điều gì khiến con muốn làm? Con tin mình làm được tới đâu? Khi thất bại con nghĩ gì?',
   inc:['Động lực','Khát khao','Đam mê','Mong muốn','Nội lực','Sự khác biệt',
        'Niềm tin','Bản lĩnh theo đuổi mục tiêu']},

  {k:'T',name:'Talent — Hệ thống tài năng',short:'Năng lực',c:'#0B7350',
   desc:'Em có tài năng, điểm mạnh và tư duy xuất sắc để làm được không — và em có nhanh, có tập trung, có hướng đi rõ không?',
   probe:'Con biết cách làm chưa? Con mạnh nhất ở đâu? Cách làm nào đã hiệu quả với con?',
   inc:['Tài năng','Điểm mạnh','Sở trường','Tư duy xuất sắc','Sự khác biệt',
        'Tốc độ','Tập trung','Khả năng vượt trội','Định hướng xuất sắc']},

  {k:'A',name:'Action & Academy — Hành động và hệ sinh thái',short:'Hành động & Môi trường',c:'#BE0E16',
   desc:'Em có hành động quyết đoán, kiên trì và tối ưu không — và môi trường quanh em có nâng đỡ hành động ấy không?',
   probe:'Ai quanh con? Không gian và nhịp sống thế nào? Con đang dùng hệ thống nào để vận hành?',
   inc:['Hành động quyết đoán','Kiên trì','Sáng tạo','Chăm chỉ','Cẩn thận','Tối ưu',
        'Lộ trình rèn luyện theo thói quen thành công','Cấp độ hành động theo quy tắc 20/80',
        'Môi trường thi đua rèn luyện','Thiết kế khác biệt',
        'Nhóm bạn xuất sắc theo team work','Học tập gắn phát triển bản thân']}
];


/* ══════════ 4. NĂM NHÓM CHÍNH — thanh tab bên trái ══════════ */
G.NAV = [
  {id:'g1',no:'01',ic:'map',c:'#185AB4',
   t:'BẢN ĐỒ THỊNH VƯỢNG', s:'Nhà mình đang ở đâu, và sẽ thành gì?',
   essence:'Nơi mọi thứ bắt đầu: nhìn cho đúng trước khi sửa bất cứ điều gì.',
   items:[
    /* Bảng việc và KPI đứng ngay đầu nhóm 01: đây là màn người đi làm mở
       đầu ngày, trước cả bản đồ. Không gắn perm — mọi vị trí đều có việc
       của mình, và danh mục tự lọc theo vai ngay trên màn hình. Khách
       hàng vào "KPI của tôi" thì thấy nhịp ngày và KPI tầng, đội ngũ thì
       thấy KPI công việc: cùng một mục, hai nội dung, theo đúng vai. */
    {v:'bang-viec',   t:'Bảng công việc của tôi',     h:'Trễ hạn · đang làm · mới nhận · đã xong · chốt ngày', ic:'pulse', star:1, capMo:'chung', hienKhi:'cvVaiCoDauViec'},
    {v:'danh-muc-viec',t:'Danh mục đầu việc',         h:'Tích chọn để nhận việc · nói rõ đóng bằng bằng chứng gì', ic:'list', capMo:'chung', hienKhi:'cvVaiCoDauViec'},
    {v:'kpi-toi',     t:'KPI của tôi',                h:'KPI ngày · KPI tháng · liên đới · hạng lương thưởng', ic:'chart', star:1, capMo:'chung'},
    {v:'gioi-thieu',  t:'GITA 365 là gì',              h:'Sứ mệnh · tầm nhìn · mục tiêu · giá trị · năm tầng · văn hoá · cách đồng hành', ic:'seed', star:1, capMo:'chung'},
    {v:'bat-dau',     t:'Bắt đầu ở đây',               h:'Năm bước đầu tiên, đúng thứ tự',     ic:'seed', star:1, capMo:'chung'},
    {v:'tham-gia',    t:'Đường vào — sáu bước',         h:'Giới thiệu → đăng ký → test → hồ sơ → định hướng → 7 ngày', ic:'compass', star:1, capMo:'chung'},
    {v:'pham-vi',     t:'Phạm vi của tôi',             h:'Mình mở tới đâu · còn gì chưa mở',   ic:'compass', star:1, capMo:'chung'},
    {v:'danh-gia',    t:'Đánh giá GITA 365',           h:'Ba câu · phần chưa tốt cần hơn phần khen', ic:'heart', capMo:'chung'},
    {v:'ban-do',      t:'Bản Đồ Gia Đình Thịnh Vượng', h:'5 khoang · 9 vai · băng nền 8 việc', ic:'map', star:1, capMo:'chung'},
    {v:'chan-dung-nha',t:'Chân dung nhà mình',         h:'Từng thành viên thật sự là ai',      ic:'users', perm:'kh_gia_dinh', capMo:'nha'},
    {v:'dinh-vi',     t:'Định vị hôm nay',             h:'Bảng số trung thực, không cảm giác', ic:'pulse', perm:'kh_gia_dinh', capMo:'nha'},
    {v:'tam-nhin',    t:'Tầm nhìn 5 – 20 năm',         h:'Cả nhà viết, không ai viết hộ ai',   ic:'sun', perm:'kh_gia_dinh', capMo:'nha'},
    /* Bản đồ cá nhân 11 ô. Không gắn perm: mọi vai đều có một bản đồ của
       riêng mình, và nó nằm trong hồ sơ tài khoản chứ không nằm trong gói
       tư liệu nào — nên không có gì để cấp phép. */
    {v:'ban-do-ca-nhan',t:'Bản đồ cá nhân 11 ô',        h:'Tại sao → tài năng · rồi vòng lại sửa lộ trình', ic:'compass', star:1, capMo:'chung'},
    {v:'chuyen-hoa',  t:'Từ nỗi đau đến khát khao',    h:'Bảy chuyển dịch làm nên một gia đình khác', ic:'flame', capMo:'chung'},
    {v:'hanh-trinh-con',t:'Hành trình của con',        h:'Từ nhiều vấn đề đến niềm tự hào',    ic:'star', perm:'kh_hanh_trinh', capMo:'con'},
    /* Màn này viết cho ĐỘI NGŨ — chín khoảnh khắc quyết định một nhà có ở lại
       hay không — và dữ liệu DIEMCHAM nằm trong gói nghề. Trước đây nó gắn
       quyền kh_hanh_trinh nên phụ huynh và học viên thấy mục này trong trình
       đơn mà bấm vào chỉ ra màn xin cấp phép: một mục chết. */
    {v:'diem-cham',   t:'Bản đồ điểm chạm cảm xúc',   h:'Chín khoảnh khắc quyết định họ ở lại', ic:'heart', perm:'nghe_chung', capMo:'nghe'},
    {v:'dong-hanh',   t:'Người đồng hành',             h:'Cố vấn luôn lắng nghe, có mặt mọi lúc',ic:'heart', star:1, capMo:'chung'},
    {v:'wow',         t:'Chuỗi WOW',                   h:'Bảy khoảnh khắc đáng nhớ của hành trình',ic:'spark', capMo:'chung'}
   ]},

  {id:'g2',no:'02',ic:'compass',c:'#5140B4',
   t:'HÀNH TRÌNH 5 TẦNG', s:'Đi theo thứ tự nào để không vỡ trận?',
   essence:'Bảy ngày nhìn đúng · 21 ngày hiểu cơ chế · 90 ngày dựng hệ thống · 365 ngày trao quyền.',
   items:[
    {v:'lo-trinh',    t:'Lộ trình T1 → T5',            h:'Năm chặng, mỗi chặng một câu hỏi',   ic:'compass', star:1, capMo:'chung'},
    {v:'gita-map',    t:'Bản đồ G – I – T – A',        h:'Bốn miền để đọc đúng nguyên nhân',   ic:'brain', capMo:'chung'},
    {v:'chu-ky',      t:'Chu kỳ 21 / 90 ngày',         h:'PDCA và cổng nghiệm thu từng chặng', ic:'ritual', perm:'kh_hanh_trinh', capMo:'con'},
    {v:'nhiem-vu',    t:'Nhiệm vụ & Nhật ký 365',      h:'Việc của hôm nay, ghi lại được',     ic:'check', perm:'kh_hanh_trinh', capMo:'con'},
    {v:'chan-dung-tc',t:'Mười chân dung thành công',   h:'Người đi trước trông như thế nào',   ic:'crown', perm:'nghe_chung', capMo:'nghe'},
    {v:'cong-nghiem-thu',t:'Cổng nghiệm thu',          h:'Qua chặng bằng bằng chứng, không bằng lời', ic:'shield', perm:'pro_approve', capMo:'nghe'},
    {v:'bo-test',     t:'Bộ test nhận diện 5 tầng',    h:'25 bộ · 750 câu · phân bốn nhóm',    ic:'target', star:1, perm:'kh_hanh_trinh', capMo:'con'},
    {v:'kpi-100',     t:'Mười điểm về đích',           h:'10 điểm mốc · 100 tiêu chí đo được', ic:'crown', star:1, perm:'kh_hanh_trinh', capMo:'con'},
    {v:'kien-truc-100',t:'Kiến trúc một trăm năm',     h:'100 tầng giá trị · 5 thời kỳ · mỗi năm +3–5%',ic:'sun', star:1, perm:'nghe_chung', capMo:'nghe'}
   ]},

  {id:'g3',no:'03',ic:'vault',c:'#0B6675',
   t:'KHO BÁU VẬT', s:'Cần bí kíp nào cho đúng tình huống này?',
   essence:'1.000 kịch bản · 220 phác đồ · 25 mô thức · toàn văn sách gốc — mở khoá theo tiến trình.',
   items:[
    /* Đặt đầu thư mục: đây là cửa nhìn toàn cảnh, ai vào cũng nên thấy trước.
       Không gắn perm — mọi vai đều thấy TÊN các kho, còn mở được hay không
       thì bảng bên trong nói rõ từng dòng. */
    {v:'vong-nhac',   t:'Vòng nhắc Đúng – Đủ – Sâu',      h:'Xem không phải là làm · ba nấc mỗi việc', ic:'orbit', capMo:'chung', star:1},
    {v:'hanh-trinh-12',t:'Hành trình 12 chặng của học viên', h:'4 trụ · ai chịu trách nhiệm · điểm chạm WOW', ic:'map', capMo:'chung', star:1},
    {v:'luat-lam-viec',t:'Luật làm việc với gia đình',    h:'Đi qua hệ thống · vi phạm hạ 50% KPI 3 tháng', ic:'shield', perm:'nghe_chung', capMo:'nghe', star:1},
    {v:'ref-gita',    t:'Hệ thống một nhà giới thiệu một nhà', h:'Chân dung Ref · 30s-60s-8p · 16 bước', ic:'share', perm:'nghe_chung', capMo:'nghe', star:1},
    {v:'khach-lon',   t:'Chăm sóc khách hàng lớn',        h:'4 tầng · nhịp chạm · hồ sơ 68 điểm', ic:'crown', perm:'nghe_chung', capMo:'nghe', star:1},
    /* Kho tổng liệt kê CHÍN NHÓM KHO và 57 kho tư liệu của Học viện, kèm
       tên từng kho: "220 phác đồ × 5 tầng", "1.000 kịch bản chuyên môn —
       lời để nói ra miệng, đã thử qua nhiều buổi", "250 tình huống thực
       chiến", "Ma trận 220 vấn đề × 5 tầng", và cả nhóm K2 tự giới thiệu
       là "Kho giải pháp cho Tư vấn, Coach — thứ đội ngũ mở ra khi ngồi
       trước một gia đình đang mắc".

       Nó không mở NỘI DUNG của mấy kho ấy — nhưng nó mở KIẾN TRÚC, và
       kiến trúc mới là thứ một đối thủ cần. Trước v9.2 màn này không có
       perm, nên mọi phụ huynh, học viên và cộng tác viên đều cầm được
       bản đồ tài sản nghề của Học viện.

       Khách hàng không mất gì: màn "Phạm vi của tôi" đã trả lời đúng câu
       hỏi của họ — mình mở tới đâu, còn gì chưa mở — bằng ngôn ngữ gia
       đình, không kèm mục lục kho nghề. */
    {v:'kho-tong',    t:'Kho tổng — toàn cảnh',        h:'9 nhóm · hơn 50 kho · số đếm thật', ic:'vault', perm:'nghe_chung', capMo:'chung', star:1},
    {v:'thu-vien',    t:'Thư viện tài liệu',           h:'Gửi tài liệu lên · kho lớn lên từ đây', ic:'book', capMo:'chung', star:1},
    {v:'minh-chung',  t:'Minh chứng nhiệm vụ',         h:'Nộp ảnh, báo cáo xác nhận đã làm',   ic:'check', capMo:'chung', star:1},
    {v:'kho',         t:'Kho báu vật',                 h:'Toàn cảnh những gì anh chị đang có', ic:'vault', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'phac-do',     t:'220 phác đồ × 5 tầng',        h:'Vấn đề nào cũng có đường đi',        ic:'book', perm:'nghe_chung', capMo:'nghe'},
    {v:'kich-ban',    t:'1.000 kịch bản chuyên môn',   h:'Tư vấn và coaching, đủ cả năm tầng', ic:'ritual', perm:'nghe_chung', capMo:'nghe'},
    {v:'phuong-phap', t:'Xương sống phương pháp',       h:'42 mô thức GITA · 6 nhịp ngôn ngữ',  ic:'brain', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'van-tay',     t:'Sinh trắc học vân tay',        h:'Quan điểm thống nhất của GITA',      ic:'shield', perm:'nghe_chung', capMo:'nghe'},
    {v:'ma-tran',     t:'Ma trận 220 vấn đề × 5 tầng', h:'11 nhóm · 8 cột sâu mỗi tầng',       ic:'map', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'ma-tran-bang',t:'Ma trận × 4 nhóm khách hàng',  h:'XANH · VÀNG · CAM · ĐỎ trong mỗi tầng', ic:'orbit', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'tinh-huong',  t:'250 tình huống thực chiến',   h:'Mã Key · thử thách 7 ngày · KPI',    ic:'target', perm:'nghe_chung', capMo:'nghe'},
    {v:'mo-thuc',     t:'25 mô thức huấn luyện',       h:'Bộ công cụ gốc của người sáng lập',  ic:'brain', perm:'nghe_chung', capMo:'nghe'},
    {v:'tu-duy',      t:'Hệ tư duy mới',               h:'14 bài học đổi cách nhìn trong nhà', ic:'lightning', perm:'nghe_chung', capMo:'nghe'},
    {v:'tai-lieu-goc',t:'Tài liệu gốc Học viện',        h:'5 bộ · 161 bảng · 1.647 dòng dữ liệu', ic:'vault', perm:'nghe_chung', capMo:'nghe', star:1},
    {v:'sach',        t:'Sách gốc & tư liệu Học viện', h:'11 chương · 515 đoạn · tra cứu được',ic:'book', perm:'nghe_chung', capMo:'nghe'},
    {v:'nhan-dien-loi',t:'Bộ nhận diện ngôn từ',       h:'GITA nói thế nào · 10 dấu hiệu câu máy viết', ic:'book', perm:'nghe_chung', capMo:'nghe', star:1},
    {v:'ngon-tu',     t:'Ngôn từ dẫn dắt',             h:'Sáu nhịp · mẫu câu dùng được ngay',  ic:'lightning', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'so-tay-nhan-dien',t:'Sổ tay nhận diện GITA',   h:'7 chương viết rõ · đọc thẳng, không tải xuống', ic:'book', perm:'nghe_chung', capMo:'nghe', star:1},
    {v:'chieu-sau',   t:'Chiều sâu năm lớp',            h:'Mỗi mô thức, năm cấp nghề làm được năm việc khác nhau', ic:'chart', perm:'nghe_chung', capMo:'nghe', star:1},
    {v:'nhan-dien',   t:'Bộ nhận diện GITA',            h:'Logo · ba màu · chữ · luật dùng',    ic:'star', capMo:'chung', star:1},
    {v:'thuong-hieu', t:'Nhận diện thương hiệu',       h:'Màu · chữ · giọng nói · điều cấm kỵ',ic:'star', perm:'nghe_chung', capMo:'nghe'},
    {v:'van-dung',    t:'Năm cấp độ vận dụng',           h:'Chiều sâu nghề · giới hạn tầng · báo cáo', ic:'brain', perm:'nghe_chung', capMo:'nghe', star:1},
    {v:'xu-ly-ca',    t:'Xử lý ca theo quy trình',       h:'7 bước · bằng chứng bắt buộc · 4 ràng buộc', ic:'shield', perm:'ca_xu_ly', capMo:'nghe', star:1},
    {v:'gui-tu-lieu', t:'Gửi tư liệu cho gia đình',      h:'Lời xin đang chờ · cửa KPI 80%',      ic:'share', perm:'tl_gui_khach', capMo:'nghe', star:1},
    {v:'tro-ly',      t:'Trợ lý GITA',                 h:'Hỏi bất cứ điều gì, trích dẫn nguồn',ic:'spark', capMo:'chung', star:1}
   ]},

  {id:'g4',no:'04',ic:'flame',c:'#F61824',
   t:'CÚ HÍCH & NHỊP SỐNG', s:'Làm gì hôm nay để nhà mình khác đi?',
   essence:'Thói quen, nghi lễ, vai giữ và những cú hích đủ lớn để cả nhà bật lên.',
   items:[
    /* Chuyện truyền cảm hứng: mỗi cấp tài khoản một kho trăm chuyện.
       Không gắn perm — vai nào cũng có kho của mình, màn hình tự lọc. */
    {v:'chuyen-cam-hung',t:'Chuyện truyền cảm hứng', h:'100 chuyện cho cấp của mình · 10 mạch · mỗi nhiệm vụ một chuyện', ic:'flame', star:1, capMo:'chung'},
    {v:'chuyen-the-gioi',t:'Chuyện người thật',      h:'Doanh nhân · khoa học · nghệ thuật · thể thao · người Việt', ic:'crown', star:1, capMo:'chung'},
    {v:'giong-doc',   t:'Đọc hoặc nghe · giọng đọc',  h:'Bản quyền giọng · chuẩn phòng thu · kịch bản dẫn', ic:'quote', capMo:'chung'},
    {v:'nhat-ky-vi-tri',t:'Sổ nhật ký của tôi',    h:'Ngày · tuần · tháng · ô ghi riêng cho từng vị trí', ic:'book', star:1, capMo:'chung'},
    {v:'thi-viet',    t:'Cuộc thi viết 7 – 21 – 90 – 365', h:'Bài đạt mốc 90 và 365 nhận học bổng 10%', ic:'crown', star:1, capMo:'chung'},
    {v:'sat-hach',    t:'Sát hạch năng lực',          h:'5 tầng · 4 bài tốt nghiệp · 8 trục đánh giá', ic:'shield', star:1, capMo:'chung'},
    {v:'khoa-dao-tao',t:'Khoá đào tạo của tôi',       h:'Học · Làm · Nộp · bài kế tiếp tự mở', ic:'book', star:1, capMo:'chung'},
    {v:'do-thoi-gian',t:'Thời gian · thưởng · phạt', h:'Đồng hồ thật · ba ngưỡng · chuẩn hoàn thành · quy đổi điểm', ic:'pulse', star:1, capMo:'chung'},
    {v:'chin-vai',    t:'Chín vai giữ trong nhà',      h:'Ai giữ gì, ai đang bị bỏ ra ngoài',  ic:'users', star:1, perm:'kh_gia_dinh', capMo:'nha'},
    {v:'thoi-quen',   t:'Thói quen & nghi lễ',         h:'Bốn nghi lễ giữ nhịp cả năm',        ic:'ritual', perm:'kh_gia_dinh', capMo:'nha'},
    {v:'cu-hich',     t:'Cú hích lớn',                 h:'Chiến dịch tạo bước nhảy, không bước đi', ic:'lightning', perm:'kh_gia_dinh', capMo:'nha'},
    {v:'bang-so',     t:'Bảng số gia đình',            h:'Bảy chỉ số đầu ra của mô hình',      ic:'chart', perm:'kh_gia_dinh', capMo:'nha'},
    {v:'phan-thuong', t:'Ghi nhận · Cấp độ · Quà tặng',h:'10 cấp · huy hiệu · đổi điểm lấy quà',ic:'crown', star:1, perm:'kh_hanh_trinh', capMo:'con'},
    {v:'kho-qua',     t:'Kho 1.000 tài liệu quà tặng', h:'Mắc ở đâu, mở đúng tài liệu ở đó',   ic:'book', perm:'kh_qua_tang', capMo:'qua'},
    {v:'vinh-danh',   t:'Vinh danh & kỳ tích năm',     h:'Chuyện tốt trong nhà phải được kể',  ic:'crown', capMo:'chung'},
    {v:'ranh-gioi',   t:'Sáu ranh giới',               h:'Những điều không bao giờ được làm',  ic:'shield', capMo:'chung'},
    {v:'chuan-nhat',  t:'Chuẩn vận hành',              h:'Kaizen · Monozukuri · Omotenashi · Shokunin',ic:'target', perm:'nghe_chung', capMo:'nghe'}
   ]},

  {id:'g5',no:'05',ic:'orbit',c:'#0B7350',
   t:'HỆ SINH THÁI & VẬN HÀNH', s:'Quanh nhà mình có ai, và hệ thống đang chạy ra sao?',
   essence:'Vệ tinh những người tuyệt vời, đội ngũ dẫn dắt và trung tâm điều hành của cả hệ sinh thái.',
   items:[
    {v:'ve-tinh',     t:'Vệ tinh của tôi',             h:'Những người tuyệt vời quanh mình',   ic:'orbit', star:1, capMo:'chung'},
    {v:'dai-su',      t:'Đại sứ GITA 365',             h:'4 cấp · 20 nhiệm vụ · 13 quy tắc',   ic:'share', perm:'ctv_hoa_hong', capMo:'ctv'},
    {v:'referral',    t:'Phiếu chỉ dẫn referral',      h:'5 chân dung · 12 dấu hiệu · PAIN GOAL GAP', ic:'share', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'hoc-phi',     t:'Học phí năm tầng · nói chuyện tiền', h:'18 kịch bản · 7 luật · nhịp thu và hoàn tiền', ic:'crown', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'chan-dung-kh',t:'Sáu chân dung khách hàng',    h:'Đọc đúng nhà để gửi đúng lộ trình',  ic:'users', perm:'nghe_chung', capMo:'nghe'},
    {v:'chuyen-doi',  t:'Chín cổng chuyển đổi',         h:'Người lạ → đại sứ → cộng tác → đối tác',ic:'compass', star:1, perm:'nghe_chung', capMo:'nghe'},
    {v:'hoa-hong',    t:'Cơ chế tài chính đại sứ',     h:'4 cấp · trần hoa hồng 10%',          ic:'chart', perm:'ctv_hoa_hong', capMo:'ctv'},
    {v:'su-kien',     t:'Sự kiện & Lửa trại',          h:'Nơi cả hệ sinh thái gặp nhau',       ic:'calendar', capMo:'chung'},
    {v:'ket-noi',     t:'Kết nối hệ sinh thái',        h:'Đồng bộ · Facebook · Telegram',      ic:'orbit', capMo:'chung'},
    {v:'coach-deck',  t:'Buồng lái Coach',             h:'Gia đình nào cần chạm trước hôm nay',ic:'flame', perm:'pro_coach', capMo:'nghe'},
    {v:'tuvan-deck',  t:'Khoang mở cửa',               h:'Người đang tìm đường và bước kế tiếp',ic:'compass', perm:'pro_consult', capMo:'nghe'},
    {v:'bando-tuvan', t:'Bản đồ vận hành khách hàng',  h:'Bảy chặng · học thuộc trong 4 tuần', ic:'map', perm:'pro_consult', capMo:'nghe'},
    {v:'bando-coach', t:'Bản đồ coaching',             h:'Sáu nhịp một buổi · sáu điều tối ưu',ic:'flame', perm:'pro_coach', capMo:'nghe'},
    {v:'nguoi-dan-dat',t:'Hành trình người dẫn dắt',   h:'Lớn lên bằng chính nghề mình làm',   ic:'flame', perm:'pro_consult', capMo:'nghe'},
    {v:'doi-ngu',     t:'Đội ngũ dẫn dắt',             h:'Ai đang giữ lửa cho những nhà nào',  ic:'users', perm:'pro_consult', capMo:'nghe'},
    {v:'dieu-hanh',   t:'Trung tâm điều hành',         h:'Toàn cảnh sức khoẻ hệ sinh thái',    ic:'shield', perm:'dh_toan_he', capMo:'dieuhanh'},
    {v:'van-ban',     t:'Bộ văn bản chuẩn',            h:'22 mẫu · giao việc, bàn giao, quyết định',ic:'book', perm:'pro_consult', capMo:'nghe'},
    {v:'tai-chinh-qt',t:'Hệ quản trị tài chính',       h:'6 nguyên tắc · 5 sổ · 6 chốt kiểm soát',ic:'chart', perm:'fin_view', capMo:'taichinh'},
    {v:'quy-trinh-tc',t:'Quy trình tài chính',         h:'Thanh toán · hoàn trả · lương thưởng',ic:'target', perm:'fin_view', capMo:'taichinh'},
    {v:'thanh-tra',   t:'Thanh tra & cảnh báo',        h:'6 chu kỳ · 10 cảnh báo có thời hạn', ic:'pulse', perm:'qt_trang', capMo:'quantri'},
    {v:'ra-soat-kh',  t:'Rà soát mười hai mặt',        h:'Không bỏ sót nhu cầu của gia đình',  ic:'target', perm:'pro_consult', capMo:'nghe'},
    {v:'xuat-du-lieu',t:'Xuất dữ liệu',                h:'PDF hồ sơ · CSV danh sách · phân quyền',ic:'out', perm:'pro_coach', capMo:'nghe'},
    {v:'do-luong-kh', t:'Hệ đo lường khách hàng',      h:'7 chỉ số · 6 nhịp · vòng cải tiến',  ic:'pulse', perm:'pro_consult', capMo:'nghe'},
    {v:'hang-vip',    t:'Phân hạng VIP & VVIP',        h:'4 hạng · chuẩn phục vụ · AI chăm sóc',ic:'crown', star:1, perm:'pro_consult', capMo:'nghe'},
    {v:'hoso-vip',    t:'Chuẩn hồ sơ VIP & VVIP',      h:'7 phần · 30 trường · ba mươi giây',  ic:'book', star:1, perm:'pro_consult', capMo:'nghe'},
    {v:'cay-tien',    t:'Cây tiền — chăm sóc VIP',     h:'4 việc · điểm cây tiền · 12 nhịp',   ic:'seed', perm:'pro_consult', capMo:'nghe'},
    {v:'ai-cham',     t:'Trợ lý chăm sóc tự động',     h:'16 luật chạy nền · ranh giới rõ',    ic:'spark', perm:'nghe_chung', capMo:'nghe'},
    {v:'nhan-su-tt',  t:'Tệp nhân sự trung thành',     h:'5 bậc · 7 chỉ số · 5 luật',          ic:'users', perm:'pro_consult', capMo:'nghe'},
    {v:'tang-quyen',  t:'Tầng quyền truy cập',         h:'Ma trận 15 vai × 21 quyền',          ic:'shield', perm:'qt_trang', capMo:'quantri'},
    {v:'vong-doi-tk', t:'Vòng đời tài khoản',          h:'KPI · khoá · mở lại · đặt lại',      ic:'pulse', perm:'qt_trang', capMo:'quantri'},
    {v:'hang-tai-lieu',t:'Xếp hạng tài liệu 1–100',    h:'KPI và cấp bậc mới mở tài liệu hay', ic:'crown', perm:'qt_trang', capMo:'quantri'},
    {v:'dau-mat',     t:'Mật mã kín trên tài liệu',    h:'Năm lớp mã · quét truy nguồn rò rỉ', ic:'lock', perm:'qt_trang', capMo:'quantri'},
    {v:'dong-chay',   t:'Dòng chảy thông tin',         h:'Bảy dòng nuôi hệ sinh thái',         ic:'orbit', perm:'qt_trang', capMo:'quantri'},
    {v:'kiem-duyet',  t:'Kiểm duyệt kho báu vật',      h:'Chuẩn nghề trước khi xuất bản',      ic:'check', perm:'qt_trang', capMo:'quantri'},
    {v:'tang-truong', t:'Tài chính & tăng trưởng',     h:'Dòng tiền nuôi được sứ mệnh',        ic:'chart', perm:'fin_view', capMo:'taichinh'},
    {v:'chi-phi',     t:'Kiến trúc chi phí',           h:'Trần 500.000đ/tháng · nặng ở máy',   ic:'target', perm:'fin_view', capMo:'taichinh'},
    {v:'hai-long',    t:'Chỉ số hài lòng & góp ý',     h:'Mục tiêu 90% · nghe khách nói thật', ic:'heart', perm:'nghe_chung', capMo:'nghe'},
    {v:'duyet-danh-gia', t:'Duyệt đánh giá công khai', h:'Bốn cửa trước khi lời của gia đình ra ngoài', ic:'shield', perm:'qt_trang', capMo:'nghe'},
    {v:'tai-lieu-khach',t:'Tài liệu gia đình gửi lên',  h:'Đọc sự sáng tạo để nâng cấp lộ trình',ic:'seed', perm:'pro_consult', capMo:'nghe'},
    {v:'kiem-thu',    t:'Phòng kiểm thử 4 chuyên gia',  h:'Khó tính · Hiểu biết · Kỹ sư · Ngôn từ',ic:'target', perm:'qt_trang', capMo:'quantri'},
    {v:'chuan-1000',  t:'Chuẩn 1000 điểm',             h:'Mười nhóm · từng chi tiết một',      ic:'star', perm:'qt_trang', capMo:'quantri'},
    {v:'ai-dieu-phoi',t:'AI điều phối',               h:'Giới hạn tầng · định tuyến KPI · nâng cấp nghề',ic:'brain', perm:'nghe_chung', capMo:'nghe'},
    {v:'an-toan-du-lieu',t:'Lá chắn dữ liệu',          h:'Chống sao chép · chống giả khách',    ic:'lock', perm:'qt_trang', capMo:'quantri'},
    {v:'hoc-tu-lon',  t:'Học từ những hệ thống lớn',   h:'TikTok · Google · Toyota · Apple…',   ic:'target', perm:'qt_trang', capMo:'quantri'},
    {v:'ra-soat',     t:'Rà soát hệ thống',            h:'Bảo mật · mã · dữ liệu · thương hiệu',ic:'shield', perm:'qt_trang', capMo:'quantri'},
   ]},

  /* ══════════ 06 · QUẢN TRỊ TRANG — CHỈ R01 VÀ R02 ══════════
     Thư mục riêng cho việc quản trị chính trang: phân công cấp quyền,
     mở tài khoản mới, khoá – mở lại – xoá tài khoản, và nhật ký.
     Vai từ R03 trở xuống không thấy thư mục này. */
  {id:'g6',no:'06',ic:'lock',c:'#185AB4',
   t:'QUẢN TRỊ TRANG', s:'Ai được vào, vào tới đâu, và ai đã làm gì.',
   essence:'Nơi cấp quyền, mở và khoá tài khoản. Mọi thao tác ở đây đều vào nhật ký kèm tên người làm.',
   items:[
    {v:'noi-may-chu', t:'Nối máy chủ',                 h:'Dán địa chỉ · gọi thử · sáu bước dựng', ic:'orbit', perm:'qt_trang', capMo:'chung', star:1},
    {v:'phan-quyen',   t:'Phân công & cấp quyền',      h:'15 vị trí × 31 quyền · bấm ô để đổi', ic:'shield', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'cap-tai-khoan',t:'Mở tài khoản mới',           h:'Cấp cho vị trí từ Tư vấn trở lên',    ic:'plus', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'khoa-tai-khoan',t:'Khoá · mở lại · xoá',       h:'Vòng đời một tài khoản, có lý do',    ic:'lock', perm:'qt_trang', capMo:'quantri'},
    {v:'nguoi-dung',   t:'Danh bạ người dùng',         h:'Ai đang ở vị trí nào, hoạt động ra sao',ic:'users', perm:'qt_trang', capMo:'quantri'},
    {v:'sap-xep',     t:'Sắp xếp thư mục',              h:'Đổi thứ tự · ẩn bớt · thêm thư mục mới', ic:'orbit', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'sua-hien-thi', t:'Sửa nội dung hiển thị',      h:'Chữ nào chưa hợp lý thì sửa ngay',   ic:'book', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'duyet-tai-lieu',t:'Kiểm duyệt tài liệu',        h:'Xem · chấm chuẩn hoá · duyệt hoặc trả lại',ic:'shield', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'theo-doi-tai-nguyen',t:'Theo dõi tài nguyên',      h:'Cảnh báo khi một tài khoản chạm quá 20% kho', ic:'chart', perm:'qt_tai_nguyen', capMo:'chung', star:1},
    {v:'soat-day-du',t:'Soát đủ ruột — tự kiểm 100%', h:'5 phép soát · đếm lại từ dữ liệu đang nạp', ic:'shield', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'tuyen',      t:'Bốn tuyến chuyên môn',       h:'Engwin · Math · SAT · HSA · bảy mốc trước khi hợp nhất', ic:'orbit', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'quy-trinh-toan-he',t:'Quy trình toàn Web App', h:'8 luồng · từng bước một màn · quyền của cấp quản trị', ic:'map', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'kiem-theo-vai',t:'Kiểm thử theo vai',        h:'Ma trận màn × vai · một cú bấm vào vai bất kỳ', ic:'users', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'tu-van-hanh', t:'Tự vận hành · tự vá · tự học', h:'4 mức tự động · 10 mục canh · quét thật lúc mở màn', ic:'pulse', star:1, perm:'qt_trang', capMo:'quantri'},
    {v:'nhat-ky-ht',  t:'Nhật ký hệ thống',            h:'Mọi thao tác đều để lại dấu vết',    ic:'book', perm:'qt_trang', capMo:'quantri'}
   ]}
];

/* ══════════ 5. LA BÀN VĂN HOÁ — thanh tab bên phải ══════════ */
G.CULTURE = {
  slogan:'Một gia đình vận hành được — không cần ai canh.',
  sloganSub:'GITA 365 · Hệ Sinh Thái Gia Đình Thịnh Vượng',

  /* TẦM NHÌN và SỨ MỆNH là bản gốc DUY NHẤT của hai câu này. Cổng đăng
     nhập và thanh la bàn đều đọc từ đây qua G.UI.vi (xem cuối src/i18n.js),
     nên sửa ở đây là mọi nơi đổi theo. Trước v7.7 có hai bản tầm nhìn khác
     nhau chạy song song — một ở đây, một ở i18n — và người dùng nhìn thấy
     cả hai cùng lúc trên một màn hình. */
  tamNhin:{
    t:'TẦM NHÌN',
    big:'Kiến tạo một hệ sinh thái gia đình phát triển bền vững, nơi mỗi người biết hiểu mình, rèn mình, làm chủ cuộc đời và cùng nhau kiến tạo hạnh phúc, thành công, thịnh vượng qua nhiều thế hệ.',
    sub:'Nhiều thế hệ, không phải một khoá học. Đích đo bằng đời người, không đo bằng học kỳ.'
  },
  /* Mốc 2030 tách khỏi TẦM NHÌN có chủ ý: tầm nhìn nói về loại thế giới
     muốn tạo ra, mốc nói con số và hạn. Gộp hai thứ vào một chỗ rồi gọi
     chung là "tầm nhìn" thì cái nào cũng đọc không rõ. */
  moc2030:{
    t:'MỐC 2030',
    big:'Đến năm 2030, một triệu người Việt lớn lên trong một gia đình vận hành được — nơi đứa trẻ tự cầm lái đời mình và người lớn cũng đang lớn lên mỗi ngày.',
    sub:'Không phải một triệu đứa trẻ ngoan hơn. Là một triệu gia đình khác đi.'
  },
  suMenh:{
    t:'SỨ MỆNH',
    big:'Trao cho mỗi gia đình một bản đồ, một nhịp và một người đồng hành — để sau 365 ngày, nhà ấy tự chạy được mà không cần ai canh.',
    sub:'Chúng tôi đưa khung và giữ chuẩn. Gia đình lắp phần của mình.'
  },

  /* Kim chỉ nam hành động — sáu nguyên tắc rút từ 25 mô thức gốc */
  kimChiNam:[
    {n:'01',t:'Nhìn đúng trước khi sửa',
     d:'Bảy ngày đầu không chữa gì cả. Chưa có dữ liệu thì mọi giải pháp đều là phỏng đoán có thiện chí.'},
    {n:'02',t:'Can thiệp đúng tầng',
     d:'Nhắc con dậy sớm là can thiệp tầng Hành vi. Nếu nút thắt nằm ở tầng Niềm tin thì nhắc bao nhiêu cũng vô ích.'},
    {n:'03',t:'Đổi lăng kính, đừng tăng âm lượng',
     d:'Đưa dữ liệu ba lần mà nhà chưa thấy vấn đề thì lần thứ tư cũng vậy. Phải cho họ đứng ở chỗ khác mà nhìn.'},
    {n:'04',t:'Không làm thay khâu lắp ráp',
     d:'Gia đình chỉ gắn bó với lộ trình mà chính họ góp tay dựng. Làm hộ cho nhanh là lấy mất thứ giữ họ đi hết một năm.'},
    {n:'05',t:'Neo phải có bằng chứng thật',
     d:'Mọi ghi nhận bắt đầu từ việc đã xảy ra, không từ lời động viên. Neo dựng trên chuyện chưa từng có sẽ gãy ở lần vấp đầu tiên.'},
    {n:'06',t:'Người lớn đổi trước',
     d:'Phần thay đổi của cha mẹ phải trình bày được ở hội nghị cuối năm. Không có phần đó thì chặng của con không giữ nổi.'}
  ],

  /* Bảy giá trị cốt lõi */
  giaTri:[
    {k:'THẬT', c:'#185AB4', t:'Trung thực với dữ liệu',
     d:'Nói bằng số có ngày, có giờ, có số lần. Một ngày lệch nhịp là một dữ kiện, không phải một bản án.',
     nen:'Ghi đúng cả hôm tệ nhất.', khong:'Làm đẹp báo cáo để dễ nhìn.'},
    {k:'THƯƠNG', c:'#BE0E16', t:'Tôn trọng vô điều kiện',
     d:'Không dán nhãn, không xếp hạng, không so đứa này với đứa kia. Mỗi người chỉ so với chính mình chặng trước.',
     nen:'Nghe bảy, khuyên ba.', khong:'Dùng dữ liệu để chứng minh ai đó sai.'},
    {k:'CHUẨN', c:'#185AB4', t:'Giữ chuẩn nghề',
     d:'Mọi buổi làm việc đều có kịch bản, có phác đồ, có cổng nghiệm thu. Ngẫu hứng là rủi ro của gia đình khác.',
     nen:'Mở đúng kịch bản cho đúng tầng.', khong:'Ứng biến ngoài chuẩn vì thấy quen tay.'},
    {k:'BỀN', c:'#0B7350', t:'Nhịp hơn cường độ',
     d:'21 ngày một cấp độ, 90 ngày một chặng. Bùng lên một tuần rồi tắt không tạo ra năng lực nào.',
     nen:'Giữ đúng hẹn dù hôm đó ngắn.', khong:'Dồn việc cả tháng vào một buổi.'},
    {k:'TỎ', c:'#5140B4', t:'Minh bạch tới tận cùng',
     d:'Ai giữ vai gì, ai xem được dữ liệu nào, tiền đi đường nào — nói rõ ngay từ đầu và ghi lại.',
     nen:'Nói trước cả điều bất lợi.', khong:'Để gia đình tự đoán về quyền và chi phí.'},
    {k:'TRAO', c:'#0B6675', t:'Trao quyền kèm trách nhiệm',
     d:'Mỗi lần trao một quyền là kèm một trách nhiệm tương ứng. Hỗ trợ giảm dần, nhưng không bao giờ ép về không.',
     nen:'Để con quyết việc con làm được.', khong:'Buông hết rồi gọi đó là tự lập.'},
    {k:'THỊNH', c:'#F61824', t:'Thịnh vượng là cả nhà cùng lớn',
     d:'Đích không phải thành tích của một đứa trẻ. Đích là một hệ gia đình mà mỗi người trong đó đều đang lớn lên.',
     nen:'Đo cả phần thay đổi của người lớn.', khong:'Lấy điểm số của con làm thước đo gia đình.'}
  ],

  /* Nội quy hệ sinh thái */
  noiQuy:[
    {t:'Đúng hẹn là tôn trọng',      d:'Có mặt đúng nhịp đã cam kết. Bận thì báo trước, không im lặng.'},
    {t:'Nghe trước khi khuyên',      d:'Giữ tỉ lệ nghe bảy khuyên ba trong mọi buổi làm việc và mọi bình luận trong nhóm.'},
    {t:'Nói bằng bằng chứng',        d:'Chia sẻ kết quả thì kèm dữ liệu. Không suy diễn nhân quả khi chưa đủ dữ liệu.'},
    {t:'Không dán nhãn ai',          d:'Mô tả hành vi và hoàn cảnh. Không mô tả con người bằng một tính từ.'},
    {t:'Không xếp hạng gia đình',    d:'Bảng số của một nhà chỉ so với chính nhà đó ở chặng trước.'},
    {t:'Giữ kín chuyện của nhà khác',d:'Mọi thứ nghe được trong buổi chung ở lại trong buổi chung.'},
    {t:'Kể cả chỗ mình vấp',         d:'Chia sẻ chỉ toàn thành công làm người mới thấy mình bất thường.'},
    {t:'Không bán trong nhóm học',   d:'Không chào mời sản phẩm, dịch vụ, cơ hội đầu tư trong không gian đồng hành.'},
    {t:'Không dùng kỹ thuật để ép',  d:'Đọc trạng thái người đối diện là để hiểu và hỗ trợ, không để đẩy ai vào quyết định mua.'},
    {t:'Sai thì sửa công khai',      d:'Đăng nhầm, nói nhầm thì đính chính ở đúng chỗ đã nói, không lặng lẽ xoá.'}
  ],

  /* Văn hoá ứng xử — bốn nhịp trong mọi cuộc trò chuyện khó */
  bonNhip:[
    {t:'NGHE',      d:'Nghe hết câu, không cắt ngang, không chuẩn bị câu trả lời trong lúc người kia đang nói.'},
    {t:'CÔNG NHẬN', d:'Gọi tên đúng một điều người kia đã làm được hoặc đã cố gắng, trước khi nói bất cứ điều gì khác.'},
    {t:'LÀM RÕ',    d:'Hỏi để hiểu, không hỏi để bẫy. Một câu hỏi mở, chờ đủ ba giây im lặng.'},
    {t:'DẪN ĐƯỜNG', d:'Đưa một bước nhỏ làm được ngay hôm nay, kèm cách biết mình đã làm được.'}
  ],

  /* Giá trị mang lại cho cộng đồng */
  choCongDong:[
    {n:'Một bản đồ thay cho lời khuyên rời rạc', d:'Gia đình thôi phải tự ghép mảnh từ hàng trăm nguồn mâu thuẫn nhau.'},
    {n:'Một ngôn ngữ chung trong nhà',           d:'Cả nhà nói cùng một hệ khái niệm: khoang, vai, chặng, cổng, bằng chứng.'},
    {n:'Dữ liệu thay cho tranh cãi',             d:'Bữa cơm không còn là phiên toà. Có bảng số thì không cần đoán ý nhau.'},
    {n:'Một thế hệ trẻ biết tự cầm lái',         d:'Quyền điều hành việc học nằm trong tay chính người học vào cuối chặng bốn.'},
    {n:'Người lớn có chỗ để lớn lên',            d:'Cha mẹ không bị coi là người có lỗi, mà là người đang học một nghề khó.'},
    {n:'Một cộng đồng an toàn để kể thật',       d:'Nơi kể chỗ mình vấp không bị đánh giá, và kể chỗ mình thắng không bị ganh.'}
  ],

  /* Nhịp sống của hệ sinh thái */
  nhip:[
    {k:'MỖI NGÀY',   t:'Một lần check-in, ba dòng nhật ký', c:'#185AB4'},
    {k:'MỖI TUẦN',   t:'Một buổi ngồi lại đủ mặt, bốn nhịp NGHE – CÔNG NHẬN – LÀM RÕ – DẪN ĐƯỜNG', c:'#5140B4'},
    {k:'21 NGÀY',    t:'Một cấp độ học tập · rà lại đòn bẩy đang dùng', c:'#0B6675'},
    {k:'90 NGÀY',    t:'Một chặng · một cổng nghiệm thu có bằng chứng', c:'#0B7350'},
    {k:'365 NGÀY',   t:'Hội nghị gia đình · kỳ tích năm · bảng tầm nhìn bản mới', c:'#BE0E16'}
  ],

  /* Khẩu hiệu ngắn — hiện luân phiên */
  camNiem:[
    {t:'Nhà mình không so với nhà ai. Chỉ so với nhà mình hôm qua.', by:'Ranh giới số 1'},
    {t:'Bảy ngày đầu, mình chưa sửa gì cả. Mình chỉ nhìn cho đúng.', by:'Tầng 1 · Nhận diện'},
    {t:'Đứa trẻ không cần thêm một người quản lý. Nó cần một người đồng hành biết đường.', by:'Kim chỉ nam 04'},
    {t:'Việc nào không nối được về tầm nhìn 5–20 năm thì bỏ.', by:'Băng nền · Định hướng'},
    {t:'Cửa đóng hết thì con không lớn được.', by:'Vai 01 · Người giữ cửa'},
    {t:'Ghi nhận mà không có bằng chứng thì chỉ là lời khen cho vui.', by:'Băng nền · Vinh danh'},
    {t:'Gia đình không loại ai. Người chưa làm được vai của mình cần hỗ trợ, không cần thay thế.', by:'Ranh giới số 3'}
  ]
};
