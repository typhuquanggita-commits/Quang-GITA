# Kiến trúc

## Nguyên tắc xuyên suốt

**Mọi quy tắc nghiệp vụ nằm trong `src/lib/` dưới dạng hàm thuần.** Chấm điểm, chẩn
đoán, kê đơn, xét lên cấp, kiểm tra quyền, dựng lộ trình — tất cả đều là hàm nhận vào
dữ liệu và trả ra dữ liệu, không đụng đến DOM, không đọc `Date.now()` khi có thể nhận
`now` làm tham số. Giao diện chỉ hiển thị kết quả.

Hệ quả: mọi kết luận của hệ thống đều **kiểm chứng được bằng test** thay vì phải bấm
thử trên màn hình. Một thay đổi ở ngưỡng thành thạo hay ở công thức điểm dự báo sẽ làm
đỏ một bài test cụ thể, chứ không âm thầm đi vào bản phát hành.

## Sơ đồ tầng

```
      features/            Từng màn hình. Không chứa quy tắc nghiệp vụ.
          │
      components/          Hệ thống thiết kế + biểu đồ SVG + khung ứng dụng
          │
        store/             Reducer + context. MỌI thay đổi trạng thái đi qua đây.
          │
         lib/              Hàm thuần: Rasch, chấm điểm, SRS, tiến độ, lộ trình,
          │                phân quyền, lưu trữ, định tuyến, AI
        data/              Nội dung tĩnh: chuyên đề, câu hỏi, ngữ liệu,
                           khung chương trình, bộ sinh phiếu, ma trận quyền
```

Mũi tên phụ thuộc chỉ đi xuống. `data/` không biết gì về `lib/`; `lib/` không biết gì
về React; `store/` không biết gì về giao diện.

## Các quyết định đáng chú ý

### Vì sao dùng mô hình Rasch thay vì "phần trăm câu đúng"

Tỉ lệ đúng chỉ có nghĩa khi đề bài có cùng độ khó. Rasch (IRT 1 tham số) tách độ khó
của câu ra khỏi năng lực của người học:

```
P(đúng | θ, b) = 1 / (1 + exp(−(θ − b)))
```

Nhờ vậy 8/10 câu khó và 8/10 câu dễ cho ra hai kết luận khác nhau — đúng như thực tế.
`θ` được ước lượng bằng Newton-Raphson trên hàm hợp lý cực đại, kèm một lớp prior nhẹ
để không phân kỳ khi người học đúng hết hoặc sai hết. Xem `src/lib/ability.ts`.

**Điểm dự báo** không ngoại suy tuyến tính từ bài ngắn: nó chiếu `θ` lên phân bố độ khó
của một đề chuẩn (`DIFFICULTY_MIX`), nên một bài 10 câu khó vẫn cho dự báo hợp lý.

### Vì sao sinh đề có hạt giống

Không dùng `Math.random` ở bất kỳ đâu. Đề phải tái lập được: cùng một hạt giống cho ra
đúng một đề, để người học chia sẻ đề cho bạn, để test ổn định, và để khôi phục đúng đề
sau khi tải lại trang. Xem `src/lib/rng.ts` (mulberry32 + FNV-1a).

### Vì sao chốt điểm ở thời điểm nộp bài

Cập nhật độ thành thạo, sổ tay lỗi sai và nhật ký ngày đều được làm **một lần** khi nộp
bài, thay vì rải rác ở mỗi lần trả lời. Nhờ vậy thao tác là bất biến: nộp lại cùng một
bài không làm số liệu bị cộng đôi, và người học đổi đáp án nhiều lần cũng không làm
lệch chỉ số. Xem `submitAttempt` và `submitWorksheet` trong `src/store/reducer.ts`.

### Vì sao định tuyến bằng hash

Nhỏ gọn, không cần cấu hình rewrite phía máy chủ, chạy được cả khi mở tệp trực tiếp từ
ổ đĩa hoặc deploy dưới một thư mục con bất kỳ. Điều đó quan trọng với một ứng dụng ôn
thi cần chạy được ngoại tuyến. Xem `src/lib/router.tsx`.

### Vì sao tự vẽ biểu đồ

Các biểu đồ ở đây ít và đơn giản, trong khi một thư viện sẽ kéo theo hàng trăm KB, áp
đặt bảng màu riêng và khó kiểm soát khả năng truy cập. Tự vẽ giúp giữ đúng bộ token màu
đã được kiểm định cho cả hai chế độ sáng/tối và cho người mù màu. Xem
`src/components/charts/index.tsx`.

### Vì sao lưu trữ có đánh phiên bản

Nâng cấp ứng dụng không bao giờ được làm mất tiến độ. `src/lib/storage.ts` giữ một bảng
hàm di trú chạy tuần tự từ phiên bản cũ lên phiên bản hiện tại, cộng thêm một bước hợp
nhất với cấu trúc mặc định để tệp thiếu trường vẫn nạp được thay vì làm hỏng ứng dụng.

**Khi đổi cấu trúc dữ liệu:** tăng `STORAGE_VERSION` và thêm một bước di trú. Đừng bao
giờ sửa tại chỗ rồi để người dùng cũ vô trang trắng.

## Lưu trữ và quyền riêng tư

Toàn bộ dữ liệu học tập nằm trong `localStorage` trên máy người dùng, khóa
`hsa365:state`. Không có máy chủ, không có tài khoản, không có dữ liệu nào rời khỏi
thiết bị (trừ khi người dùng tự bật Gia sư AI, khi đó nội dung câu hỏi được gửi thẳng
tới Google).

Bản nháp một phiếu đang làm dở nằm ở `sessionStorage` — thứ tạm thời không nên lẫn vào
hồ sơ học tập lâu dài.

Người học xuất và nhập lại toàn bộ tiến độ bằng JSON trong **Cài đặt → Dữ liệu học tập**.

## Hiệu năng

- Ghi xuống `localStorage` có trì hoãn 250 ms — trong lúc làm bài, mỗi giây đều có thay
  đổi trạng thái; ghi thẳng sẽ gây giật khung hình. Đóng tab giữa chừng vẫn an toàn nhờ
  `pagehide` và `visibilitychange`.
- Bộ 2000 phiếu được sinh **một lần** rồi dùng lại (lazy singleton), không sinh lại mỗi
  lần dựng lại giao diện.
- Thư viện Gemini được nạp động, nên người không dùng AI không phải tải 290 KB đó.
- Biểu đồ tự vẽ, không thư viện.

## Thêm nội dung mới

1. **Thêm câu hỏi**: viết vào `src/data/questions/<phần>.ts` theo dạng `QuestionDraft`.
   Các phiếu luyện tự động lấy câu mới mà không phải sửa khung chương trình.
2. **Thêm chuyên đề**: khai báo trong `src/data/topics.ts`. Nhớ giữ tổng trọng số trong
   mỗi nhóm bằng 1 — có bài test canh giữ.
3. **Đổi khung chương trình**: sửa `src/data/curriculum.ts`. Cả 2000 phiếu cập nhật theo.

Chạy `npm run verify` trước khi commit.
