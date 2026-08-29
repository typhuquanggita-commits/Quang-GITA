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
});
