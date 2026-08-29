import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Đường dẫn tương đối để bản dist chạy được cả khi mở bằng file://
      // trong Electron, không chỉ khi phục vụ từ gốc tên miền.
      base: './',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      // SINGLE=1 gộp tất cả vào một tệp HTML duy nhất — dùng để xuất bản xem
      // thử ở nơi chỉ nhận một tệp. Bản dựng thường vẫn tách mã theo tab.
      plugins: [
        react(),
        tailwindcss(),
        ...(process.env.SINGLE ? [viteSingleFile()] : []),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          // Preact + lớp tương thích: cùng API với React nhưng nhỏ hơn nhiều
          // lần. Chỉ giữ được nếu toàn bộ 24 tab chạy sạch — có bài kiểm tra
          // trình duyệt để xác nhận, không tin suông.
          react: 'preact/compat',
          'react-dom': 'preact/compat',
          'react-dom/client': 'preact/compat/client',
          'react/jsx-runtime': 'preact/jsx-runtime',
        }
      }
    };
});
