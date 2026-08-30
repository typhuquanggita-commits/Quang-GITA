import { ALL_TEMPLATES, buildQuestion } from './src/bank/index';
import { scoreOne } from './src/lib/grading';
const filter = process.argv[2] ? process.argv[2].split(',') : null;
const tpls = filter ? ALL_TEMPLATES.filter(t => filter.some(f => t.id.includes(f))) : ALL_TEMPLATES;
console.log('templates checked:', tpls.length, '/ total', ALL_TEMPLATES.length);
let bad = 0;
const BADWORDS = /undefined|NaN|Infinity|\[object Object\]/;
for (const t of tpls) {
  for (let s = 0; s < 250; s++) {
    const q = buildQuestion(t, 1000 + s * 31, s);
    const blob = JSON.stringify(q);
    if (BADWORDS.test(blob)) { console.log('BAD VALUE', t.id, 'seed', s, blob.match(BADWORDS)![0]); bad++; break; }
    for (const [k, v] of Object.entries(q as any)) {
      const arr = Array.isArray(v) ? v : [v];
      for (const x of arr) if (typeof x === 'string' && ((x.match(/\$/g) || []).length % 2 !== 0)) { console.log('ODD $', t.id, 'seed', s, k, JSON.stringify(x)); bad++; }
    }
    if (bad) break;
    if (q.kind === 'MC') {
      const o = q.options || [];
      if (o.length !== 4) { console.log('MC opts != 4', t.id); bad++; break; }
      if (new Set(o.map(x => x.trim())).size !== 4) { console.log('MC dup opts', t.id, 'seed', s, JSON.stringify(o)); bad++; break; }
    }
    if (q.kind === 'TF') {
      const o = q.options || [];
      const ans = q.answer as boolean[];
      if (o.length !== 4 || !Array.isArray(ans) || ans.length !== 4) { console.log('TF shape', t.id, 'seed', s, o.length, JSON.stringify(ans)); bad++; break; }
      if (new Set(o.map(x => x.trim())).size !== 4) { console.log('TF dup ý', t.id, 'seed', s, JSON.stringify(o)); bad++; break; }
      if (ans.every(Boolean) || ans.every(v => !v)) { console.log('TF toàn đúng/toàn sai', t.id, 'seed', s, JSON.stringify(ans)); bad++; break; }
      if ((q.solution || []).length !== 4) { console.log('TF thiếu lời giải ý', t.id, 'seed', s); bad++; break; }
    }
    if (q.kind !== 'ESSAY') {
      const r = scoreOne(q, q.answer as never);
      if (r.score < r.max - 1e-9) { console.log('SELF-GRADE FAIL', t.id, 'seed', s, r.score, '/', r.max, JSON.stringify(q.answer)); bad++; break; }
    } else if (!q.rubric || q.rubric.length === 0) { console.log('NO RUBRIC', t.id); bad++; break; }
    if (!q.solution?.length) { console.log('NO SOLUTION', t.id); bad++; break; }
    if (!q.thinking?.length) { console.log('NO THINKING', t.id); bad++; break; }
  }
}
console.log(bad === 0 ? 'ALL OK' : `FAILURES: ${bad}`);
