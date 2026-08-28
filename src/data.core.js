/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.0 — LÕI DỮ LIỆU
   Kế thừa nguyên vẹn chuẩn phân quyền, năm tầng và mô thức G–I–T–A
   của hệ thống v6.9 (00_Config.gs), mở rộng cho giao diện Bản Đồ
   Gia Đình Thịnh Vượng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {};
window.G = G;

G.META = {
  name: 'GITA 365',
  version: '7.0',
  tagline: 'Hệ Sinh Thái Gia Đình Thịnh Vượng',
  hotline: '08.5555.4688',
  site: 'truongnhatquang.com',
  soKichBan: 1000, soPhacDo: 220, soMoThuc: 42,
  builtOn: 'Nối tiếp hệ thống GITA 365 v6.9 — 1.000 kịch bản · 220 phác đồ · 25 mô thức · 5 tầng'
};

/* ══════════ 1. VAI TRÒ — lv càng nhỏ càng nhiều quyền ══════════ */
G.ROLES = [
  {id:'R01',lv:1, n:'Super Admin',         short:'Super Admin',portal:'admin', c:'#F5B942',
   ln:'Người giữ chìa khoá gốc của hệ sinh thái.'},
  {id:'R02',lv:2, n:'Admin hệ thống',      short:'Admin',      portal:'admin', c:'#F5B942',
   ln:'Kiến trúc sư vận hành — dựng chuẩn, mở đường, giữ lửa.'},
  {id:'R03',lv:3, n:'Giám đốc',            short:'Giám đốc',   portal:'admin', c:'#FF7A45',
   ln:'Người cầm tầm nhìn và chịu trách nhiệm tăng trưởng.'},
  {id:'R04',lv:4, n:'Quản lý chuyên môn',  short:'QLCM',       portal:'admin', c:'#FF7A45',
   ln:'Người giữ chuẩn nghề của toàn bộ đội ngũ dẫn dắt.'},
  {id:'R05',lv:5, n:'Trưởng nhóm Coach',   short:'TN Coach',   portal:'coach', c:'#8B5CF6',
   ln:'Người tạo ra Coach giỏi, không chỉ làm Coach giỏi.'},
  {id:'R06',lv:6, n:'Senior Coach',        short:'S.Coach',    portal:'coach', c:'#8B5CF6',
   ln:'Người gỡ được những nút thắt mà người khác chưa gỡ nổi.'},
  {id:'R07',lv:7, n:'Coach',               short:'Coach',      portal:'coach', c:'#8B5CF6',
   ln:'Người thắp lửa chuyển hoá cho từng gia đình.'},
  {id:'R08',lv:8, n:'Giáo viên',           short:'Giáo viên',  portal:'coach', c:'#06B6D4',
   ln:'Người dạy đúng thứ học viên đang cần để đi tiếp.'},
  {id:'R09',lv:9, n:'Mentor',              short:'Mentor',     portal:'coach', c:'#06B6D4',
   ln:'Người chạy tám việc băng nền dưới cả năm khoang.'},
  {id:'R10',lv:10,n:'Chuyên gia đánh giá', short:'Assessor',   portal:'coach', c:'#06B6D4',
   ln:'Người trả lại sự thật bằng dữ liệu, không bằng cảm giác.'},
  {id:'R11',lv:11,n:'Chuyên gia tư vấn',   short:'Tư vấn',     portal:'tuvan', c:'#F59E0B',
   ln:'Người mở cánh cửa cho gia đình đang tìm đường.'},
  {id:'R12',lv:12,n:'Phân tích dữ liệu',   short:'Phân tích',  portal:'admin', c:'#3B82F6',
   ln:'Người đọc ra mô thức trước khi nó thành vấn đề.'},
  {id:'R13',lv:13,n:'Phụ huynh',           short:'Phụ huynh',  portal:'ph',    c:'#10B981',
   ln:'Chủ nhân thật sự của bản đồ gia đình thịnh vượng.'},
  {id:'R14',lv:14,n:'Học viên',            short:'Học viên',   portal:'hs',    c:'#3B82F6',
   ln:'Người đang viết chương hay nhất của đời mình.'},
  {id:'R15',lv:15,n:'CTV giới thiệu',      short:'Đại sứ',     portal:'ctv',   c:'#FB7185',
   ln:'Người mang ánh sáng này tới nhà tiếp theo.'}
];

/* Quyền → cấp bậc TỐI ĐA được dùng (nguồn sự thật từ v6.9) */
G.PERM = {
  sys_config:1, sys_delete_user:1, sys_restore:1, sys_manage_user:2, sys_audit:2, sys_fraud:3,
  fin_view:3, fin_payout:3, fin_payroll:3, fin_create_order:11,
  pro_approve:4, pro_report:4, pro_override:4, pro_assign:5, pro_coach:8, pro_assess:10,
  pro_view_all:4, pro_consult:11,
  usr_self_data:15, usr_do_test:15, usr_referral:15
};

/* Sáu chân dung người dùng — lời mời bước vào, hiển thị ở Cổng vào */
G.PORTALS = {
  admin:{n:'Trung Tâm Điều Hành', ic:'shield', c:'#F5B942', home:'dieu-hanh',
    say:'Anh nhìn thấy toàn bộ trường năng lượng: từng gia đình đang ở đâu, đội ngũ đang giữ lửa thế nào, kho báu vật đang được dùng ra sao.'},
  coach:{n:'Buồng Lái Của Coach', ic:'flame', c:'#8B5CF6', home:'coach-deck',
    say:'Mỗi buổi anh chị bước vào là một gia đình đổi hướng. Đây là nơi anh chị thấy rõ nên chạm vào đâu trước.'},
  tuvan:{n:'Khoang Mở Cửa', ic:'compass', c:'#F59E0B', home:'tuvan-deck',
    say:'Người đối diện chưa cần nghe anh chị giỏi thế nào. Họ cần thấy nhà mình trong tấm bản đồ này.'},
  ph:{n:'Bản Đồ Nhà Mình', ic:'home', c:'#10B981', home:'bat-dau',
    say:'Đây là bản đồ của chính gia đình anh chị. Không ai viết hộ. Hệ thống chỉ giữ chuẩn và soi đường.'},
  hs:{n:'Hành Trình Của Con', ic:'star', c:'#3B82F6', home:'bat-dau',
    say:'Đây là hành trình của em. Mỗi ngày em đi thêm một bước, bản đồ này sáng thêm một chỗ.'},
  ctv:{n:'Vệ Tinh Lan Toả', ic:'share', c:'#FB7185', home:'dai-su',
    say:'Câu chuyện thật của anh chị là thứ mở được cánh cửa mà không quảng cáo nào mở nổi.'}
};

/* ══════════ 2. NĂM TẦNG ══════════ */
G.TIERS = [
  {id:1,code:'T1',name:'NHẬN DIỆN',q:'Đang có vấn đề gì?',days:7,c:'#3B82F6',
   goal:'Lập baseline trung thực, phát hiện mô thức, hình thành 1–3 giả thuyết G–I–T–A.',
   note:'Tầng 1 KHÔNG chữa vấn đề. Chỉ quan sát, ghi dữ liệu, tìm mô thức.',
   feel:'Lần đầu cả nhà nhìn thấy sự thật mà không cãi nhau.'},
  {id:2,code:'T2',name:'GIẢI MÃ',q:'Vì sao vấn đề xảy ra?',days:21,c:'#8B5CF6',
   goal:'Kiểm chứng giả thuyết qua 3 vòng 7 ngày, chốt cơ chế ưu tiên.',
   note:'Mỗi vòng chỉ thay ít biến, ghi bằng chứng ủng hộ và phản bác.',
   feel:'Hết đổ lỗi. Bắt đầu hiểu cơ chế.'},
  {id:3,code:'T3',name:'KIẾN TẠO',q:'Cần làm gì và làm thế nào?',days:90,c:'#06B6D4',
   goal:'4 chuỗi 21 ngày: có cấu trúc → tự điều hành → thích ứng → chuyển giao.',
   note:'Mỗi cấp có PDCA và cổng nghiệm thu.',
   feel:'Nhà mình có một hệ thống chạy được, do chính mình dựng.'},
  {id:4,code:'T4',name:'CHUYỂN HÓA',q:'Làm sao duy trì thay đổi thành năng lực?',days:365,c:'#10B981',
   goal:'4 chu kỳ 90 ngày: năng lực nền → ổn định → thích ứng → chuyển giao.',
   note:'Tăng dần độ khó, giảm dần hỗ trợ Coach.',
   feel:'Quyền điều hành việc học đã nằm trong tay con.'},
  {id:5,code:'T5',name:'BỨT PHÁ',q:'Gia đình có thể phát triển tới đâu?',days:365,c:'#F59E0B',
   goal:'Đồng bộ học viên – phụ huynh – gia đình. Từ tự quản sang tạo giá trị.',
   note:'Coach đồng hành cả gia đình. Đích: hệ thống tự vận hành sau 365 ngày.',
   feel:'Một gia đình vận hành được mà không cần ai canh.'}
];

/* ══════════ 3. MÔ THỨC G–I–T–A ══════════ */
G.GITA = [
  {k:'G',name:'Goal — Hệ thống mục tiêu',short:'Mục tiêu',c:'#3B82F6',
   desc:'Học viên có mục tiêu rõ, có ý nghĩa, do chính mình sở hữu không?',
   probe:'Con muốn điều gì? Điều đó là của con hay của người lớn? Đạt được thì khác đi thế nào?',
   inc:['Mục tiêu','Kết quả','Kỳ tích','Nguyện vọng','Thành quả']},
  {k:'I',name:'Inspirits — Nội lực',short:'Nội lực',c:'#8B5CF6',
   desc:'Khát khao và niềm tin bên trong có đủ để duy trì hành động không?',
   probe:'Điều gì khiến con muốn làm? Con tin mình làm được tới đâu? Khi thất bại con nghĩ gì?',
   inc:['Khát khao','Động lực','Cảm hứng','Giá trị','Đam mê','Tầm nhìn','Thái độ','Hệ thống niềm tin']},
  {k:'T',name:'Talent — Hệ thống tài năng',short:'Năng lực',c:'#10B981',
   desc:'Học viên có đủ năng lực, phương pháp và kỹ năng để làm được không?',
   probe:'Con biết cách làm chưa? Con mạnh nhất ở đâu? Cách làm nào đã hiệu quả với con?',
   inc:['Tài năng','Điểm mạnh','Sở trường','Tư duy','Phương pháp','Kỹ năng xuất sắc']},
  {k:'A',name:'Academy & Action — Hệ sinh thái và hành động',short:'Môi trường & Hành động',c:'#F59E0B',
   desc:'Môi trường, quan hệ, thói quen và hệ thống vận hành có nâng đỡ hành động không?',
   probe:'Ai quanh con? Không gian và nhịp sống thế nào? Con đang dùng hệ thống nào để vận hành?',
   inc:['Quan hệ chất lượng','Mentor và nhóm trí tuệ','Hệ thống thói quen','Quy tắc','Đo lường','PDCA','Tháp học tập']}
];

/* ══════════ 4. NĂM NHÓM CHÍNH — thanh tab bên trái ══════════ */
G.NAV = [
  {id:'g1',no:'01',ic:'map',c:'#F5B942',
   t:'BẢN ĐỒ THỊNH VƯỢNG', s:'Nhà mình đang ở đâu, và sẽ thành gì?',
   essence:'Nơi mọi thứ bắt đầu: nhìn cho đúng trước khi sửa bất cứ điều gì.',
   items:[
    {v:'bat-dau',     t:'Bắt đầu ở đây',               h:'Năm bước đầu tiên, đúng thứ tự',     ic:'seed', star:1},
    {v:'ban-do',      t:'Bản Đồ Gia Đình Thịnh Vượng', h:'5 khoang · 9 vai · băng nền 8 việc', ic:'map', star:1},
    {v:'chan-dung-nha',t:'Chân dung nhà mình',         h:'Từng thành viên thật sự là ai',      ic:'users'},
    {v:'dinh-vi',     t:'Định vị hôm nay',             h:'Bảng số trung thực, không cảm giác', ic:'pulse'},
    {v:'tam-nhin',    t:'Tầm nhìn 5 – 20 năm',         h:'Cả nhà viết, không ai viết hộ ai',   ic:'sun'},
    {v:'chuyen-hoa',  t:'Từ nỗi đau đến khát khao',    h:'Bảy chuyển dịch làm nên một gia đình khác', ic:'flame'},
    {v:'hanh-trinh-con',t:'Hành trình của con',        h:'Từ nhiều vấn đề đến niềm tự hào',    ic:'star'},
    {v:'diem-cham',   t:'Bản đồ điểm chạm cảm xúc',   h:'Chín khoảnh khắc quyết định họ ở lại', ic:'heart'},
    {v:'dong-hanh',   t:'Người đồng hành',             h:'Cố vấn luôn lắng nghe, có mặt mọi lúc',ic:'heart', star:1},
    {v:'wow',         t:'Chuỗi WOW',                   h:'Bảy khoảnh khắc đáng nhớ của hành trình',ic:'spark'}
   ]},

  {id:'g2',no:'02',ic:'compass',c:'#8B5CF6',
   t:'HÀNH TRÌNH 5 TẦNG', s:'Đi theo thứ tự nào để không vỡ trận?',
   essence:'Bảy ngày nhìn đúng · 21 ngày hiểu cơ chế · 90 ngày dựng hệ thống · 365 ngày trao quyền.',
   items:[
    {v:'lo-trinh',    t:'Lộ trình T1 → T5',            h:'Năm chặng, mỗi chặng một câu hỏi',   ic:'compass', star:1},
    {v:'gita-map',    t:'Bản đồ G – I – T – A',        h:'Bốn miền để đọc đúng nguyên nhân',   ic:'brain'},
    {v:'chu-ky',      t:'Chu kỳ 21 / 90 ngày',         h:'PDCA và cổng nghiệm thu từng chặng', ic:'ritual'},
    {v:'nhiem-vu',    t:'Nhiệm vụ & Nhật ký 365',      h:'Việc của hôm nay, ghi lại được',     ic:'check'},
    {v:'chan-dung-tc',t:'Mười chân dung thành công',   h:'Người đi trước trông như thế nào',   ic:'crown'},
    {v:'cong-nghiem-thu',t:'Cổng nghiệm thu',          h:'Qua chặng bằng bằng chứng, không bằng lời', ic:'shield', perm:'pro_approve'},
    {v:'kien-truc-100',t:'Kiến trúc một trăm năm',     h:'100 tầng giá trị · 5 thời kỳ · mỗi năm +3–5%',ic:'sun', star:1}
   ]},

  {id:'g3',no:'03',ic:'vault',c:'#06B6D4',
   t:'KHO BÁU VẬT', s:'Cần bí kíp nào cho đúng tình huống này?',
   essence:'1.000 kịch bản · 220 phác đồ · 25 mô thức · toàn văn sách gốc — mở khoá theo tiến trình.',
   items:[
    {v:'kho',         t:'Kho báu vật',                 h:'Toàn cảnh những gì anh chị đang có', ic:'vault', star:1},
    {v:'phac-do',     t:'220 phác đồ × 5 tầng',        h:'Vấn đề nào cũng có đường đi',        ic:'book',  perm:'pro_coach'},
    {v:'kich-ban',    t:'1.000 kịch bản chuyên môn',   h:'Tư vấn và coaching, đủ cả năm tầng', ic:'ritual',perm:'pro_consult'},
    {v:'mo-thuc',     t:'25 mô thức huấn luyện',       h:'Bộ công cụ gốc của người sáng lập',  ic:'brain', perm:'pro_coach'},
    {v:'tu-duy',      t:'Hệ tư duy mới',               h:'14 bài học đổi cách nhìn trong nhà', ic:'lightning'},
    {v:'sach',        t:'Sách gốc & tư liệu Học viện', h:'11 chương · 515 đoạn · tra cứu được',ic:'book'},
    {v:'ngon-tu',     t:'Ngôn từ dẫn dắt',             h:'Sáu nhịp · mẫu câu dùng được ngay',  ic:'lightning', star:1},
    {v:'thuong-hieu', t:'Nhận diện thương hiệu',       h:'Màu · chữ · giọng nói · điều cấm kỵ',ic:'star'},
    {v:'tro-ly',      t:'Trợ lý GITA',                 h:'Hỏi bất cứ điều gì, trích dẫn nguồn',ic:'spark'}
   ]},

  {id:'g4',no:'04',ic:'flame',c:'#FF7A45',
   t:'CÚ HÍCH & NHỊP SỐNG', s:'Làm gì hôm nay để nhà mình khác đi?',
   essence:'Thói quen, nghi lễ, vai giữ và những cú hích đủ lớn để cả nhà bật lên.',
   items:[
    {v:'chin-vai',    t:'Chín vai giữ trong nhà',      h:'Ai giữ gì, ai đang bị bỏ ra ngoài',  ic:'users', star:1},
    {v:'thoi-quen',   t:'Thói quen & nghi lễ',         h:'Bốn nghi lễ giữ nhịp cả năm',        ic:'ritual'},
    {v:'cu-hich',     t:'Cú hích lớn',                 h:'Chiến dịch tạo bước nhảy, không bước đi', ic:'lightning'},
    {v:'bang-so',     t:'Bảng số gia đình',            h:'Bảy chỉ số đầu ra của mô hình',      ic:'chart'},
    {v:'phan-thuong', t:'Ghi nhận · Cấp độ · Quà tặng',h:'10 cấp · huy hiệu · đổi điểm lấy quà',ic:'crown', star:1},
    {v:'vinh-danh',   t:'Vinh danh & kỳ tích năm',     h:'Chuyện tốt trong nhà phải được kể',  ic:'crown'},
    {v:'ranh-gioi',   t:'Sáu ranh giới',               h:'Những điều không bao giờ được làm',  ic:'shield'},
    {v:'chuan-nhat',  t:'Chuẩn vận hành',              h:'Kaizen · Monozukuri · Omotenashi · Shokunin',ic:'target'}
   ]},

  {id:'g5',no:'05',ic:'orbit',c:'#10B981',
   t:'HỆ SINH THÁI & VẬN HÀNH', s:'Quanh nhà mình có ai, và hệ thống đang chạy ra sao?',
   essence:'Vệ tinh những người tuyệt vời, đội ngũ dẫn dắt và trung tâm điều hành của cả hệ sinh thái.',
   items:[
    {v:'ve-tinh',     t:'Vệ tinh của tôi',             h:'Những người tuyệt vời quanh mình',   ic:'orbit', star:1},
    {v:'dai-su',      t:'Đại sứ GITA 365',             h:'4 cấp · 20 nhiệm vụ · 13 quy tắc',   ic:'share'},
    {v:'hoa-hong',    t:'Cơ chế tài chính đại sứ',     h:'4 cấp · trần hoa hồng 10%',          ic:'chart'},
    {v:'su-kien',     t:'Sự kiện & Lửa trại',          h:'Nơi cả hệ sinh thái gặp nhau',       ic:'calendar'},
    {v:'coach-deck',  t:'Buồng lái Coach',             h:'Gia đình nào cần chạm trước hôm nay',ic:'flame',  perm:'pro_coach'},
    {v:'tuvan-deck',  t:'Khoang mở cửa',               h:'Người đang tìm đường và bước kế tiếp',ic:'compass',perm:'pro_consult'},
    {v:'nguoi-dan-dat',t:'Hành trình người dẫn dắt',   h:'Lớn lên bằng chính nghề mình làm',   ic:'flame',  perm:'pro_consult'},
    {v:'doi-ngu',     t:'Đội ngũ dẫn dắt',             h:'Ai đang giữ lửa cho những nhà nào',  ic:'users',  perm:'pro_consult'},
    {v:'dieu-hanh',   t:'Trung tâm điều hành',         h:'Toàn cảnh sức khoẻ hệ sinh thái',    ic:'shield', perm:'pro_report'},
    {v:'nguoi-dung',  t:'Quản trị con người',          h:'Tài khoản, vai trò, phân quyền',     ic:'lock',   perm:'sys_manage_user'},
    {v:'tang-quyen',  t:'Tầng quyền truy cập',         h:'Ma trận 15 vai × 21 quyền',          ic:'shield', perm:'sys_manage_user'},
    {v:'vong-doi-tk', t:'Vòng đời tài khoản',          h:'KPI · khoá · mở lại · đặt lại',      ic:'pulse',  perm:'sys_manage_user'},
    {v:'hang-tai-lieu',t:'Xếp hạng tài liệu 1–100',    h:'KPI và cấp bậc mới mở tài liệu hay', ic:'crown',  perm:'pro_consult'},
    {v:'dau-mat',     t:'Mật mã kín trên tài liệu',    h:'Năm lớp mã · quét truy nguồn rò rỉ', ic:'lock',   perm:'pro_approve'},
    {v:'dong-chay',   t:'Dòng chảy thông tin',         h:'Bảy dòng nuôi hệ sinh thái',         ic:'orbit',  perm:'pro_report'},
    {v:'kiem-duyet',  t:'Kiểm duyệt kho báu vật',      h:'Chuẩn nghề trước khi xuất bản',      ic:'check',  perm:'pro_approve'},
    {v:'tang-truong', t:'Tài chính & tăng trưởng',     h:'Dòng tiền nuôi được sứ mệnh',        ic:'chart',  perm:'fin_view'},
    {v:'chi-phi',     t:'Kiến trúc chi phí',           h:'Trần 500.000đ/tháng · nặng ở máy',   ic:'target', perm:'fin_view'},
    {v:'hai-long',    t:'Chỉ số hài lòng & góp ý',     h:'Mục tiêu 90% · nghe khách nói thật', ic:'heart',  perm:'pro_consult'},
    {v:'tai-lieu-khach',t:'Tài liệu gia đình gửi lên',  h:'Đọc sự sáng tạo để nâng cấp lộ trình',ic:'seed',  perm:'pro_coach'},
    {v:'kiem-thu',    t:'Phòng kiểm thử 4 chuyên gia',  h:'Khó tính · Hiểu biết · Kỹ sư · Ngôn từ',ic:'target',perm:'pro_report'},
    {v:'chuan-1000',  t:'Chuẩn 1000 điểm',             h:'Mười nhóm · từng chi tiết một',      ic:'star',   perm:'pro_report'},
    {v:'ai-dieu-phoi',t:'AI điều phối',               h:'Giới hạn tầng · định tuyến KPI · nâng cấp nghề',ic:'brain', perm:'pro_coach'},
    {v:'an-toan-du-lieu',t:'Lá chắn dữ liệu',          h:'Chống sao chép · chống giả khách',    ic:'lock',   perm:'pro_report'},
    {v:'hoc-tu-lon',  t:'Học từ những hệ thống lớn',   h:'TikTok · Google · Toyota · Apple…',   ic:'target', perm:'pro_report'},
    {v:'ra-soat',     t:'Rà soát hệ thống',            h:'Bảo mật · mã · dữ liệu · thương hiệu',ic:'shield', perm:'pro_report'},
    {v:'nhat-ky-ht',  t:'Nhật ký hệ thống',            h:'Mọi thao tác đều để lại dấu vết',    ic:'book',   perm:'sys_audit'}
   ]}
];

/* ══════════ 5. LA BÀN VĂN HOÁ — thanh tab bên phải ══════════ */
G.CULTURE = {
  slogan:'Một gia đình vận hành được — không cần ai canh.',
  sloganSub:'GITA 365 · Hệ Sinh Thái Gia Đình Thịnh Vượng',

  tamNhin:{
    t:'TẦM NHÌN',
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
    {k:'THẬT', c:'#3B82F6', t:'Trung thực với dữ liệu',
     d:'Nói bằng số có ngày, có giờ, có số lần. Một ngày lệch nhịp là một dữ kiện, không phải một bản án.',
     nen:'Ghi đúng cả hôm tệ nhất.', khong:'Làm đẹp báo cáo để dễ nhìn.'},
    {k:'THƯƠNG', c:'#FB7185', t:'Tôn trọng vô điều kiện',
     d:'Không dán nhãn, không xếp hạng, không so đứa này với đứa kia. Mỗi người chỉ so với chính mình chặng trước.',
     nen:'Nghe bảy, khuyên ba.', khong:'Dùng dữ liệu để chứng minh ai đó sai.'},
    {k:'CHUẨN', c:'#F5B942', t:'Giữ chuẩn nghề',
     d:'Mọi buổi làm việc đều có kịch bản, có phác đồ, có cổng nghiệm thu. Ngẫu hứng là rủi ro của gia đình khác.',
     nen:'Mở đúng kịch bản cho đúng tầng.', khong:'Ứng biến ngoài chuẩn vì thấy quen tay.'},
    {k:'BỀN', c:'#10B981', t:'Nhịp hơn cường độ',
     d:'21 ngày một cấp độ, 90 ngày một chặng. Bùng lên một tuần rồi tắt không tạo ra năng lực nào.',
     nen:'Giữ đúng hẹn dù hôm đó ngắn.', khong:'Dồn việc cả tháng vào một buổi.'},
    {k:'TỎ', c:'#8B5CF6', t:'Minh bạch tới tận cùng',
     d:'Ai giữ vai gì, ai xem được dữ liệu nào, tiền đi đường nào — nói rõ ngay từ đầu và ghi lại.',
     nen:'Nói trước cả điều bất lợi.', khong:'Để gia đình tự đoán về quyền và chi phí.'},
    {k:'TRAO', c:'#06B6D4', t:'Trao quyền kèm trách nhiệm',
     d:'Mỗi lần trao một quyền là kèm một trách nhiệm tương ứng. Hỗ trợ giảm dần, nhưng không bao giờ ép về không.',
     nen:'Để con quyết việc con làm được.', khong:'Buông hết rồi gọi đó là tự lập.'},
    {k:'THỊNH', c:'#FF7A45', t:'Thịnh vượng là cả nhà cùng lớn',
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
    {k:'MỖI NGÀY',   t:'Một lần check-in, ba dòng nhật ký', c:'#3B82F6'},
    {k:'MỖI TUẦN',   t:'Một buổi ngồi lại đủ mặt, bốn nhịp NGHE – CÔNG NHẬN – LÀM RÕ – DẪN ĐƯỜNG', c:'#8B5CF6'},
    {k:'21 NGÀY',    t:'Một cấp độ học tập · rà lại đòn bẩy đang dùng', c:'#06B6D4'},
    {k:'90 NGÀY',    t:'Một chặng · một cổng nghiệm thu có bằng chứng', c:'#10B981'},
    {k:'365 NGÀY',   t:'Hội nghị gia đình · kỳ tích năm · bảng tầm nhìn bản mới', c:'#F59E0B'}
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
