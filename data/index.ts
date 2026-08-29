/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
export * from './system';
export * from './methods';
export * from './roadmap';
export * from './resources';
export * from './dossier';
export * from './drills';
export * from './lectures';
export * from './playbooks';
export * from './habits';
export * from './mindset';
export * from './clubs';
export * from './charter';
export * from './podcast';
export * from './profile';
export * from './levels';
export * from './brand';
export * from './sprint';
export * from './academy';
export * from './assess';
export * from './solutions';
export * from './assistant';
export * from './feedback';
export * from './gita';
export * from './lessons300';
export * from './chuyenanh';
export * from './voices';
export * from './certify';
export * from './exams';
export * from './training';
export * from './tuyen';
export * from './timkiem';
export * from './phieu';
export * from './phanquyen';
export * from './gitahoa';
export * from './chuanquocte';
export * from './gitachu';
export * from './giaide';
export * from './hoso';
export * from './chuyende';
export * from './phien';

/*
 * MƯỜI MÔ-ĐUN NẶNG KHÔNG NẰM TRONG THÙNG CHUNG, VÀ ĐÓ LÀ CHỦ Ý
 *
 * data/nganhang.ts (600 câu, 451 KB nguồn) và bốn mô-đun khác — dethi,
 * bode, giangsau và production — mỗi cái chỉ có ĐÚNG MỘT thẻ dùng tới. Nhưng App.tsx nạp thùng chung này
 * ngay từ đầu, nên hễ thùng còn tái xuất chúng thì cả 39 thẻ đều phải tải
 * ngân hàng câu hỏi — kể cả thẻ Hiến chương vốn không liên quan gì.
 *
 * Các thẻ cần chúng nạp thẳng từ đường dẫn riêng, nên Rollup xếp được chúng
 * vào đúng chunk của thẻ đó và người dùng chỉ tải khi thật sự mở thẻ ấy.
 * Đo được: gói tải lần đầu giảm hẳn, xem README mục hiệu năng.
 *
 *   import {NGAN_HANG} from '../../data/nganhang';
 *   import {DE_THI_MAU} from '../../data/dethi';
 *   import {boDe} from '../../data/bode';
 */
