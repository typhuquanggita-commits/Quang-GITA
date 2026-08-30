# 00 · HỆ THỐNG CHẤT LƯỢNG TÀI LIỆU

> 🏠 **Chỉ mục toàn hệ:** [`README.md`](README.md)

Hệ tài liệu này có **132 tài liệu, hơn 593.000 từ, 645 liên kết nội bộ**, và sẽ được **chuyển
giao cho các đơn vị ở tỉnh khác**. Ở quy mô đó, chất lượng **không giữ được bằng cách đọc lại** —
một người đọc kỹ nhất cũng không phát hiện được một con số lệch ở tài liệu thứ 87.

Vì vậy chất lượng ở đây được giữ bằng **một bộ kiểm định chạy được**, không bằng lời cam kết.

---

## 1. Bộ kiểm định — chạy như thế nào

```bash
python3 tools/kiem_dinh.py            # kiểm toàn bộ, in báo cáo
python3 tools/kiem_dinh.py --nhom AT  # chỉ chạy một nhóm kiểm
python3 tools/kiem_dinh.py --json     # xuất JSON cho tích hợp tự động
```

Mã trả về: **0** = không có lỗi CHẶN · **1** = còn lỗi CHẶN.
Dùng mã này để chặn phát hành tự động khi tích hợp vào quy trình.

```bash
python3 tools/kiem_dinh.py --dong-bo   # ghi số liệu đo được vào mọi chỉ mục
```

Chế độ `--dong-bo` đếm lại số tài liệu, số từ, số liên kết rồi **ghi thẳng vào các chỉ mục**.
Lý do có nó: số liệu chép tay là số liệu sẽ sai. Trước khi có chế độ này, mười một tệp còn ghi
*"124 tài liệu"* trong khi hệ đã có 132. Chạy nó sau mỗi lần thêm hoặc bỏ tài liệu.

---

## 2. Ba mức nghiêm trọng

| Mức | Nghĩa | Hệ quả |
|---|---|---|
| **CHẶN** | Sai chuẩn an toàn hoặc chuẩn chuyên môn | **Không được phát hành.** Không có ngoại lệ, không có "sẽ sửa sau" |
| **CẢNH BÁO** | Sai tính nhất quán — liên kết lệch, cấu trúc hỏng, giọng viết lạc | Phải sửa **trước bản phát hành kế tiếp** |
| **GHI CHÚ** | Điểm cần chú ý, có thể là chủ ý | Đọc và quyết định, không bắt buộc sửa |

> **Vì sao phân ba mức thay vì một danh sách lỗi:** nếu mọi phát hiện đều chặn phát hành thì đội
> ngũ sẽ tắt bộ kiểm. Nếu không có mức nào chặn thì bộ kiểm chỉ là trang trí. Ba mức giữ cho
> **lỗi an toàn luôn chặn được** trong khi vẫn cho phép phát hành với những điểm chưa hoàn hảo.

---

## 3. Chín nhóm kiểm

| Mã | Nhóm | Kiểm cái gì | Mức cao nhất |
|---|---|---|---|
| **LK** | **Liên kết** | Liên kết gãy · tài liệu mồ côi không ai trỏ tới · liên kết ngoài dạng thô | CHẶN |
| **MA** | **Sổ đăng ký mã** | Mã `NL` `BM` `CC` `N` ngoài dải hợp lệ · mã chưa bao giờ được dùng | CHẶN |
| **PD** | **Phác đồ** | Đủ 220 · mỗi phác đồ đủ 8 mục bắt buộc · có mã năng lực · không thiếu, không trùng | CHẶN |
| **NT** | **Nguyên tắc chuyên môn** | Nhãn dán · hình phạt · công cụ giả khoa học **dùng ngoài ngữ cảnh cấm** | CHẶN |
| **AT** | **Bất biến an toàn** | Sáu con số không được lệch ở bất kỳ đâu — xem §4 | CHẶN |
| **HL** | **Cấu trúc hai lớp** | Bản tóm tắt có trỏ sang bản tác nghiệp · bản tác nghiệp có khối nhận dạng | CẢNH BÁO |
| **CT** | **Cấu trúc tài liệu** | Tiêu đề · đánh số mục · bảng markdown hỏng · lỗi mã hoá | CHẶN |
| **GV** | **Giọng viết Leader Boom** | Ngôn ngữ quảng cáo · hứa vượt cam kết · giọng nghi lễ · emoji · câu quá dài | CẢNH BÁO |
| **TL** | **Trùng lặp** | Khối trùng nguyên văn giữa các tài liệu | GHI CHÚ |

---

## 4. Sáu bất biến an toàn — nhóm AT kiểm từng con số

Đây là các con số **không được lệch ở bất kỳ tài liệu nào**. Một chỗ ghi khác là một chỗ có thể
được thực hiện khác, và với chuẩn an toàn thì điều đó không chấp nhận được.

| Bất biến | Giá trị duy nhất | Chuẩn |
|---|---|---|
| Giấc ngủ tối thiểu | **8,5 giờ mỗi đêm** | A5 |
| Số mốc điểm danh | **5 mốc mỗi ngày** | A8 |
| Tỉ lệ ACT nhóm chuẩn | **1 : 10** *(nhóm 9–11 là 1 : 8)* | A2 |
| Nhịp đúc kết tối thiểu | **15 phút** | 12 tiêu chuẩn buổi huấn luyện |
| Review ngày 7 với từng gia đình | **30 phút** | C2 |
| Đồng hành của gia đình | **10 phút mỗi ngày** | Hệ 90 ngày |

> **Bất biến này đã bắt được lỗi thật.** Trong lần rà trước, bộ kiểm phát hiện một phác đồ đặt cổng
> nghiệm thu là *"ngủ ≥ 6,5 giờ mọi đêm trong tuần cao điểm"* — tức **biến thiếu ngủ thành tiêu chí
> đạt**. Không ai đọc thấy điều đó qua ba vòng biên tập của con người.

---

## 5. Bộ kiểm cũng có thể sai — và cách xử lý khi nó sai

Đây là phần trung thực bắt buộc phải có. Lần chạy đầu tiên, bộ kiểm báo **45 lỗi CHẶN**, và
**toàn bộ 45 đều là dương tính giả**. Ba nguyên nhân, cả ba đã sửa:

| Nguyên nhân | Ví dụ | Cách sửa |
|---|---|---|
| **Khớp nhầm bên trong từ khác** | `tăng động` khớp trong *"tăng động viên"*; `cá biệt` khớp trong *"cá biệt hoá"* — vốn là thuật ngữ sư phạm hợp lệ | Thêm điều kiện loại trừ |
| **Không nhận ra ngữ cảnh cấm** | Danh sách *"Nhãn dán: lười · hư · kém · dốt"* trong một mục dạy **không được dùng** các từ đó | Nhận diện ngữ cảnh ở **cả cấp câu và cấp mục** |
| **Không nhận ra tên riêng** | *"Sợi dây kỳ diệu"* là **tên một gói hoạt động**, không phải ngôn ngữ quảng cáo | Bỏ qua từ khoá nằm trong tên in đậm, in nghiêng, hoặc trong ngoặc kép |

**Quy tắc xử lý khi bộ kiểm báo lỗi:**

| Bước | Việc |
|---|---|
| 1 | **Mở đúng chỗ được báo và đọc ngữ cảnh.** Bộ kiểm luôn in ra từ đã khớp và câu chứa nó |
| 2 | Nếu là **lỗi tài liệu** → sửa tài liệu |
| 3 | Nếu là **lỗi bộ kiểm** → sửa bộ kiểm, **không sửa tài liệu cho vừa bộ kiểm** |
| 4 | Nếu là **ngoại lệ hợp lệ hiếm gặp** → đánh dấu tên riêng bằng in đậm hoặc in nghiêng, vừa đúng trình bày vừa hết báo lỗi |

> **Điều tuyệt đối không làm:** hạ mức nghiêm trọng của một nhóm kiểm để báo cáo đẹp hơn. Nếu nhóm
> AT báo lỗi thì hoặc con số sai, hoặc bất biến định nghĩa sai — **không có khả năng thứ ba**.

---

## 6. Nhịp kiểm định

| Nhịp | Việc | Ai |
|---|---|---|
| **Trước mỗi lần đẩy thay đổi** | Chạy toàn bộ · phải đạt **0 CHẶN** | Người sửa tài liệu |
| **Trước mỗi bản phát hành** | Chạy toàn bộ · **0 CHẶN và 0 CẢNH BÁO** · ghi kết quả vào biên bản chốt phiên bản | Chủ biên |
| **Trước mỗi lần chuyển giao nhượng quyền** | Chạy toàn bộ + rà thủ công 10 tài liệu ngẫu nhiên | Chủ biên + Pháp chế |
| **Hằng quý** | Rà lại **chính bộ kiểm**: bất biến còn đúng không, có ngưỡng nào cần thêm không | Chủ biên |
| **Sau mỗi khoá thật** | Cập nhật bất biến nếu chuẩn vận hành thay đổi | Trainer trưởng |

---

## 7. Điều bộ kiểm KHÔNG làm được

Ghi thẳng, để không ai nhầm bộ kiểm với sự bảo đảm chất lượng.

| Không kiểm được | Vì sao | Ai kiểm thay |
|---|---|---|
| **Nội dung chuyên môn có đúng không** | Máy không biết một phác đồ có hợp lý về mặt sư phạm hay không | Hội đồng chuyên môn |
| **Ngưỡng số có phù hợp thực tế không** | Máy chỉ kiểm **nhất quán**, không kiểm **đúng đắn** | Dữ liệu từ khoá thật, sau hiệu chuẩn |
| **Câu văn có dễ hiểu với phụ huynh không** | Cần người đọc thật | Thử nghiệm với 5 phụ huynh trước khi phát hành tài liệu gửi gia đình |
| **Tài liệu có thiếu nội dung quan trọng không** | Máy không biết cái chưa được viết | Rà theo danh sách tồn ở [`README.md`](README.md) §7 |
| **Ví dụ minh hoạ có an toàn không** | Cần phán đoán về bảo vệ trẻ em | Cán bộ Bảo vệ trẻ em |

> **Bộ kiểm bắt được lỗi nhất quán và lỗi chuẩn an toàn — hai loại lỗi mà con người bỏ sót nhiều
> nhất ở quy mô lớn.** Nó không thay được hội đồng chuyên môn, và không được dùng như bằng chứng
> rằng tài liệu đã đúng.

---

## 8. Kết quả lần chạy gần nhất

**Cả chín nhóm ✓ ĐẠT — 0 CHẶN · 0 CẢNH BÁO · 0 GHI CHÚ.**

Đây là lần đầu hệ đạt trạng thái sạch hoàn toàn. Đường đi tới đó, ghi lại để lần sau đọc được:

| Vòng | Kết quả | Việc đã làm |
|---|---|---|
| 1 | 45 CHẶN | Toàn bộ là dương tính giả — sửa **bộ kiểm** ba lần (§5) |
| 2 | 3 CHẶN | Bộ kiểm đọc chính tài liệu này như vi phạm, vì §5 **trích lại** các ví dụ sai. Thêm nhận diện mã inline và trích dẫn lỗi |
| 3 | 1 CẢNH BÁO · 8 ghi chú | Sửa **lỗi tài liệu thật**: nhấn mạnh lệch `**Sợi dây kỳ diệu*`, bốn tiêu đề cấp 1 trong một tệp, URL trong khối mã bị coi là liên kết trần |
| 4 | 0 · 0 · 0 | Gộp hai bảng trùng về **một nguồn duy nhất**; viết lại hai đoạn chạy dài thành bảng kiểm; đưa 🔴 vào bộ ký hiệu có nghĩa |

> **Điều đáng chú ý nhất ở vòng 3.** Bảng ba cấp 90 ngày tồn tại ở hai tài liệu, và bản chép đã
> **bắt đầu lệch** — một bên mất phần in đậm ở cổng nghiệm thu Cấp 1. Chưa sai số, nhưng đó chính là
> bước đầu của việc hai tài liệu nói hai điều khác nhau về cùng một ngưỡng. Nay bảng chỉ còn ở
> [`he-thong-huan-luyen-gita/13-he-thong-90-ngay.md`](he-thong-huan-luyen-gita/13-he-thong-90-ngay.md);
> nơi khác chỉ tóm tắt và trỏ về.

Chạy lại bất cứ lúc nào bằng `python3 tools/kiem_dinh.py` để có số liệu hiện tại.

---

## 9. Liên kết

- Chỉ mục toàn hệ: [`README.md`](README.md)
- Chuẩn giọng viết chi tiết: [`nhan-dien-thuong-hieu/08-chuan-bien-tap.md`](nhan-dien-thuong-hieu/08-chuan-bien-tap.md)
- Quy trình chốt phiên bản: [`ho-so-bao-ho/07-chot-phien-ban.md`](ho-so-bao-ho/07-chot-phien-ban.md)
- Chuẩn trình bày tài liệu: [`ho-so-bao-ho/06-chuan-trinh-bay-tai-lieu.md`](ho-so-bao-ho/06-chuan-trinh-bay-tai-lieu.md)
- Mã nguồn bộ kiểm: [`../tools/kiem_dinh.py`](../tools/kiem_dinh.py)
