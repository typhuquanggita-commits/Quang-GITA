import { ALL_TOPICS, FORMULAS } from './src/content/index';
let dr=0, ty=0, ex=0, sk=0, th=0, pit=0;
const thin: string[] = [];
const ids = new Set<string>(); const dupIds: string[] = [];
for (const t of ALL_TOPICS as any[]) {
  dr += t.decode.length; ty += t.types.length; th += t.theory.length;
  ex += t.types.reduce((s:number,x:any)=>s+(x.worked?.length||0),0);
  pit += t.types.reduce((s:number,x:any)=>s+(x.pitfalls?.length||0),0);
  sk += (t.practiceSkills?.length||0);
  for (const ty2 of t.types) { if (ids.has(ty2.id)) dupIds.push(ty2.id); ids.add(ty2.id); }
  const nEx = t.types.reduce((s:number,x:any)=>s+(x.worked?.length||0),0);
  const flags:string[]=[];
  if (t.decode.length < 6) flags.push(`đọc vị ${t.decode.length}`);
  if (nEx < 4) flags.push(`ví dụ ${nEx}`);
  if (!t.practiceSkills?.length) flags.push('CHƯA có bộ kỹ năng');
  if (flags.length) thin.push(`  ${t.id.padEnd(6)} ${flags.join(' · ')}`);
}
const blob = JSON.stringify(ALL_TOPICS);
const odd = (blob.match(/\$/g)||[]).length % 2;
console.log('CHUYÊN ĐỀ:', ALL_TOPICS.length, '| lý thuyết:', th, '| đọc vị:', dr, '| dạng bài:', ty, '| ví dụ mẫu:', ex, '| lỗi sai:', pit, '| bộ kỹ năng:', sk, '| thẻ CT:', (FORMULAS as any[]).length);
console.log('mã dạng bài trùng:', dupIds.length ? dupIds.join(', ') : 'không có');
console.log('lỗi giá trị:', /undefined|NaN/.test(blob) ? 'CÓ' : 'không');
console.log(thin.length ? 'CÒN MỎNG:\n'+thin.join('\n') : 'MỌI CHUYÊN ĐỀ ĐỀU ĐẠT CHUẨN (đọc vị >=6, ví dụ >=4, có bộ kỹ năng)');
