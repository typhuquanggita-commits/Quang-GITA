/** Kiểm tra nhanh toàn bộ catalog: sinh mọi phiếu và xác nhận dữ liệu hợp lệ. */
import { WORKSHEETS, MISSIONS, buildWorksheet } from '../src/data/catalog';
import { GENERATORS } from '../src/data/generators';

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
console.log('generators:', GENERATORS.length);
console.log('worksheets:', WORKSHEETS.length, '| missions:', MISSIONS.length);
console.log('items generated:', items, '| distinct prompts:', seenPrompts.size);
console.log('duplicate prompts inside a single sheet:', dupInSheet);
console.log('problems:', bad);
process.exit(bad ? 1 : 0);
