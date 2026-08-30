/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cầu nối duy nhất giữa trang và tiến trình chính.
 *
 * Trang KHÔNG nhận được ipcRenderer, không nhận được require, không nhận được
 * bất cứ thứ gì của Node. Nó chỉ nhận đúng danh sách hàm dưới đây — mỗi hàm
 * gọi đúng một kênh đã khai báo sẵn ở main.cjs. Không có kênh động, không có
 * cách nào để trang gọi một kênh chưa được liệt kê.
 */

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('engwin', {
  isDesktop: true,
  platform: process.platform,
  vault: {
    status: () => ipcRenderer.invoke('vault:status'),
    validate: (p) => ipcRenderer.invoke('vault:validate', p),
    create: (p) => ipcRenderer.invoke('vault:create', p),
    unlock: (p) => ipcRenderer.invoke('vault:unlock', p),
    lock: () => ipcRenderer.invoke('vault:lock'),
    read: () => ipcRenderer.invoke('vault:read'),
    write: (d) => ipcRenderer.invoke('vault:write', d),
    change: (a, b) => ipcRenderer.invoke('vault:change', a, b),
    destroy: () => ipcRenderer.invoke('vault:destroy'),
  },
  /*
   * MỘT KÊNH MỘT CHIỀU, TỪ TIẾN TRÌNH CHÍNH VỀ TRANG
   *
   * Két tự khoá khi máy khoá màn hình, khi máy ngủ, hoặc khi không ai đụng
   * tới trong mười phút. Nếu trang không biết, nó vẫn hiện nguyên hồ sơ trên
   * màn hình — và người ngồi xuống sau vẫn đọc được, dù két đã đóng. Khoá
   * két mà không báo cho trang thì mới bảo vệ được tệp trên đĩa, chưa bảo vệ
   * được cái đang hiện ra.
   *
   * Trang KHÔNG nhận được ipcRenderer. Nó chỉ đăng ký được một hàm gọi lại
   * cho ĐÚNG một kênh cố định, và hàm bọc chỉ chuyển tiếp lý do khoá dưới
   * dạng chuỗi — không chuyển tiếp đối tượng sự kiện của Electron, vốn có
   * tham chiếu tới sender.
   */
  khiTuKhoa: (goiLai) => {
    if (typeof goiLai !== 'function') return () => {};
    const boc = (_e, viSao) => goiLai(String(viSao ?? ''));
    ipcRenderer.on('vault:da-tu-khoa', boc);
    return () => ipcRenderer.removeListener('vault:da-tu-khoa', boc);
  },
});
