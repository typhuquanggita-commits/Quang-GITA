Bản máy tính Windows của ENGWIN365 — dựng trên `windows-latest` từ commit `{SHA}`.

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
