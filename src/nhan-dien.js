/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.7 — HỆ NHẬN DIỆN THƯƠNG HIỆU GITA
   Chuẩn nhận diện đọc được bằng máy: màu, logo, chữ, luật dùng, và
   cách áp vào tài liệu — quy trình. Giao diện đọc từ đây, bộ kiểm
   phát hành cũng đối chiếu với đây. Một nguồn, không hai bản.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

G.NHAN_DIEN = {
  ten: 'Hệ nhận diện thương hiệu GITA',
  goc: 'Dựng theo logo chuẩn của Học viện GITA: ba nét vòng cung xanh – xanh – đỏ, '+
       'năm ngôi sao (bốn xanh một đỏ) và chữ GITA.',

  /* ─── 1 · MÀU ─── */
  mau: {
    chinh: [
      {ma:'--gita',      hex:'#2166CE', ten:'Xanh GITA',      vai:'Màu chủ đạo. Nét chính của logo, nút chính, viền, biểu tượng.'},
      {ma:'--gita-sau',  hex:'#174C9E', ten:'Xanh sâu',       vai:'Chữ GITA trong logo, nét ngoài cùng, chữ xanh trên nền sáng.'},
      {ma:'--gita-sang', hex:'#4A8FE0', ten:'Xanh sáng',      vai:'Nét trong của logo, chuyển sắc, trạng thái nhẹ.'},
      {ma:'--gita-do',   hex:'#E4232B', ten:'Đỏ GITA',        vai:'Nét đỏ và ngôi sao đỏ. Dùng ĐIỂM, không dùng mảng lớn.'},
      {ma:'--gita-do-ink',hex:'#C2151C',ten:'Đỏ đậm',         vai:'Chữ đỏ trên nền sáng, cảnh báo, điều cấm.'}
    ],
    tang: [
      {ma:'--t1', hex:'#2166CE', ten:'T1 Nhận diện'},
      {ma:'--t2', hex:'#5140B4', ten:'T2 Giải mã'},
      {ma:'--t3', hex:'#0B6675', ten:'T3 Kiến tạo'},
      {ma:'--t4', hex:'#0B7350', ten:'T4 Chuyển hoá'},
      {ma:'--t5', hex:'#C2151C', ten:'T5 Bứt phá'}
    ],
    yNghia: 'Năm tầng đi từ XANH GITA tới ĐỎ GITA — đúng hai màu của logo. '+
            'Chặng đầu mang màu nét xanh, đích đến mang màu ngôi sao đỏ.',
    luat: [
      'Chỉ ba màu thương hiệu: xanh GITA, xanh sâu, đỏ GITA. Không thêm màu thứ tư vào phần nhận diện.',
      'Đỏ là màu ĐIỂM. Dùng cho một chi tiết dẫn mắt, cho cảnh báo và điều cấm — không tô mảng lớn.',
      'Mọi mã chữ đều phải đạt tương phản 4,5:1 trở lên trên nền đang dùng. Chưa đạt thì đổi mã, không giảm cỡ chữ.',
      'Không dùng màu vàng — bảng màu vàng của các bản trước v7.7 đã bỏ hẳn.',
      'Nền tối có bảng màu riêng, sáng hơn một nấc, nhưng vẫn đúng ba màu ấy.'
    ]
  },

  /* ─── 2 · LOGO ─── */
  logo: {
    cauTao: [
      'Ba nét vòng cung thon, mở về bên phải: xanh sâu ngoài cùng, xanh giữa, đỏ trong cùng.',
      'Năm ngôi sao vút lên góc trên bên phải — bốn sao xanh và MỘT sao đỏ ở cuối.',
      'Chữ GITA nằm trong lòng ba nét, màu xanh sâu.'
    ],
    banDung: [
      {ten:'Logo đầy đủ', dung:'Trang bìa tài liệu, cổng vào, chứng nhận, bảng hiệu.', toiThieu:'rộng 120px'},
      {ten:'Dấu vuông',   dung:'Thanh trên ứng dụng, biểu tượng cài đặt, ảnh đại diện.', toiThieu:'32 × 32px'}
    ],
    khoangTho: 'Chừa quanh logo một khoảng trống ít nhất bằng chiều cao chữ G. Không đặt chữ hay hình vào khoảng đó.',
    cam: [
      'Không đổi màu logo, kể cả sang một tông xanh khác.',
      'Không kéo giãn lệch tỉ lệ, không nghiêng thêm, không đổ bóng.',
      'Không đặt logo lên nền có hoạ tiết rối hoặc ảnh chụp làm mất nét.',
      'Không tách rời ba nét hay bỏ bớt ngôi sao.',
      'Không vẽ lại logo ở bất kỳ tài liệu nào — luôn gọi từ bộ nhận diện chung.'
    ]
  },

  /* ─── 3 · CHỮ ─── */
  chu: {
    chinh: {ten:'Be Vietnam Pro', vai:'Toàn bộ chữ giao diện và tài liệu. Nhúng sẵn, không gọi ra mạng.'},
    nhanManh: {ten:'Playfair Display', vai:'Tiêu đề lớn và câu trích — dùng thưa, mỗi màn nhiều nhất một chỗ.'},
    luat: [
      'Chữ thân bài không nhỏ hơn 12,5px. Chữ nhãn không nhỏ hơn 10px và phải viết hoa có giãn chữ.',
      'Tiêu đề đậm 800, thân bài 400–600. Không dùng chữ mảnh dưới 400.',
      'Tiếng Việt có dấu đầy đủ. Không viết tắt tên Học viện thành chữ khác ngoài GITA.'
    ]
  },

  /* ─── 4 · ÁP VÀO TÀI LIỆU ─── */
  taiLieu: {
    batBuoc: [
      'Logo GITA ở đầu trang, khoảng thở đúng chuẩn.',
      'Tên tài liệu, tầng áp dụng, phiên bản và ngày ban hành.',
      'Dòng bản quyền: © Học viện GITA — Bảo lưu mọi quyền.',
      'Mã truy nguyên bản in ở chân trang, để biết bản rò rỉ đi từ đâu.',
      'Vai được phép giữ tài liệu này.'
    ],
    cam: [
      'Không phát hành tài liệu mang màu ngoài bảng ba màu GITA.',
      'Không dùng lại mẫu của bên thứ ba rồi dán logo GITA lên.',
      'Không bỏ mã truy nguyên để "cho đẹp".'
    ]
  },

  /* ─── 5 · ÁP VÀO QUY TRÌNH ─── */
  quyTrinh: [
    {b:'Đăng ký',    m:'--gita',      mo:'Màu xanh GITA dẫn suốt năm bước đăng ký và xác thực.'},
    {b:'Học tầng',   m:'theo tầng',   mo:'Mỗi tầng mang màu của chính nó, từ xanh T1 tới đỏ T5.'},
    {b:'Nâng tầng',  m:'--gita-do',   mo:'Đỏ đánh dấu cổng chuyển đổi — chỗ cần quyết định.'},
    {b:'Cảnh báo',   m:'--gita-do-ink',mo:'Điều cấm và cảnh báo luôn dùng đỏ đậm, không dùng màu khác.'},
    {b:'Quản trị',   m:'--gita-sau',  mo:'Khu quản trị dùng xanh sâu để tách khỏi khu học tập.'}
  ]
};
