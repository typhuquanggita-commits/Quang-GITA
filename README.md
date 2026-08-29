<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1JDcA0Jijoqjm_Xqs7U5F_DXAjloZXFK4

## Run Locally

**Prerequisites:**  Node.js


1. Cài đặt phụ thuộc: `npm install`
2. Sao chép [`.env.example`](.env.example) thành `.env.local` và điền `GEMINI_API_KEY`
3. Chạy ứng dụng: `npm run dev`

> ⚠️ **Bảo mật:** bản build production **không bao giờ** nhúng khoá API vào bundle trình duyệt.
> Để chạy production cần một backend proxy giữ khoá phía máy chủ — xem [`SECURITY.md`](SECURITY.md).

## Kiểm tra trước khi phát hành

```bash
npm run check      # kiểm kiểu + bộ tự kiểm phân quyền (phải đạt 100%)
```

## Tài liệu

| Bộ | Nội dung |
|---|---|
| [`docs/leader-boom-365/`](docs/leader-boom-365/README.md) | Chương trình huấn luyện Leader Boom 365 — giáo án, chuẩn đối chiếu, an toàn |
| [`docs/he-thong-huan-luyen-gita/`](docs/he-thong-huan-luyen-gita/README.md) | Vận hành toàn trại A→Z — tuyển sinh, hậu cần, tài chính, 90/365 ngày |
| [`docs/thu-vien-chuyen-mon-gita/`](docs/thu-vien-chuyen-mon-gita/README.md) | Thư viện chuyên môn — 220 phác đồ, 18 năng lực, biểu mẫu, giáo án lớp |
| [`docs/an-toan-va-phan-quyen/`](docs/an-toan-va-phan-quyen/README.md) | Phân quyền và an ninh — 13 vai trò, ma trận quyền, phân loại dữ liệu |
| [`src/auth/`](src/auth/README.md) | Bản cài đặt tham chiếu hệ phân quyền |
| [`SECURITY.md`](SECURITY.md) | Chính sách an ninh |
