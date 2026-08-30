/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

/*
 * DÙNG createRoot CHỨ KHÔNG DÙNG hydrateRoot, DÙ HTML ĐÃ ĐƯỢC DỰNG SẴN.
 *
 * Cách nhanh nhất về lý thuyết là hydrate: coi DOM sẵn có là đúng và chỉ
 * gắn thêm phần xử lý sự kiện. Nhưng preact/compat khi hydrate KHÔNG so
 * lại thuộc tính của những nút đã có sẵn — nó chỉ so cấu trúc con.
 *
 * Với ứng dụng này thì đó là một cái bẫy thật, không phải bẫy lý thuyết:
 * bản dựng sẵn dựng bằng VAI MẶC ĐỊNH, còn người quay lại có thể đang ở
 * vai khác lưu trong máy. Hydrate thì thanh điều hướng giữ nguyên trạng
 * thái của vai mặc định — thẻ đang mở tô sáng sai chỗ, và không bao giờ
 * được sửa lại.
 *
 * createRoot của preact/compat vẫn TÁI DÙNG các nút DOM có sẵn thay vì
 * xoá đi dựng lại, nên vẫn hưởng phần lớn cái lợi của bản dựng sẵn, mà
 * thuộc tính thì được so lại đầy đủ. Đổi chút tốc độ lấy tính đúng.
 */
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
