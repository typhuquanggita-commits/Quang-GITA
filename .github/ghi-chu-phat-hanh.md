Bản máy tính Windows của ENGWIN365 — dựng trên `windows-latest` từ commit `{SHA}`.

## Có gì mới ở bản này

Bốn con số, mỗi con số có một bài kiểm tự động giữ trong kho mã:

| | Bản trước | **Bản này** | |
|---|---|---|---|
| Câu hỏi có đáp án bấm được | 120 | **600** | ×5 |
| Chuyên đề có ngân hàng câu | 10 / 80 | **50 / 80** | ×5 |
| Nhận xét riêng cho từng lựa chọn | 480 | **2.400** | ×5 |
| Gói tải lần đầu của bản web | 1.217 kB | **671 kB** | −45% |

Ngân hàng câu hỏi nay phủ **sáu kỹ năng** thay vì dồn vào ngữ pháp: phát âm 120 câu,
ngữ pháp 120, từ vựng 120, đọc 96, viết 96, tư duy học tập 48. Mỗi câu có **bốn nhận
xét cho bốn lựa chọn** — ô đúng nói vì sao đúng, ba ô sai nói chỗ lập luận gãy — nên
chọn sai thì nhận lại đúng lý do của cái sai mình vừa chọn.

Kèm theo: **bốn đề thi mẫu trọn vẹn** (chuyên Anh Sở Hà Nội, Ngoại ngữ chung vào 10,
chuyên KHTN vòng 2, tốt nghiệp THPT) với 58 lời giải riêng và barem từng phần; **bộ
2.000 bảng phân tích bảy chiều** cho từng phiếu luyện; và **hệ phân quyền tám nhóm vai**
đã được bật thật — thẻ ngoài quyền của vai thì không được dựng.

### Bảo mật đã siết ở bản này

Bốn lỗ hổng thật đã được bịt: chính sách nội dung không còn cho phép mã nội tuyến; quyền
micro không còn mở nhầm cả webcam; đổi mã khoá giữa chừng mất điện không còn làm mất hồ
sơ; và thời gian chờ chống dò mã nay ghi xuống đĩa nên tắt mở lại không xoá được. Két
mật khẩu có **60 phép kiểm tự động**, gồm hai kịch bản mất điện dựng lại thật.

### Chưa làm được, nói thẳng

- **Ba mươi chuyên đề còn lại chưa có câu trắc nghiệm** — toàn bộ *nghe* và *nói*, cộng
  đọc bài dài và viết tự do. Chúng cần ngữ liệu âm thanh, bài đọc có bản quyền, hoặc một
  người chấm. Chúng vẫn có bộ giải đề và phiếu chuyên đề, nhưng không có câu bấm được.
- **Giọng Việt ngoại tuyến chưa có thanh điệu.**
- **Chưa mua chứng thư ký số**, nên Windows còn cảnh báo — xem mục dưới.

## Tải về

| Tệp | Dùng khi nào |
|---|---|
| `ENGWIN365-{VER}-windows-x64.exe` | Bản cài đặt. Chọn được thư mục, có lối tắt ngoài desktop và trong Start Menu. |
| `ENGWIN365-{VER}-windows-portable.exe` | Bản chạy thẳng, không cài. Chép vào USB là dùng được. |
| `engwin365-artifact.html` | Bản web một tệp. Mở bằng trình duyệt, không cần cài gì. |
| `SHA256SUMS.txt` | Mã băm để đối chiếu sau khi tải. |

## Kiểm tra tệp sau khi tải

Mở PowerShell trong thư mục vừa tải:

```
Get-FileHash .\ENGWIN365-{VER}-windows-x64.exe -Algorithm SHA256
```

Chuỗi in ra phải khớp dòng tương ứng dưới đây:

```
{BAM}
```

## Windows sẽ cảnh báo, và đây là lý do

Bản này **chưa mua chứng thư ký số** (code signing certificate). Lần chạy đầu,
Windows SmartScreen sẽ hiện bảng xanh "Windows protected your PC". Bấm
**More info** rồi **Run anyway**. Đây là hành vi mặc định của Windows với mọi
phần mềm chưa ký, không phải dấu hiệu tệp bị lỗi — cách xác minh đúng là đối
chiếu mã băm ở trên. Muốn hết cảnh báo thì phải mua chứng thư ký số OV hoặc EV.

## Dữ liệu và mật khẩu

Ứng dụng chạy hoàn toàn ngoại tuyến, không gọi ra Internet. Két mật khẩu dùng
scrypt (N = 2^17) và AES-256-GCM; dữ liệu nằm trong hồ sơ người dùng trên chính
máy đó. **Quên mật khẩu là mất dữ liệu** — không có cửa hậu để mở lại.
