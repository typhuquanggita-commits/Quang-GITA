import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isDev = mode === 'development';

  // BẢO MẬT — không bao giờ nhúng khoá API của nhà cung cấp vào bundle trình duyệt.
  // Bất kỳ ai mở trang cũng đọc được khoá trong file JS đã build, rồi dùng khoá đó
  // với hạn mức và hoá đơn của chúng ta.
  //
  // Khoá chỉ được nhúng khi CẢ HAI điều kiện đúng:
  //   1. đang chạy dev (mode === 'development'), và
  //   2. lập trình viên chủ động bật GITA_ALLOW_CLIENT_API_KEY=true trong .env.local
  //
  // Bản build production KHÔNG BAO GIỜ chứa khoá. Muốn chạy production, gọi mô hình
  // qua một backend proxy giữ khoá ở phía máy chủ. Xem SECURITY.md.
  const allowClientKey = isDev && env.GITA_ALLOW_CLIENT_API_KEY === 'true';

  if (!isDev && env.GEMINI_API_KEY) {
    // Cảnh báo lớn: có khoá trong môi trường build nhưng cố tình không nhúng.
    console.warn(
      '[bảo mật] Phát hiện GEMINI_API_KEY khi build production. Khoá KHÔNG được nhúng vào bundle. ' +
        'Hãy gọi mô hình qua backend proxy — xem SECURITY.md.',
    );
  }

  return {
    server: {
      port: 3000,
      // Chỉ nghe trên localhost. Đặt GITA_DEV_HOST=0.0.0.0 khi thật sự cần truy cập
      // từ máy khác trong mạng LAN, và chỉ trên mạng tin cậy.
      host: env.GITA_DEV_HOST || '127.0.0.1',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(allowClientKey ? env.GEMINI_API_KEY : ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(allowClientKey ? env.GEMINI_API_KEY : ''),
      'process.env.GITA_CLIENT_KEY_ENABLED': JSON.stringify(allowClientKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
