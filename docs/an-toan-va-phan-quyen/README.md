# AN TOÀN THÔNG TIN & PHÂN QUYỀN GITA 365

> 🏠 **Chỉ mục toàn hệ:** [`../README.md`](../README.md) — 124 tài liệu · 9 bộ · cấu trúc hai lớp · 11 nguyên tắc chuyên môn · 10 chuẩn an toàn.

### Hệ phân quyền theo vai trò, quan hệ, tầng năng lực và mức nhạy cảm dữ liệu · Phiên bản 1.0

---

## 1. Vì sao bộ này tồn tại

GITA 365 lưu trữ loại dữ liệu nhạy cảm nhất trong ngành giáo dục: **hồ sơ phát triển của trẻ em**,
gồm dữ liệu sức khoẻ, dữ liệu tâm lý, nhật ký phản tư riêng tư, đánh giá năng lực, và
báo cáo bảo vệ trẻ em. Rò rỉ một hồ sơ không chỉ là sự cố kỹ thuật — nó có thể để lại
hệ quả kéo dài nhiều năm cho một đứa trẻ.

Hệ thống có **13 vai trò** với nhu cầu truy cập rất khác nhau. Nếu không thiết kế phân quyền
từ đầu, mô hình mặc định luôn là "ai cũng xem được gần hết" — và đó là lỗ hổng lớn nhất.

---

## 2. Bộ tài liệu

| # | Tài liệu | Nội dung | Ai bắt buộc đọc |
|---|---|---|---|
| 00 | `README.md` | Bản đồ, mười bất biến an ninh | Tất cả |
| 01 | [`01-mo-hinh-phan-quyen.md`](01-mo-hinh-phan-quyen.md) | 13 vai trò · 7 phạm vi quan hệ + phạm vi tổng hợp · tầng năng lực L · gói G · thuật toán quyết định | Công nghệ, BLĐ |
| 02 | [`02-ma-tran-quyen.md`](02-ma-tran-quyen.md) | **Ma trận quyền đầy đủ** — 34 loại tài nguyên × 9 hành động × 13 vai trò | Công nghệ |
| 03 | [`03-phan-loai-du-lieu.md`](03-phan-loai-du-lieu.md) | 4 mức nhạy cảm · vòng đời dữ liệu · đồng ý và rút đồng ý · lưu trữ và xoá | Công nghệ, Pháp chế |
| 04 | [`04-kiem-soat-an-ninh.md`](04-kiem-soat-an-ninh.md) | Mô hình đe doạ · 24 biện pháp kiểm soát · **3 lỗ hổng đã phát hiện và đã vá** · ứng phó sự cố | Công nghệ, BLĐ |
| 05 | [`05-trien-khai-ky-thuat.md`](05-trien-khai-ky-thuat.md) | Hướng dẫn triển khai · break-glass · lược đồ nhật ký kiểm toán · bộ kiểm thử | Công nghệ |

**Bản cài đặt tham chiếu bằng mã nguồn:** [`../../src/auth/`](../../src/auth/) — định nghĩa vai trò,
ma trận chính sách, hàm quyết định `can()`, hợp đồng nhật ký kiểm toán và bộ tự kiểm.

**Bộ tài liệu liên quan:** [`../leader-boom-365/`](../leader-boom-365/README.md) chuyên môn trại ·
[`../he-thong-huan-luyen-gita/`](../he-thong-huan-luyen-gita/README.md) vận hành ·
[`../thu-vien-chuyen-mon-gita/`](../thu-vien-chuyen-mon-gita/README.md) thư viện tác nghiệp ·
[`../nhan-dien-thuong-hieu/`](../nhan-dien-thuong-hieu/README.md) nhận diện thương hiệu ·
[`../nhuong-quyen-leader-boom/`](../nhuong-quyen-leader-boom/README.md) **nhượng quyền** — mọi đơn vị
nhận quyền phải áp dụng nguyên bộ phân quyền này, không được tự dựng hệ riêng (NQ-06) ·
[`../cong-dong-leader-boom/`](../cong-dong-leader-boom/README.md) **cộng đồng** — ranh giới dữ liệu
giữa nền tảng riêng và mạng xã hội, xem TL 01 §1 và TL 02 của bộ đó ·
[`../seo-va-hien-dien-so/`](../seo-va-hien-dien-so/README.md) **SEO** — quy tắc dùng hình ảnh và
câu chuyện học viên trên website.

---

## 3. Mười bất biến an ninh

Đây là các mệnh đề **luôn đúng** trong mọi phiên bản hệ thống. Bất kỳ thay đổi nào phá vỡ một
bất biến đều phải được Giám đốc điều hành phê duyệt bằng văn bản và ghi vào nhật ký thay đổi.

| # | Bất biến | Vì sao |
|---|---|---|
| **BB-01** | **Không vai trò nào có quyền "xem tất cả" mặc định — kể cả Super Admin.** | Super Admin quản trị *tài khoản và hệ thống*, không phải *nội dung hồ sơ trẻ em* |
| **BB-02** | **Hồ sơ tham vấn tâm lý chỉ Chuyên viên tham vấn đọc được.** Chuyên gia đọc được khi ca đã được chuyển tới đúng quy trình | Dữ liệu tâm lý của trẻ là mức nhạy cảm cao nhất |
| **BB-03** | **Báo cáo bảo vệ trẻ em chỉ Cán bộ BVTE và Giám đốc điều hành đọc được.** Admin hệ thống không đọc được | Người bị nghi ngờ có thể là nhân sự nội bộ, kể cả nhân sự kỹ thuật |
| **BB-04** | **Phụ huynh không đọc nguyên văn nhật ký phản tư riêng tư của con từ 12 tuổi** — chỉ thấy xu hướng và KPI. Ngoại lệ duy nhất: nội dung gắn cờ an toàn | Không có quyền riêng tư thì học viên sẽ không ghi thật, và dữ liệu mất giá trị |
| **BB-05** | **Giáo viên chỉ thấy học viên của lớp mình**, và không bao giờ thấy dữ liệu mức P3 | Nguyên tắc đặc quyền tối thiểu |
| **BB-06** | **Admin sản phẩm không chạm bất kỳ dữ liệu học viên nào** — chỉ cấu hình sản phẩm, giá, gói | Vai trò kinh doanh không có nhu cầu nghiệp vụ với hồ sơ cá nhân |
| **BB-07** | **Giám đốc điều hành mặc định chỉ thấy dữ liệu tổng hợp đã ẩn danh.** Xem hồ sơ cá nhân phải qua break-glass có lý do | Quyền lực tổ chức không tự động là quyền truy cập dữ liệu |
| **BB-08** | **Mọi lần đọc dữ liệu P2 và P3 đều ghi nhật ký kiểm toán bất biến**, gồm cả lần đọc hợp lệ | Không có nhật ký thì không phát hiện được lạm quyền |
| **BB-09** | **Không ai tự cấp quyền cho chính mình.** Gán vai trò nhạy cảm cần hai người: Super Admin đề xuất, Giám đốc điều hành phê duyệt | Ngăn leo thang đặc quyền từ bên trong |
| **BB-10** | **Xuất dữ liệu (`export`) là quyền riêng, tách khỏi quyền đọc.** Mọi lần xuất đều ghi nhật ký và giới hạn số lượng | Đọc từng hồ sơ khác hẳn tải về toàn bộ cơ sở dữ liệu |

---

## 4. Công thức quyết định quyền

Quyền **không** phải là bảng tra một chiều "vai trò → được làm gì". Nó là tích của sáu điều kiện.
Thiếu một điều kiện là từ chối.

```
CHO PHÉP  ⟺  ĐƯỢC_VAI_TRÒ_CẤP
           ∧ ĐÚNG_PHẠM_VI_QUAN_HỆ      (own / child / assigned / class / referred / org)
           ∧ ĐỦ_MỨC_NHẠY_CẢM           (vai trò có được chạm P0…P3 không)
           ∧ ĐÚNG_GÓI_DỊCH_VỤ          (G1…G5 của gia đình có mở tính năng này không)
           ∧ ĐỦ_TẦNG_NĂNG_LỰC          (chỉ áp dụng với học viên: L1…L5)
           ∧ KHÔNG_BỊ_CHẶN             (rút đồng ý · khoá tài khoản · lưu giữ pháp lý)
```

**Mặc định là TỪ CHỐI.** Không có quy tắc nào cho phép thì kết quả là từ chối —
không phải "cho phép vì chưa cấm".

---

## 5. Cách dùng bộ này

- **Đội công nghệ:** đọc 01 → 02 → 05, rồi cài đặt theo [`src/auth/`](../../src/auth/). Chạy bộ tự kiểm trước mỗi lần phát hành.
- **Ban lãnh đạo:** đọc README này (10 bất biến) và 04 (mô hình đe doạ, ứng phó sự cố).
- **Pháp chế:** đọc 03 (phân loại dữ liệu, đồng ý, lưu trữ) và 04 (§7 nghĩa vụ pháp lý).
- **Toàn bộ nhân sự:** đọc §3 (10 bất biến) và ký cam kết bảo mật.
- **Chu kỳ rà soát:** ma trận quyền rà **mỗi 6 tháng**; danh sách tài khoản rà **mỗi quý**.

---

## 6. Ba lỗ hổng đã phát hiện trong mã nguồn hiện tại và đã vá

| # | Lỗ hổng | Mức | Trạng thái |
|---|---|---|---|
| **LH-01** | Khoá API của nhà cung cấp mô hình bị nhúng thẳng vào bundle trình duyệt qua `vite.config.ts` → bất kỳ ai mở trang đều trích xuất được khoá và dùng bằng hạn mức của Học viện | **Cao** | ✅ Đã vá — bản build production không bao giờ nhúng khoá; dev phải bật cờ tường minh |
| **LH-02** | `.gitignore` không loại trừ `.env`, `.env.production`, khoá riêng tư, file service account → nguy cơ commit bí mật lên kho mã | **Trung bình** | ✅ Đã vá — bổ sung đầy đủ mẫu loại trừ và thêm `.env.example` |
| **LH-03** | Dev server lắng nghe `0.0.0.0` → mọi máy trong cùng mạng đọc được ứng dụng đang phát triển, kèm khoá đã nhúng | **Trung bình** | ✅ Đã vá — mặc định `127.0.0.1`, mở rộng phải khai báo tường minh |

Chi tiết kỹ thuật: [`04-kiem-soat-an-ninh.md`](04-kiem-soat-an-ninh.md) §6.
