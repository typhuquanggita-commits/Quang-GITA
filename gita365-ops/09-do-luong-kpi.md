# 09 — HỆ ĐO LƯỜNG

## 9.1. Cây chỉ số

```
                   CHỈ SỐ BẮC ĐẨU
   G1: WAP – số người THỰC HÀNH hoạt động mỗi tuần
   G2: WAF – số GIA ĐÌNH hoạt động mỗi tuần
                        │
      ┌─────────────────┼─────────────────┬──────────────────┐
      ▼                 ▼                 ▼                  ▼
   THU HÚT           GẮN KẾT          CHUYỂN ĐỔI          GIỮ CHÂN
  người mới        tương tác thật    sang tầng 1–3       ở lại & quay lại
      │                 │                 │                  │
 - yêu cầu vào     - tỉ lệ tương tác  - tài khoản mới    - tỉ lệ hoạt động lại
 - tỉ lệ duyệt     - bình luận gốc/bài - hoàn tất tầng 1 - chuỗi ngày liên tục
 - nguồn giới thiệu- độ sâu luồng      - ghi danh tầng 2 - tỉ lệ rời nhóm
 - hệ số K         - % TV bình luận    - dự offline t3   - tỉ lệ ngủ đông
```

**Định nghĩa "tương tác thật"** (dùng thống nhất toàn hệ thống — quan trọng cho mục tiêu ở `12`):

> Một thành viên được tính là **tương tác thật trong tuần** khi thỏa **ít nhất 1** điều kiện,
> và tài khoản đã qua kiểm tra người thật (`13.3`):
> - viết một bình luận có nội dung **từ 10 từ trở lên**, hoặc
> - đăng một bài được duyệt, hoặc
> - nộp một bằng chứng nghi thức (ảnh/bài tập), hoặc
> - tham gia livestream ≥10 phút có phát biểu.
>
> **Không tính**: thả cảm xúc, bình luận dưới 10 từ, chỉ nhấn "đã xem", biểu tượng cảm xúc đơn lẻ.

---

## 9.2. Bảng chỉ số & ngưỡng

### Nhóm chỉ số THU HÚT
| Chỉ số | Công thức | Ngưỡng đạt | Báo động |
|---|---|---|---|
| Thành viên mới/tuần | đếm | theo mốc `12` | < 60% mục tiêu |
| Tỉ lệ duyệt | duyệt / yêu cầu | 70–85% | > 95% (cổng hở) hoặc < 50% |
| % người mới từ giới thiệu | — | ≥ 60% | < 30% |
| Hệ số lan truyền K | lời mời TB × tỉ lệ nhận | ≥ 0,3 | < 0,15 |

### Nhóm chỉ số GẮN KẾT
| Chỉ số | Công thức | Ngưỡng đạt | Báo động |
|---|---|---|---|
| **Tỉ lệ tương tác thật tuần** | người tương tác thật / tổng TV | ≥ 12% | < 5% |
| Bình luận gốc trung bình/bài chính | — | ≥ 15 | < 5 |
| Độ sâu luồng bình luận | lượt trả lời / luồng | ≥ 2,0 | < 1,2 |
| Tỉ lệ bài đạt chuẩn (`04.5`) | bài đạt / tổng bài | ≥ 70% | < 40% |
| Thời gian phản hồi trung bình | — | ≤ 30 phút | > 2 giờ |
| Số người bình luận **lần đầu**/tuần | — | ≥ 10 | < 3 |

### Nhóm chỉ số CHUYỂN ĐỔI
| Chỉ số | Ngưỡng đạt |
|---|---|
| Nhóm → tài khoản web app (tầng 1) | ≥ 10–15% thành viên hoạt động/quý |
| Tài khoản → hoàn tất bài học đầu tiên | ≥ 50% |
| Hoàn tất tầng 1 → ghi danh tầng 2 | ≥ 15–25% |
| Tầng 2 → tầng 3 offline (chỉ G1) | ≥ 6–12% |
| Doanh thu trên mỗi thành viên hoạt động | theo dõi xu hướng, không đặt trần |

### Nhóm chỉ số GIỮ CHÂN
| Chỉ số | Ngưỡng đạt | Báo động |
|---|---|---|
| Tỉ lệ giữ chân sau 30 ngày | ≥ 35% | < 20% |
| Tỉ lệ giữ chân sau 90 ngày | ≥ 25% | < 12% |
| Tỉ lệ rời nhóm/tháng | < 2% | > 5% |
| Tỉ lệ hoàn tất chuỗi 21 ngày | ≥ 30% người đăng ký | < 15% |
| Đánh thức thành công | 8–15% | < 5% |

### Nhóm chỉ số AN TOÀN (chi tiết ở `13`)
| Chỉ số | Ngưỡng |
|---|---|
| Tài khoản nghi ngờ bị chặn/tuần | ghi nhận đủ, không đặt trần |
| Vụ mời chào bán hàng qua tin nhắn được báo cáo | < 3/tuần/10.000 TV |
| Thời gian xử lý báo cáo vi phạm | ≤ 4 giờ |
| Tỉ lệ nick ảo lọt qua cổng (kiểm tra mẫu 50 TV/tháng) | < 2% |

---

## 9.3. Nhịp báo cáo

| Báo cáo | Tần suất | Người làm | Nội dung |
|---|---|---|---|
| Sổ ca | Hằng ngày 21:30 | Người trực | 4 dòng/bài |
| Bảng tuần | Thứ Hai 9:00 | Dữ liệu | Toàn bộ chỉ số + 3 điều chỉnh |
| Mổ xẻ nội dung | Thứ Sáu | Nội dung | 3 bài tốt nhất / 3 bài kém nhất + vì sao |
| Báo cáo tháng | Ngày 1 | Ops | Xu hướng, phễu, doanh thu, đội ngũ |
| Tổng kết mùa | Mỗi 90 ngày | Admin | So với mục tiêu `12`, quyết định mở rộng |

**Mẫu 5 câu hỏi cho mọi cuộc rà soát tuần:**
1. Bài nào tạo nhiều **bình luận lần đầu** nhất? Vì sao?
2. Chỗ nào trong phễu tụt mạnh nhất so với tuần trước?
3. Có bao nhiêu người đã nhắn riêng? Bao nhiêu người trả lời?
4. Ba người/gia đình nào đáng được vinh danh tuần này?
5. Điều gì tuần này ta sẽ **ngừng làm**?

---

## 9.4. Bảng theo dõi

Dùng `data/bang-theo-doi-kpi.csv` — mỗi dòng là 1 tuần cho 1 nhóm. Nhập số vào,
so với cột ngưỡng để ra trạng thái. Cột cuối `hanh_dong` bắt buộc điền — **không có
chỉ số nào được ghi nhận mà không kèm hành động**.
