# 01 · KIẾN TRÚC CỘNG ĐỒNG

## 1. Ba vòng — mỗi vòng một công việc khác nhau

Sai lầm phổ biến là dồn mọi thứ vào một group: tuyển sinh, chia sẻ, nộp bài, hỏi đáp riêng tư,
khoe thành tích. Kết quả là **không việc nào làm tốt**, và dữ liệu nhạy cảm của trẻ nằm lẫn với
nội dung quảng cáo.

```
        VÒNG 1 · CÔNG KHAI                 VÒNG 2 · GROUP                VÒNG 3 · SQUAD
        Fanpage / TikTok                   Facebook Group kín            Nhóm chat 5–8 người
        ─────────────────                  ──────────────────            ────────────────────
        Ai cũng thấy                       Duyệt mới vào                 Coach chỉ định
        Người lạ → biết đến                Thành viên → thuộc về         Thành viên → thay đổi

        Việc: gieo nhận thức               Việc: giữ nhịp, tạo           Việc: trách nhiệm
        Nội dung: bài học rút gọn,         thuộc về, tổ chức thử         hằng ngày, hỗ trợ
        khoảnh khắc trại (đã xin phép)     thách, hỏi đáp chuyên môn     khi tụt, ăn mừng khi lên

                                           ↓ dữ liệu KHÔNG đi vào đây ↓
        ─────────────────────────────────────────────────────────────────────────────
        VÒNG 0 · NỀN TẢNG SỐ (riêng tư, có phân quyền)
        Nhật ký 6 dòng · KPI 7 chỉ số · hồ sơ năng lực · báo cáo 90 ngày · cảnh báo Vàng/Cam/Đỏ
```

| Vòng | Nền tảng | Ai ở đây | Dữ liệu được phép | Ai quản |
|---|---|---|---|---|
| **0 · Nền tảng** | Hệ thống riêng của Học viện | Học viên, phụ huynh, Coach — theo phân quyền | **P0–P2**: nhật ký, KPI, hồ sơ năng lực | Admin hệ thống |
| **1 · Công khai** | Fanpage, TikTok, website | Bất kỳ ai | **Chỉ P0**: nội dung đã duyệt, hình ảnh đã có đồng ý bằng văn bản | Truyền thông |
| **2 · Group** | Facebook Group **kín** | Phụ huynh · cựu học viên ≥ 13 tuổi · gia đình đang tìm hiểu đã duyệt | **P0 + P1 ẩn danh**: bài học, câu hỏi, tiến độ tổng hợp | Quản trị viên + Coach trực |
| **3 · Squad** | Nhóm chat kín 5–8 người | Thành viên cùng chu kỳ + 1 Coach | **P1**: tiến độ cá nhân dạng ✓/✗, không chi tiết chẩn đoán | Coach của squad |

> **Ranh giới cứng giữa vòng 0 và vòng 2:** nhật ký 6 dòng, số lần bị nhắc, chỉ số KPI cá nhân,
> mọi ghi chép của Coach — **không bao giờ rời khỏi vòng 0**. Thành viên được kể lại trải nghiệm
> bằng lời của mình; hệ thống không được xuất dữ liệu ra group. Đây là chuẩn **D3** và bất biến
> **BB-03** ([`../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md`](../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md)).

---

## 2. Vì sao Group và Fanpage không được gộp

| | Fanpage | Group |
|---|---|---|
| **Tiếp cận tự nhiên** | ~1,6–5,9% người theo dõi | **20–40% thành viên** |
| **Chiều giao tiếp** | Một chiều — thương hiệu nói | Nhiều chiều — thành viên nói với nhau |
| **Việc nó làm tốt** | Người lạ biết đến, chạy quảng cáo được | Giữ chân, tạo thuộc về, tổ chức thử thách |
| **Việc nó làm hỏng** | Không tạo được cảm giác thuộc về | **Quảng cáo trong group giết tương tác** |

**Quy tắc phân vai:** Fanpage **mời**, Group **giữ**, Squad **thay đổi**.
Bài bán khoá trại đăng ở Fanpage. Trong Group, thông tin về khoá mới xuất hiện **một lần mỗi chu kỳ**,
dưới dạng thông báo của Học viện, không phải bài bán hàng — nguyên tắc **CĐ-07**.

---

## 3. Squad — đơn vị vận hành thật

Đây là phần quyết định thành bại. Group là nơi nhìn thấy nhau; **squad là nơi có người nhận ra
khi mình vắng mặt ba ngày**.

| Thuộc tính | Quy định | Vì sao |
|---|---|---|
| **Quy mô** | **5–8 người**, không quá 8 | Trên 8 người thì im lặng trở nên vô hình; dưới 5 thì một người nghỉ là nhóm chết |
| **Ghép nhóm** | Cùng **nhóm tuổi** và cùng **ngày bắt đầu chu kỳ** | Cùng nhịp mới đồng cảm được; lệch 3 tuần là hai thế giới |
| **Tuổi và nền tảng** | Squad học viên **≥ 13 tuổi**: nhóm chat có Coach. Squad **9–12 tuổi**: **squad của phụ huynh**, con tham gia cùng cha mẹ | Ràng buộc pháp lý ở README §2 |
| **Người dẫn** | 1 Coach cho tối đa **4 squad**; mỗi squad có 1 **Trưởng squad** là thành viên luân phiên 2 tuần | Vai trưởng squad là cơ hội rèn năng lực NL dẫn dắt, không phải việc vặt |
| **Nhịp bắt buộc** | Điểm danh 1 dòng mỗi ngày · 1 buổi gọi nhóm 30 phút mỗi tuần | Nhịp cố định quan trọng hơn nội dung của nhịp |
| **Tuổi thọ** | Một chu kỳ (21 hoặc 90 ngày), sau đó **xét ghép lại** | Nhóm cố định lâu quá thì đóng kín; ghép lại giữ dòng năng lượng mới |
| **Đặt tên** | Squad **tự đặt tên** trong 48 giờ đầu | Việc đầu tiên nhóm làm cùng nhau — rẻ nhất và hiệu quả nhất để tạo bản sắc |

### 3.1 Bốn việc squad làm mỗi tuần

| Ngày | Việc | Thời lượng |
|---|---|---|
| Hằng ngày | **Điểm danh một dòng**: `✓✓✗ | hôm nay khó ở chỗ…` | 30 giây |
| Thứ Tư | **Câu hỏi giữa tuần** do Trưởng squad đăng, lấy từ thư viện (TL 10) | 5 phút |
| Thứ Bảy | **Gọi nhóm 30 phút** — mỗi người 3 phút, Coach nói cuối cùng | 30 phút |
| Chủ nhật | **Một điều mang sang tuần sau** — mỗi người một dòng | 2 phút |

> **Cấu trúc buổi gọi 30 phút:** 5 phút mở đầu do Trưởng squad · 18 phút vòng chia sẻ (3 phút/người,
> **có hẹn giờ**) · 5 phút chọn một việc chung cho tuần tới · 2 phút Coach chốt.
> **Coach nói cuối cùng, không nói đầu tiên** — cùng nguyên tắc với buổi Review tuần ở
> [`../he-thong-huan-luyen-gita/13-he-thong-90-ngay.md`](../he-thong-huan-luyen-gita/13-he-thong-90-ngay.md) §5.1.

### 3.2 Squad phát hiện sớm hơn hệ thống

Cảnh báo **Vàng** trong hệ 90 ngày kích hoạt sau 3 ngày nhật ký trống. Trong squad, bạn cùng nhóm
nhận ra sau **một ngày**. Quy định: Trưởng squad thấy một thành viên vắng **2 ngày liên tiếp** thì
nhắn riêng — không nhắc bài, chỉ hỏi *"mấy hôm nay ổn không?"* — và báo Coach nếu vắng sang ngày thứ ba.

**Đây là giá trị vận hành lớn nhất của squad**, lớn hơn cả động lực: nó rút ngắn thời gian phát hiện
từ 3 ngày xuống 1 ngày, và người phát hiện là bạn bè chứ không phải người lớn đi kiểm tra.

---

## 4. Ai được ở trong group

| Nhóm | Được vào | Điều kiện | Ước tính tỉ trọng mục tiêu |
|---|---|---|---|
| **Phụ huynh có con đã dự trại** | ✅ | Xác nhận qua mã học viên | 40% |
| **Phụ huynh đang tìm hiểu** | ✅ | Trả lời 3 câu hỏi duyệt (TL 03) | 25% |
| **Cựu học viên ≥ 13 tuổi** | ✅ | Có sự đồng ý của cha mẹ, ghi nhận trong hồ sơ | 20% |
| **Học viên 9–12 tuổi** | ❌ | **Tham gia thông qua tài khoản của cha mẹ** | 0% |
| **Giáo viên, đối tác, người quan tâm chuyên môn** | ✅ | Duyệt riêng, gắn nhãn | 10% |
| **Nhân sự Học viện** | ✅ | Hiển thị rõ vai trò trên hồ sơ | 5% |

> **Vì sao phụ huynh chiếm tỉ trọng lớn nhất:** trong hệ 90 ngày, người hành động hằng ngày là
> **cha mẹ** — ghi 2 dòng quan sát, giữ 10 phút đồng hành, giữ giờ ngủ. Cam kết của cha mẹ sụp thì
> lộ trình của con sụp theo. Cộng đồng phải phục vụ đúng người đang phải giữ cam kết khó nhất.

---

## 5. Bản đồ nội dung theo vòng

| Loại nội dung | Vòng 1 | Vòng 2 | Vòng 3 | Vòng 0 |
|---|---|---|---|---|
| Khoảnh khắc trại (đã có đồng ý) | ✅ | ✅ | — | — |
| Bài học chuyên môn rút gọn | ✅ | ✅ | — | — |
| Câu hỏi của phụ huynh về con mình | ❌ | ⚠️ chỉ khi ẩn danh và tự nguyện | ✅ | ✅ |
| Điểm danh hằng ngày | ❌ | ❌ | ✅ | ✅ |
| Nhật ký 6 dòng | ❌ | ❌ | ❌ | ✅ |
| KPI cá nhân | ❌ | ❌ | ❌ | ✅ |
| Tiến độ tổng hợp toàn cộng đồng (không tên) | ✅ | ✅ | ✅ | ✅ |
| Ghi chép của Coach | ❌ | ❌ | ❌ | ✅ |
| Thông tin khoá mới | ✅ | 1 lần/chu kỳ | ❌ | ❌ |

---

## 6. Liên kết

- Chuẩn an toàn số: [`02-an-toan-tre-em-tren-mang.md`](02-an-toan-tre-em-tren-mang.md)
- Thiết kế thử thách và chu kỳ: [`05-he-thong-thu-thach.md`](05-he-thong-thu-thach.md)
- Đội ngũ và chi phí giờ: [`07-doi-ngu-van-hanh.md`](07-doi-ngu-van-hanh.md)
- Hệ 90 ngày gốc: [`../he-thong-huan-luyen-gita/13-he-thong-90-ngay.md`](../he-thong-huan-luyen-gita/13-he-thong-90-ngay.md)
- Phân loại dữ liệu P0–P3: [`../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md`](../an-toan-va-phan-quyen/03-phan-loai-du-lieu.md)
