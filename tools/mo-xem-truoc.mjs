/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Tự mở máy chủ xem trước cho các bài kiểm chạy bằng trình duyệt.
 *
 * VÌ SAO CÓ TỆP NÀY
 *   Năm bài kiểm cần một máy chủ đang chạy ở localhost. Trước đây chúng chỉ
 *   nối tới cổng 4173 và cho rằng có người đã bật sẵn. Ai chạy
 *   `npm run test:web` mà chưa bật thì nhận về một vệt lỗi
 *   ERR_CONNECTION_REFUSED — không nói được rằng thiếu máy chủ, và trông
 *   hệt như phần mềm hỏng.
 *
 *   Tệp này làm cho mỗi bài kiểm tự đứng được: nếu chưa có máy chủ thì nó
 *   dựng một cái trên cổng còn trống, đợi tới khi trả lời thật, rồi dọn đi
 *   khi xong. Đặt biến môi trường BASE thì nó dùng máy chủ có sẵn và không
 *   dựng gì cả.
 *
 *   Cổng lấy động, không cố định: chạy hai bài kiểm cùng lúc trên cùng một
 *   cổng thì cái sau nối vào bản dựng của cái trước và cho kết quả sai mà
 *   vẫn xanh.
 */
import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import {createServer} from 'node:net';

const congTrong = () =>
  new Promise((giai, hong) => {
    const s = createServer();
    s.on('error', hong);
    s.listen(0, '127.0.0.1', () => {
      const {port} = s.address();
      s.close(() => giai(port));
    });
  });

const doi = (ms) => new Promise((r) => setTimeout(r, ms));

async function songChua(base, hanMs = 30_000) {
  const het = Date.now() + hanMs;
  while (Date.now() < het) {
    try {
      const r = await fetch(base, {signal: AbortSignal.timeout(2000)});
      if (r.ok) return true;
    } catch {
      /* chưa lên, thử lại */
    }
    await doi(250);
  }
  return false;
}

/**
 * Trả về {base, dong}. Gọi dong() khi xong để tắt máy chủ đã dựng.
 * Nếu BASE đã được đặt sẵn thì dong() không làm gì.
 */
export async function moXemTruoc() {
  if (process.env.BASE) return {base: process.env.BASE, dong: () => {}};

  if (!existsSync('dist/index.html')) {
    console.error(
      '\n  Chưa có bản dựng. Chạy `npm run build` trước, hoặc đặt BASE=<địa chỉ> để dùng máy chủ có sẵn.\n',
    );
    process.exit(1);
  }

  const cong = await congTrong();
  const base = `http://localhost:${cong}`;
  const tt = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--port', String(cong), '--strictPort'],
    {stdio: 'ignore', detached: process.platform !== 'win32'},
  );

  const dong = () => {
    try {
      if (process.platform !== 'win32' && tt.pid) process.kill(-tt.pid, 'SIGTERM');
      else tt.kill('SIGTERM');
    } catch {
      /* đã tắt rồi thì thôi */
    }
  };
  // Bài kiểm hỏng giữa chừng vẫn phải dọn máy chủ, không để lại tiến trình mồ côi.
  process.on('exit', dong);
  process.on('SIGINT', () => { dong(); process.exit(130); });

  if (!(await songChua(base))) {
    dong();
    console.error(`\n  Không dựng được máy chủ xem trước ở ${base} sau 30 giây.\n`);
    process.exit(1);
  }
  return {base, dong};
}
