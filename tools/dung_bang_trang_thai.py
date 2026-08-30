"""Dựng bảng trạng thái Leader Boom theo đúng nhận diện thương hiệu.

Số liệu lấy từ lần chạy `tools/kiem_dinh.py` gần nhất. Màu và bộ chữ theo
docs/nhan-dien-thuong-hieu/03-mau-sac.md và 04-typography.md — trang này là
ấn phẩm mang nhận diện, nên chịu cùng chuẩn với mọi ấn phẩm khác.

    python3 tools/dung_bang_trang_thai.py
"""
import io, base64, os
GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SP = os.path.join(GOC, 'brand', 'trang')
os.makedirs(SP, exist_ok=True)
logo = base64.b64encode(open(os.path.join(GOC,'brand','logo','leaderboom-logomark-256.png'),'rb').read()).decode()

HEAD = '''<title>Bảng Trạng Thái Leader Boom</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap">
<style>
:root{
  --nen:#F4F5F8; --the:#FFFFFF; --nen-chim:#E8ECFB;
  --muc:#151821; --phu:#5B6273; --ke:#DDE1EA;
  --xanh:#0B1E8C; --xanh-man:#0000FE; --vang:#FCFF00; --kim:#C6A443;
  --dat:#1B6B45; --luu-y:#A8641A; --dung:#A3231B;
  --tren-xanh:#FFFFFF;
  --bong:0 1px 2px rgba(11,30,140,.06), 0 8px 24px -12px rgba(11,30,140,.18);
  --t0:#B9C2DA; --t1:#0B1E8C; --t2:#2242C4; --t3:#4A66E6; --t4:#8FA0F2;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --nen:#080B14; --the:#111624; --nen-chim:#161D33;
    --muc:#E9ECF6; --phu:#98A0B5; --ke:#242C42;
    --xanh:#8FA6FF; --xanh-man:#7C8DFF; --vang:#FCFF00; --kim:#D9BC6A;
    --dat:#4FBE8B; --luu-y:#E0A057; --dung:#F0776C;
    --tren-xanh:#080B14;
    --bong:0 1px 2px rgba(0,0,0,.5), 0 10px 28px -14px rgba(0,0,0,.8);
    --t0:#41496B; --t1:#5A72E8; --t2:#7186F0; --t3:#8D9DF5; --t4:#B3BEFA;
  }
}
:root[data-theme="dark"]{
  --nen:#080B14; --the:#111624; --nen-chim:#161D33;
  --muc:#E9ECF6; --phu:#98A0B5; --ke:#242C42;
  --xanh:#8FA6FF; --xanh-man:#7C8DFF; --vang:#FCFF00; --kim:#D9BC6A;
  --dat:#4FBE8B; --luu-y:#E0A057; --dung:#F0776C;
  --tren-xanh:#080B14;
  --bong:0 1px 2px rgba(0,0,0,.5), 0 10px 28px -14px rgba(0,0,0,.8);
  --t0:#41496B; --t1:#5A72E8; --t2:#7186F0; --t3:#8D9DF5; --t4:#B3BEFA;
}

*{box-sizing:border-box}
body{
  background:var(--nen); color:var(--muc);
  font-family:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:16px; line-height:1.6; margin:0;
  -webkit-font-smoothing:antialiased;
}
.bo{max-width:1120px; margin:0 auto; padding:0 24px}
h1,h2,h3,.hieu{font-family:Oswald,"Arial Narrow",system-ui,sans-serif; text-wrap:balance}
td.ma{font-family:"JetBrains Mono",ui-monospace,monospace; font-weight:600; color:var(--xanh); white-space:nowrap}
code,.ma,.so{font-family:"JetBrains Mono",ui-monospace,Menlo,Consolas,monospace; font-variant-numeric:tabular-nums}

/* ── nhãn mục ── */
.nhan{
  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:11px; font-weight:600;
  letter-spacing:.16em; text-transform:uppercase; color:var(--phu);
  display:flex; align-items:center; gap:12px; margin:0 0 6px;
}
.nhan::after{content:""; flex:1; height:1px; background:var(--ke)}

/* ── đầu trang ── */
.dau{background:var(--xanh); color:#fff; padding:38px 0 34px; border-bottom:5px solid var(--vang)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .dau{background:#0B1330}}
:root[data-theme="dark"] .dau{background:#0B1330}
.dau .bo{display:flex; align-items:center; gap:22px; flex-wrap:wrap}
.dau img{width:62px; height:62px; display:block; filter:drop-shadow(0 3px 10px rgba(0,0,0,.4))}
.dau h1{font-size:clamp(27px,4.4vw,42px); font-weight:700; margin:0; line-height:1.05; letter-spacing:.005em; color:#fff}
:root[data-theme="dark"] .dau h1{color:#EEF1FF}
.dau .duoi{margin:5px 0 0; font-size:14.5px; color:rgba(255,255,255,.76); max-width:56ch}
:root[data-theme="dark"] .dau .duoi{color:#9FAEDC}
.dau .ngay{margin-left:auto; text-align:right; font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.6)}
:root[data-theme="dark"] .dau .ngay{color:#8494C4}

/* ── dải phán quyết ── */
.phan-quyet{
  background:var(--the); border:1px solid var(--ke); border-radius:3px;
  box-shadow:var(--bong); margin:-26px 0 0; position:relative; overflow:hidden;
}
.phan-quyet::before{content:""; position:absolute; inset:0 auto 0 0; width:5px; background:var(--dat)}
.pq-tren{display:flex; align-items:baseline; gap:20px; flex-wrap:wrap; padding:20px 26px 16px 30px; border-bottom:1px solid var(--ke)}
.pq-tren strong{font-family:Oswald,sans-serif; font-size:25px; font-weight:600; color:var(--dat); letter-spacing:.01em}
.pq-tren span{font-size:14px; color:var(--phu)}
.pq-tren .lenh{margin-left:auto; font-size:12.5px; background:var(--nen-chim); color:var(--xanh); padding:5px 11px; border-radius:3px}
.chip-hang{display:grid; grid-template-columns:repeat(auto-fit,minmax(112px,1fr)); gap:1px; background:var(--ke)}
.chip{background:var(--the); padding:12px 13px; display:flex; flex-direction:column; gap:3px}
.chip b{font-family:"JetBrains Mono",monospace; font-size:12px; font-weight:600; color:var(--xanh); letter-spacing:.05em}
.chip i{font-style:normal; font-size:11.5px; color:var(--phu); line-height:1.35}
.chip em{font-style:normal; font-size:11px; font-weight:600; color:var(--dat); letter-spacing:.06em}

/* ── mục ── */
section{padding:46px 0 0}
h2{font-size:24px; font-weight:600; margin:0 0 4px; letter-spacing:.01em}
.dan{color:var(--phu); font-size:14.5px; max-width:68ch; margin:0 0 20px}

/* ── trục thời gian ── */
.truc{background:var(--the); border:1px solid var(--ke); border-radius:3px; padding:26px 26px 18px; box-shadow:var(--bong); overflow-x:auto}
.truc-trong{min-width:700px}
.thang{position:relative; height:126px; margin:22px 0 4px}
.tang{position:absolute; height:22px; border-radius:2px; min-width:3px}
.duong{position:absolute; left:0; right:0; top:64px; height:2px; background:var(--ke)}
.cong{position:absolute; top:52px; width:2px; height:26px; background:var(--xanh)}
.cong::before{content:""; position:absolute; top:-7px; left:-4px; width:10px; height:10px; border-radius:50%; background:var(--xanh); border:2px solid var(--the)}
.cong span{position:absolute; left:50%; transform:translateX(-50%); font-family:"JetBrains Mono",monospace; font-size:10.5px; font-weight:600; color:var(--xanh); white-space:nowrap}
.cong.cuoi{background:var(--kim)}
.cong.cuoi::before{background:var(--kim)}
.cong.cuoi span{color:var(--kim)}
.moc{position:absolute; top:98px; font-family:"JetBrains Mono",monospace; font-size:10px; color:var(--phu); transform:translateX(-50%)}
.chu-giai{display:flex; gap:16px; flex-wrap:wrap; font-size:12px; color:var(--phu); margin-top:14px}
.chu-giai span{display:flex; align-items:center; gap:6px}
.chu-giai i{width:11px; height:11px; border-radius:2px; display:inline-block; flex:none}
.chu-giai b{color:var(--muc); font-weight:600}
.doc-truc{display:flex; gap:18px; flex-wrap:wrap; font-size:12px; color:var(--phu); border-top:1px solid var(--ke); padding-top:13px; margin-top:16px}
.doc-truc b{color:var(--muc)}

/* ── bảng ── */
.cuon{overflow-x:auto; border:1px solid var(--ke); border-radius:3px; background:var(--the); box-shadow:var(--bong)}
table{border-collapse:collapse; width:100%; min-width:560px; font-size:14px}
th{
  font-family:"JetBrains Mono",monospace; font-size:10.5px; font-weight:600; letter-spacing:.13em;
  text-transform:uppercase; color:var(--phu); text-align:left; padding:11px 16px;
  border-bottom:1px solid var(--ke); background:var(--nen-chim); white-space:nowrap;
}
td{padding:11px 16px; border-bottom:1px solid var(--ke); vertical-align:top}
tbody tr:last-child td{border-bottom:none}
td.so{text-align:right; font-size:13.5px; white-space:nowrap}
td.ten b{font-weight:600}
td.ten i{font-style:normal; display:block; font-size:12.5px; color:var(--phu); margin-top:1px}
.tong td{background:var(--nen-chim); font-weight:600; border-top:2px solid var(--xanh)}

/* ── bất biến ── */
.bb{display:grid; grid-template-columns:repeat(auto-fit,minmax(228px,1fr)); gap:14px}
.bb-o{background:var(--the); border:1px solid var(--ke); border-left:3px solid var(--xanh); border-radius:3px; padding:15px 17px; box-shadow:var(--bong)}
.bb-o .gt{font-family:Oswald,sans-serif; font-size:29px; font-weight:600; color:var(--xanh); line-height:1; letter-spacing:.01em}
.bb-o .gt small{font-family:"Be Vietnam Pro",sans-serif; font-size:13px; font-weight:500; color:var(--phu); letter-spacing:0}
.bb-o h4{margin:8px 0 3px; font-size:13.5px; font-weight:600}
.bb-o p{margin:0; font-size:12.5px; color:var(--phu); line-height:1.45}
.bb-o .ch{display:inline-block; margin-top:8px; font-family:"JetBrains Mono",monospace; font-size:10.5px; font-weight:600; letter-spacing:.08em; color:var(--xanh); background:var(--nen-chim); padding:2px 7px; border-radius:2px}

/* ── trích ── */
.trich{border-left:3px solid var(--vang); background:var(--the); padding:17px 22px; margin:22px 0 0; font-size:14.5px; border-radius:0 3px 3px 0; box-shadow:var(--bong)}
.trich p{margin:0}
.trich p + p{margin-top:9px}
.trich b{color:var(--xanh)}

/* ── ưu tiên ── */
.uu{display:inline-block; font-family:"JetBrains Mono",monospace; font-size:10px; font-weight:600; letter-spacing:.08em; padding:2px 7px; border-radius:2px; white-space:nowrap}
.uu.cao{color:var(--dung); background:color-mix(in srgb, var(--dung) 12%, transparent)}
.uu.tb{color:var(--luu-y); background:color-mix(in srgb, var(--luu-y) 14%, transparent)}

/* ── chân ── */
footer{margin-top:52px; border-top:1px solid var(--ke); padding:22px 0 40px; font-size:12.5px; color:var(--phu)}
footer .bo{display:flex; gap:18px; flex-wrap:wrap; align-items:center}
footer .ma{color:var(--xanh)}

@media (max-width:640px){
  .dau .ngay{margin-left:0; text-align:left; width:100%}
  .pq-tren{padding:17px 20px 14px 24px}
}
@media (prefers-reduced-motion:no-preference){
  .hien{animation:len .5s cubic-bezier(.2,.7,.3,1) both}
  @keyframes len{from{opacity:0; transform:translateY(9px)} to{opacity:1; transform:none}}
}
</style>'''

# ── dữ liệu thật ──
BO = [
 ("thu-vien-chuyen-mon-gita","Thư viện chuyên môn GITA","220 phác đồ · rubric 18×5 · 20 biểu mẫu · 14 công cụ",19,137467),
 ("phac-do","└ trong đó: 220 phác đồ N01–N11","11 nhóm vấn đề × 20 phác đồ, mỗi phác đồ 16 lớp",12,146202),
 ("he-thong-huan-luyen-gita","Hệ thống huấn luyện","Tuyển sinh → chuẩn bị → đội ngũ → hiện trường → hồ sơ → tài chính",24,96302),
 ("leader-boom-365","Leader Boom 365","Giáo án 7 ngày theo phút · 47 tình huống hiện trường · lộ trình T1–T5",18,84006),
 ("nhuong-quyen-leader-boom","Nhượng quyền","Tiêu chuẩn đối tác · pháp lý · bảo vệ thương hiệu · lộ trình toàn quốc",11,20252),
 ("cong-dong-leader-boom","Cộng đồng","Chiến lược 1.000 thành viên · nhịp nội dung · hệ huy hiệu 7 sao",11,18117),
 ("seo-va-hien-dien-so","Hiện diện số","Chuẩn E-E-A-T · schema · nội dung · quy tắc phản hồi",11,16264),
 ("ho-so-bao-ho","Hồ sơ bảo hộ","Bản mô tả chương trình · chốt phiên bản · chuẩn trình bày",9,13954),
 ("nhan-dien-thuong-hieu","Nhận diện thương hiệu","Logo · màu · typography · giọng nói · chuẩn biên tập",9,11225),
 ("an-toan-va-phan-quyen","An toàn & phân quyền","10 chuẩn an toàn · phân quyền 8 tầng · bảo vệ dữ liệu trẻ em",6,11065),
]

NHOM = [
 ("LK","Liên kết","650 liên kết nội bộ, không gãy"),
 ("MA","Sổ đăng ký mã","NL · BM · CC · N trong dải"),
 ("PD","Phác đồ","đủ 220, mỗi bản đủ 8 mục"),
 ("NT","Nguyên tắc","không nhãn dán, không hình phạt"),
 ("AT","Bất biến","6 con số không được lệch"),
 ("HL","Hai lớp","tóm tắt ↔ tác nghiệp"),
 ("CT","Cấu trúc","tiêu đề · bảng · mã hoá"),
 ("GV","Giọng viết","13 quy tắc Leader Boom"),
 ("TL","Trùng lặp","không khối chép đôi"),
]

# (ngày, mã, tên, tầng nhãn 0/1 — so le để nhãn không chồng nhau ở cụm D-5…D14)
CONG = [(-90,"C1","Mở bán",0),(-20,"C2","Chốt sĩ số",0),(-5,"C3","Đội ngũ",1),
        (-1,"C4","Khai giảng",0),(7,"C5","Bế mạc",1),(14,"C6","Bàn giao",0),
        (118,"C7","Nghiệm thu 90",1)]
TANG = [(-90,0,"Chuẩn bị khoá","D-90 → D0","var(--t0)",1),
        (1,7,"T1 · Nhận diện","7 ngày trại","var(--t1)",0),
        (8,28,"T2 · Giải mã","21 ngày","var(--t2)",0),
        (29,118,"T3 · Kiến tạo","90 ngày","var(--t3)",0),
        (119,365,"T4 · Chuyển hoá","4 chu kỳ 90 ngày","var(--t4)",0)]

D0, D1 = -95, 370
def pc(d): return (d - D0) / (D1 - D0) * 100

BB = [("8,5","giờ","Giấc ngủ tối thiểu","Mỗi đêm, mọi lứa tuổi. Kế hoạch nào phải cắt ngủ để chạy được là kế hoạch sai.","CHUẨN A5"),
      ("5","mốc","Điểm danh mỗi ngày","Không phải 3, không phải 6. Một tài liệu ghi khác là một khoá có thể làm khác.","CHUẨN A8"),
      ("1 : 10","","Tỉ lệ ACT : học viên","Nhóm 9–11 tuổi siết còn 1 : 8. Trần cứng, không phải mục tiêu.","CHUẨN A2"),
      ("15","phút","Đúc kết tối thiểu","Buổi không có đúc kết là hoạt động, không phải huấn luyện.","12 TIÊU CHUẨN BUỔI"),
      ("30","phút","Review ngày 7 với từng gia đình","Từng gia đình, không phải họp chung. Đây là cổng C6.","CHUẨN C2"),
      ("10","phút/ngày","Đồng hành của gia đình","Không nhắc bài. Dưới ngưỡng này, chặng 90 ngày không chạy.","HỆ 90 NGÀY")]

TON = [("Ngưỡng số chưa hiệu chuẩn thực địa","Đã tách ba dải tuổi, nhưng vẫn là ngưỡng đề xuất — chưa đo trên học viên Việt Nam thật","cao","Cao nhất"),
       ("Đăng ký nhãn hiệu","Hồ sơ đã soạn xong, đơn chưa nộp","cao","Cao nhất"),
       ("Nền tảng số","Mới có đặc tả chức năng, chưa có sản phẩm và chưa có lược đồ dữ liệu","cao","Cao — điều kiện tiên quyết nhượng quyền"),
       ("Mốc tài chính tham chiếu","Dải % và bội số là ước lượng có luận cứ, chưa đối chiếu chứng từ thật","cao","Cao"),
       ("Ca minh hoạ thật đã ẩn danh","Bản đồ Nhận diện mẫu mới có một ca dễ; cần ca có cờ an toàn, dữ liệu thưa, gia đình mâu thuẫn","cao","Cao sau khoá đầu"),
       ("Phần T4/T5 của nhiều phác đồ","Còn lặp khuôn chung, cần cá biệt hoá theo từng nhóm vấn đề","tb","Trung bình"),
       ("Biểu mẫu chấm mù chéo và lịch so le","Hai cơ chế đo mạnh nhất nhưng chưa có biểu mẫu nên dễ bị bỏ khi thực thi","tb","Trung bình"),
       ("Dữ liệu hiệu quả 90/365 ngày","Chưa tích luỹ đủ để công bố","tb","Cần thời gian, không cần thêm tài liệu")]

h = [HEAD]
A = h.append

A(f'''
<header class="dau">
  <div class="bo">
    <img src="data:image/png;base64,{logo}" alt="Logomark Leader Boom">
    <div>
      <h1>TRẠI HUẤN LUYỆN LEADER BOOM</h1>
      <p class="duoi">Bảng trạng thái hệ tài liệu huấn luyện — đo bằng bộ kiểm định chạy được, không bằng lời cam kết.</p>
    </div>
    <div class="ngay">Học viện GITA<br>Phiên bản đo ngày 30·08·2026</div>
  </div>
</header>

<main class="bo">

<div class="phan-quyet hien">
  <div class="pq-tren">
    <strong>9 / 9 NHÓM ĐẠT</strong>
    <span>0 lỗi CHẶN · 0 cảnh báo · 0 ghi chú — đủ điều kiện phát hành</span>
    <code class="lenh">python3 tools/kiem_dinh.py</code>
  </div>
  <div class="chip-hang">''')
for ma, ten, mo in NHOM:
    A(f'    <div class="chip"><b>{ma}</b><i>{ten} — {mo}</i><em>✓ ĐẠT</em></div>')
A('''  </div>
</div>

<section>
  <p class="nhan">Cam kết theo thời gian</p>
  <h2>Bảy cổng kiểm soát trên trục 455 ngày</h2>
  <p class="dan">Chương trình cam kết từ ngày mở bán <code>D-90</code> tới hết Tầng 4 ở <code>D365</code>.
     Mỗi cổng là một điểm dừng có văn bản: không đạt thì không đi tiếp.</p>
  <div class="truc">
   <div class="truc-trong">
    <div class="thang">''')
for a, b, ten, ph, mau, mo in TANG:
    l, w = pc(a), pc(b) - pc(a)
    A(f'      <div class="tang" style="left:{l:.2f}%; width:{w:.2f}%; top:0; background:{mau}"'
      f' title="{ten} — {ph}"></div>')
A('      <div class="duong"></div>')
for d, ma, ten, tang in CONG:
    cls = 'cong cuoi' if ma == 'C7' else 'cong'
    cao = 26 + tang * 34
    A(f'      <div class="{cls}" style="left:{pc(d):.2f}%; height:{cao}px" title="{ma} — {ten}">'
      f'<span style="top:{cao + 3}px">{ma}</span></div>')
for d, nhan, canh in [(-90,'D-90','left:0; transform:none'),
                      (1,'D1',f'left:{pc(1):.2f}%'),
                      (7,'D7',f'left:{pc(7):.2f}%'),
                      (118,'D118',f'left:{pc(118):.2f}%'),
                      (365,'D365','right:0; left:auto; transform:none')]:
    A(f'      <div class="moc" style="{canh}">{nhan}</div>')
A(f'''    </div>
   </div>
   <div class="chu-giai">
     <span><i style="background:var(--t0)"></i>Chuẩn bị khoá <b>D-90 → D0</b></span>
     <span><i style="background:var(--t1)"></i>T1 Nhận diện <b>7 ngày trại</b></span>
     <span><i style="background:var(--t2)"></i>T2 Giải mã <b>21 ngày</b></span>
     <span><i style="background:var(--t3)"></i>T3 Kiến tạo <b>90 ngày</b></span>
     <span><i style="background:var(--t4)"></i>T4 Chuyển hoá <b>4 chu kỳ 90 ngày</b></span>
   </div>
  </div>
  <div class="cuon" style="margin-top:16px">
    <table>
     <thead><tr><th>Cổng</th><th>Ngày</th><th>Nội dung nghiệm thu</th></tr></thead>
     <tbody>
      <tr><td class="ma">C1</td><td class="ma">D-90</td><td>Địa điểm đã ký · giá đã duyệt · nội dung truyền thông đã duyệt</td></tr>
      <tr><td class="ma">C2</td><td class="ma">D-20</td><td>Đạt sĩ số tối thiểu hoà vốn · hồ sơ y tế đủ · thu đủ đợt 1</td></tr>
      <tr><td class="ma">C3</td><td class="ma">D-5</td><td>100% nhân sự đã tập huấn và ký cam kết · đủ 4 vị trí chuyên trách</td></tr>
      <tr><td class="ma">C4</td><td class="ma">D-1</td><td>Bảng kiểm đạt · ma trận rủi ro đã ký · bảo hiểm còn hiệu lực</td></tr>
      <tr><td class="ma">C5</td><td class="ma">D7</td><td>Điểm danh khớp · không có sự cố tồn đọng · bàn giao đủ học viên</td></tr>
      <tr><td class="ma">C6</td><td class="ma">D+7</td><td>100% học viên có Bản đồ Nhận diện · đã Review 30 phút với từng gia đình</td></tr>
      <tr><td class="ma">C7</td><td class="ma">D118</td><td>Báo cáo KPI trước–sau cho 100% học viên đang theo lộ trình</td></tr>
     </tbody>
    </table>
  </div>
  <div class="doc-truc">
     <span><b>Trục vẽ theo tỉ lệ ngày thật. Ba điều đọc được từ chính tỉ lệ đó:</b></span>
     <span>Bảy ngày trại chiếm <b>1,5%</b> quãng cam kết — dải xanh đậm hẹp nhất trên trục</span>
     <span>Sáu trong bảy cổng nằm trong <b>97 ngày đầu</b></span>
     <span>Từ <b>D119</b> tới <b>D365</b> chưa có cổng nào</span>
  </div>
  <div class="trich">
    <p><b>Dải hẹp nhất là dải được nói tới nhiều nhất.</b> Bảy ngày trại là phần dễ bán, dễ chụp ảnh,
    dễ kể lại — và là 1,5% của quãng đường. Đây chính là lý do hệ thống này đặt trọng tâm ở chặng
    90 ngày sau trại, và là lý do cổng cuối không được dừng ở tuần trại.</p>
  </div>
  <div class="trich">
    <p><b>Vì sao cổng cuối đặt ở D118 chứ không ở D+7.</b> Nếu cổng cuối dừng ở ngày bàn giao hồ sơ
    thì chặng 90 ngày — phần thật sự tạo ra thay đổi hành vi — hoàn toàn không có cổng kiểm soát nào,
    và chương trình quay về đúng thứ nó tuyên bố không phải: một sự kiện bảy ngày.</p>
  </div>
</section>

<section>
  <p class="nhan">Kho tài liệu</p>
  <h2>Chín bộ · 132 tài liệu · 593.000 từ</h2>
  <p class="dan">Mỗi bộ có hai lớp: bản tóm tắt điều hành nêu khung và nguyên lý, bản tác nghiệp nêu việc phải làm.
     Khi hai bản nói khác nhau, <b>bản tác nghiệp là bản đúng</b>.</p>
  <div class="cuon">
    <table>
      <thead><tr><th>Bộ tài liệu</th><th style="text-align:right">Tài liệu</th><th style="text-align:right">Số từ</th></tr></thead>
      <tbody>''')
for _, ten, mo, n, w in BO:
    A(f'        <tr><td class="ten"><b>{ten}</b><i>{mo}</i></td><td class="so">{n}</td><td class="so">{w:,}</td></tr>'.replace(',', '.'))
A('''        <tr class="tong"><td>Toàn hệ</td><td class="so">132</td><td class="so">593.393</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section>
  <p class="nhan">Bất biến an toàn</p>
  <h2>Sáu con số không được lệch ở bất kỳ tài liệu nào</h2>
  <p class="dan">Nhóm kiểm <code>AT</code> quét cả 132 tài liệu tìm mọi cách viết khác của sáu con số này.
     Một chỗ ghi khác là một chỗ có thể được thực hiện khác — và với chuẩn an toàn thì không có mức "gần đúng".</p>
  <div class="bb">''')
for gt, dv, ten, mo, ch in BB:
    dvs = f' <small>{dv}</small>' if dv else ''
    A(f'    <div class="bb-o"><div class="gt">{gt}{dvs}</div><h4>{ten}</h4><p>{mo}</p><span class="ch">{ch}</span></div>')
A('''  </div>
  <div class="trich">
    <p><b>Bất biến này đã bắt được lỗi thật.</b> Bộ kiểm phát hiện một phác đồ đặt cổng nghiệm thu là
    <i>"ngủ ≥ 6,5 giờ mọi đêm trong tuần cao điểm"</i> — tức biến thiếu ngủ thành tiêu chí đạt.
    Không ai đọc thấy điều đó qua ba vòng biên tập của con người.</p>
  </div>
</section>

<section>
  <p class="nhan">Điều hệ thống chưa có</p>
  <h2>Tám khoảng trống, ghi thẳng</h2>
  <p class="dan">Một hệ tài liệu tự nhận là đầy đủ sẽ được dùng như thể nó đầy đủ — và người dùng sẽ coi
     ngưỡng chưa hiệu chuẩn là chuẩn, coi đặc tả là sản phẩm. Ghi rõ chỗ chưa có là cách duy nhất để hệ
     thống được dùng đúng phạm vi của nó.</p>
  <div class="cuon">
    <table>
      <thead><tr><th>Hạng mục</th><th>Trạng thái</th><th>Ưu tiên</th></tr></thead>
      <tbody>''')
for ten, tt, lv, nhan in TON:
    A(f'        <tr><td class="ten"><b>{ten}</b></td><td style="color:var(--phu); font-size:13.5px">{tt}</td>'
      f'<td><span class="uu {lv}">{nhan}</span></td></tr>')
A('''      </tbody>
    </table>
  </div>
</section>

</main>

<footer>
  <div class="bo">
    <span>Học viện GITA · Trại huấn luyện Leader Boom</span>
    <span class="ma">tools/kiem_dinh.py · docs/00-he-thong-chat-luong.md</span>
    <span style="margin-left:auto">Số liệu sinh từ lần chạy kiểm định gần nhất, không nhập tay.</span>
  </div>
</footer>''')

io.open(os.path.join(SP,'bang-trang-thai-leader-boom.html'),'w',encoding='utf-8').write('\n'.join(h))
print('Đã dựng:', os.path.join(SP,'bang-trang-thai-leader-boom.html'))
