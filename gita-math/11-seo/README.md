# 11-SEO — HIỆN DIỆN TRÊN CÔNG CỤ TÌM KIẾM

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn

Thư mục này chứa mọi thứ liên quan tới việc **MATH TIỂU HỌC 365 có mặt trên Google**.

## Đọc theo thứ tự này

| Tài liệu | Trả lời câu gì |
|---|---|
| `01-chien-luoc-tim-kiem.md` | Nhắm từ khoá nào, vì sao thắng được, đo bằng gì, và ba việc chỉ người thật làm được |
| `02-chuan-ky-thuat.md` | 28 hạng mục kỹ thuật đang được máy cưỡng chế và vì sao từng ngưỡng lại là con số ấy |
| `03-trien-khai-len-ten-mien.md` | Các bước đưa 2 003 trang lên mạng và báo cho Google |
| `04-uy-tin-va-danh-gia.md` | Cách đạt đánh giá năm sao thật, và vì sao tuyệt đối không tự gắn số sao |

## Ba lệnh

```
python3 04-cong-cu/build_site.py        # dựng 2 003 trang vào 11-seo/site/
python3 04-cong-cu/kiem_toan_seo.py     # kiểm toán website — 28 hạng mục
python3 04-cong-cu/nhap_danh_gia.py --kiem
```

## Vì sao `11-seo/site/` không nằm trong kho mã

2 003 trang, 85 MB, dựng lại hết trong vài giây từ bộ sinh và dữ liệu nguồn. Nguồn thật
là `04-cong-cu/build_site.py`, `04-cong-cu/lap/seo.py` và `04-cong-cu/data/tu_khoa.py` —
không phải kết quả kết xuất. Sửa nội dung website thì sửa ba tệp ấy rồi dựng lại, **không
sửa tay tệp HTML đã sinh**.

## Ba điều cần biết ngay

1. **Bản online trên claude.ai không bao giờ lên được Google** — trang riêng tư, nội
   dung do JavaScript dựng. Muốn có mặt trên tìm kiếm thì phải đưa `11-seo/site/` lên
   tên miền của Học viện.
2. **"Top 1 cho MATH TIỂU HỌC 365" là mục tiêu dễ và gần như vô giá trị** — chưa ai gõ
   cụm từ ấy. Giá trị nằm ở truy vấn nhu cầu: dạng bài, đọc vị đề, lộ trình học.
3. **Ba chỗ trong site đang chờ thông tin thật** — đội ngũ biên soạn, thông tin liên hệ,
   thông tin ghi danh. Chúng hiện rõ trên trang, cố ý, để không ai quên. Với chủ đề dạy
   toán cho trẻ em, việc có người thật đứng tên có tác động lớn nhất trên mỗi giờ công.
