/**
 * Sinh lại src/data/scale.ts từ chính kho nội dung.
 *
 * Chạy: npm run gen:scale
 * Sau đó `npm run smoke` sẽ đối chiếu lại để chắc chắn không lệch.
 */
import { writeFileSync } from 'node:fs';
import { catalogStats } from '../src/data/catalog';
import { GENERATORS } from '../src/data/generators';
import { TOPICS } from '../src/data/topics';
import { formulaStats } from '../src/data/formulas';
import { EXAM_PAPERS, paperItems } from '../src/data/papers';
import { LIBRARY_TREE, countFolders, countArtifacts } from '../src/data/library-tree';

const st = catalogStats();
const fs = formulaStats();

const values: Record<string, number> = {
  worksheets: st.worksheets,
  missions: st.missions,
  chuyen: st.chuyen,
  thpt: st.thpt,
  quocGia: st.quocGia,
  lop6: st.lop6,
  items: st.items,
  generators: GENERATORS.length,
  packedTopics: st.packedTopics,
  topics: TOPICS.length,
  formulas: fs.items,
  formulaGroups: fs.groups,
  formulasStarred: fs.starred,
  papers: EXAM_PAPERS.length,
  paperItems: EXAM_PAPERS.reduce((s, p) => s + paperItems(p).length, 0),
  libraryFolders: countFolders(LIBRARY_TREE),
  libraryArtifacts: countArtifacts(LIBRARY_TREE),
};

const body = Object.entries(values)
  .map(([k, v]) => `  ${k}: ${v},`)
  .join('\n');

const out = `/**
 * CÁC CON SỐ QUY MÔ CỦA HỆ THỐNG — TỆP ĐƯỢC SINH TỰ ĐỘNG.
 *
 * Sinh lại bằng: npm run gen:scale   (đừng sửa tay)
 *
 * Vì sao tồn tại tệp này: những con số dưới đây được dùng ở phần đầu tài liệu
 * của mọi trang và ở trang chủ — tức là ở phần mã luôn được tải đầu tiên. Nếu
 * lấy chúng bằng cách gọi hàm thống kê của kho phiếu, cả kho phiếu sẽ bị kéo
 * vào gói mã khởi động, làm chậm thời gian hiển thị nội dung chính của mọi
 * trang nội dung.
 *
 * Rủi ro của cách làm này là số ở đây lệch với số thật. Rủi ro đó được chặn
 * bằng kiểm tra tự động: \`npm run smoke\` đối chiếu từng con số với giá trị tính
 * ra từ kho nội dung, và bản dựng bị chặn nếu lệch dù chỉ một đơn vị.
 */
export const SCALE = {
${body}
} as const;
`;

writeFileSync('src/data/scale.ts', out, 'utf-8');
console.log('Đã sinh lại src/data/scale.ts:', Object.entries(values).map(([k, v]) => `${k}=${v}`).join(' '));
