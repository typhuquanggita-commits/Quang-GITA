/** Kiểm tra nhanh toàn bộ catalog: sinh mọi phiếu và xác nhận dữ liệu hợp lệ. */
import { WORKSHEETS, MISSIONS, buildWorksheet, packedTopics, catalogStats } from '../src/data/catalog';
import { GENERATORS } from '../src/data/generators';
import { SHEET_TYPES } from '../src/data/sheets';
import { DRILL_ANALYSIS } from '../src/data/analysis';

let items = 0;
let bad = 0;
const seenPrompts = new Set<string>();

let dupInSheet = 0;
for (const meta of WORKSHEETS) {
  const ws = buildWorksheet(meta);
  const local = new Set<string>();
  for (const part of ws.parts) for (const it of part.items) {
    if (local.has(it.prompt)) dupInSheet++;
    local.add(it.prompt);
  }
  for (const part of ws.parts) {
    for (const it of part.items) {
      items++;
      seenPrompts.add(it.prompt);
      if (it.choices.length !== 4) { console.error('BAD choices', meta.id, it.prompt); bad++; }
      if (it.correct < 0 || it.correct > 3) { console.error('BAD correct index', meta.id, it.prompt); bad++; }
      if (new Set(it.choices).size !== 4) { console.error('DUP choices', meta.id, it.prompt, it.choices); bad++; }
      if (!it.steps.length) { console.error('NO steps', meta.id, it.prompt); bad++; }
      if (/undefined|NaN|Infinity/.test(it.prompt + it.choices.join('') + it.steps.join(''))) {
        console.error('BAD token', meta.id, it.prompt, it.choices); bad++;
      }
    }
  }
}
const missingAnalysis = GENERATORS.filter((g) => !DRILL_ANALYSIS[g.id]).map((g) => g.id);
const st = catalogStats();
console.log('generators:', GENERATORS.length, '| có bảng phân tích:', GENERATORS.length - missingAnalysis.length);
if (missingAnalysis.length) { console.error('THIẾU phân tích:', missingAnalysis.join(', ')); bad++; }
console.log('loại phiếu:', SHEET_TYPES.length, '| chuyên đề có bộ phiếu:',
  packedTopics('thpt').length + packedTopics('chuyen').length + packedTopics('thpt-qg').length);
console.log('phiếu/luồng: thpt', st.thpt, '| chuyên', st.chuyen, '| THPT 10-12', st.quocGia);
console.log('worksheets:', WORKSHEETS.length, '| missions:', MISSIONS.length);
console.log('items generated:', items, '| distinct prompts:', seenPrompts.size);
console.log('duplicate prompts inside a single sheet:', dupInSheet);
console.log('problems:', bad);
process.exit(bad ? 1 : 0);
