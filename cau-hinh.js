/* ═══════════════════════════════════════════════════════════════
   GITA 365 — CẤU HÌNH TRIỂN KHAI
   Tệp duy nhất cần sửa khi đưa bản web lên mạng. Không có gì bí mật
   ở đây: chỉ là địa chỉ máy chủ cấp phép. Khoá vẫn nằm trên máy chủ.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

/* Dán URL triển khai của Apps Script (…/exec) vào đây.
   Để trống thì ứng dụng chạy ở CHẾ ĐỘ MẪU — xem được giao diện và phần
   giới thiệu, kho chuyên môn vẫn khoá. Xem docs/TRIEN_KHAI_WEB.md. */
G.API_CAP_PHEP = 'http://127.0.0.1:8091';
