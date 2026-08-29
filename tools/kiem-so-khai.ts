/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Đối chiếu mọi con số app TỰ KHAI với dữ liệu thật.
 *
 * Vì sao bài này tồn tại: khai khống là dạng rỗng ruột tệ nhất, vì người dùng
 * tin vào con số đó. Thanh điều hướng từng ghi "37 nguồn đã sàng lọc" trong
 * khi kho có 45 — không ai phát hiện bằng mắt, vì con số nào cũng trông hợp lý.
 *
 * Chạy: npx tsx tools/kiem-so-khai.ts
 */
import * as D from '../data/index';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/*
 * Khoá theo NHÃN TAB, không theo đơn vị.
 *
 * Bản đầu khớp theo đơn vị và báo hỏng ba lần vì chữ "bài" trong tiếng Việt
 * vừa là bài giảng, vừa là bài luyện, bài thi, và bài định hướng. Nhãn tab thì
 * duy nhất, nên khoá theo nó không nhập nhằng được.
 */
const MONG: {tab: RegExp; don: RegExp; that: number; nguon: string}[] = [
  {tab: /Phương pháp/, don: /phương pháp/i, that: (D.METHODS as any[]).length, nguon: 'METHODS'},
  {tab: /Luyện tập/, don: /bài/i, that: (D.DRILLS as any[]).length, nguon: 'DRILLS'},
  // Neo đúng nhãn "Bài giảng", không để nó bắt luôn "Bài giảng chuyên sâu" —
  // hai tab khác nhau, hai kho nội dung khác nhau.
  {tab: /^Bài giảng$/, don: /chuỗi/i, that: (D.LECTURE_SERIES as any[]).length, nguon: 'LECTURE_SERIES'},
  {tab: /^Bài giảng$/, don: /bài/i, that: (D.LECTURE_SERIES as any[]).reduce((s, x: any) => s + x.lessons.length, 0), nguon: 'tổng bài giảng'},
  {tab: /Bài giảng chuyên sâu/, don: /trụ/i, that: (D as any).TRU.length, nguon: 'TRU'},
  {tab: /Bài giảng chuyên sâu/, don: /bài/i, that: (D as any).GIANG_SAU_SO.soBai, nguon: 'bài giảng chuyên sâu'},
  {tab: /Bộ phiếu chuyên đề/, don: /chuyên đề/i, that: (D as any).CHUYENDE_SO.soChuyenDe, nguon: 'CHUYENDE_SO.soChuyenDe'},
  {tab: /Bộ phiếu chuyên đề/, don: /loại/i, that: (D as any).CHUYENDE_SO.soLoai, nguon: 'CHUYENDE_SO.soLoai'},
  {tab: /Bộ phiếu chuyên đề/, don: /phiếu/i, that: (D as any).CHUYENDE_SO.tongPhieu, nguon: 'CHUYENDE_SO.tongPhieu'},
  {tab: /Phiếu luyện/, don: /phiếu/i, that: (D as any).PHIEU_SO.soPhieu, nguon: 'PHIEU_SO.soPhieu'},
  {tab: /Phiếu luyện/, don: /nhiệm vụ/i, that: (D as any).PHIEU_SO.soNhiemVu, nguon: 'PHIEU_SO.soNhiemVu'},
  {tab: /Bốn chữ GITA/, don: /chữ/i, that: (D as any).CHU_GITA_SO.soChu, nguon: 'CHU_GITA_SO.soChu'},
  {tab: /Bốn chữ GITA/, don: /thành tố/i, that: (D as any).CHU_GITA_SO.soThanhTo, nguon: 'CHU_GITA_SO.soThanhTo'},
  {tab: /Bốn chữ GITA/, don: /ô ba sân/i, that: (D as any).GITA_HOA_SO.soO, nguon: 'GITA_HOA_SO.soO'},
  {tab: /Chuẩn quốc tế/, don: /chuẩn/i, that: (D as any).CHUAN_SO.soChuan, nguon: 'CHUAN_SO.soChuan'},
  {tab: /Chuẩn quốc tế/, don: /tầng hấp thu/i, that: (D as any).GITA_HOA_SO.soTangHapThu, nguon: 'GITA_HOA_SO.soTangHapThu'},
  {tab: /Phân quyền/, don: /quyền/i, that: (D as any).QUYEN_SO.soQuyen, nguon: 'QUYEN_SO.soQuyen'},
  {tab: /Phân quyền/, don: /bậc/i, that: (D as any).QUYEN_SO.soBac, nguon: 'QUYEN_SO.soBac'},
  {tab: /Phân quyền/, don: /thang/i, that: (D as any).QUYEN_SO.soThang, nguon: 'QUYEN_SO.soThang'},
  {tab: /Bí kíp/, don: /chiến thuật/i, that: (D.PLAYBOOKS as any[]).length, nguon: 'PLAYBOOKS'},
  {tab: /Thói quen/, don: /thói quen/i, that: (D.HABITS as any[]).length, nguon: 'HABITS'},
  {tab: /Thói quen/, don: /nghi thức/i, that: (D.RITUALS as any[]).length, nguon: 'RITUALS'},
  {tab: /Tư duy/, don: /mô-đun/i, that: (D.MINDSET_MODULES as any[]).length, nguon: 'MINDSET_MODULES'},
  {tab: /Club/, don: /CLB/i, that: (D.CLUBS as any[]).length, nguon: 'CLUBS'},
  {tab: /Club/, don: /cổng/i, that: (D.CHECKPOINTS as any[]).length, nguon: 'CHECKPOINTS'},
  {tab: /Tài liệu/, don: /nguồn/i, that: (D.RESOURCES as any[]).length, nguon: 'RESOURCES'},
  {tab: /Cấp độ/, don: /tầng/i, that: (D.PYRAMID as any[]).length, nguon: 'PYRAMID'},
  {tab: /Chấm bài/, don: /phác đồ/i, that: (D.ERROR_REMEDIES as any[]).length, nguon: 'ERROR_REMEDIES'},
  {tab: /Podcast/, don: /tập/i, that: (D.PODCAST_EPISODES as any[]).length, nguon: 'PODCAST_EPISODES'},
  {tab: /Dàn giọng/, don: /giọng/i, that: (D.VOICE_ROSTER as any[]).length, nguon: 'VOICE_ROSTER'},
  {tab: /Xưởng học liệu/, don: /bản thiết kế/i, that: (D.PRODUCTION_SPECS as any[]).length, nguon: 'PRODUCTION_SPECS'},
  {tab: /Lộ trình$/, don: /cột mốc/i, that: (D.MILESTONES as any[]).length, nguon: 'MILESTONES'},
  {tab: /Thi tốt nghiệp/, don: /bài/i, that: (D.GRADUATION_EXAMS as any[]).length, nguon: 'GRADUATION_EXAMS'},
  {tab: /Đánh giá định kỳ/, don: /bộ đề/i, that: (D.BATTERIES as any[]).length, nguon: 'BATTERIES'},
  {tab: /Đánh giá định kỳ/, don: /đơn/i, that: D.solutions().length, nguon: 'kho giải pháp'},
  {tab: /Mô thức GITA/, don: /bước/i, that: (D.GITA_JOURNEY as any[]).length, nguon: 'GITA_JOURNEY'},
  {tab: /Mô thức GITA/, don: /bài/i, that: D.lessons300().length, nguon: 'lessons300'},
  {tab: /Kế hoạch của tôi/, don: /câu/i, that: (D.QUESTIONS as any[]).length, nguon: 'QUESTIONS'},
  {tab: /Kiểm định nhân sự/, don: /vai/i, that: (D.ROLE_TRACKS as any[]).length, nguon: 'ROLE_TRACKS'},
  {tab: /Kiểm định nhân sự/, don: /khoá nghề/i, that: (D.TRAINING_COURSES as any[]).length, nguon: 'TRAINING_COURSES'},
  {tab: /Trợ lý AI/, don: /bước/i, that: (D.AI_PROTOCOL as any[]).length, nguon: 'AI_PROTOCOL'},
  {tab: /Trợ lý AI/, don: /gói/i, that: (D.PACKAGES as any[]).length, nguon: 'PACKAGES'},
  {tab: /Chu kỳ/, don: /khối/i, that: (D.SPRINT_DAY as any[]).length, nguon: 'SPRINT_DAY'},
  {tab: /Đào tạo nâng cao/, don: /bậc coach/i, that: (D.COACH_LADDER as any[]).length, nguon: 'COACH_LADDER'},
];

const app = readFileSync(path.join(ROOT, 'App.tsx'), 'utf8');
const hints = [...app.matchAll(/label: '([^']+)',\s*\n\s*hint: '([^']+)'/g)].map((m) => ({
  label: m[1],
  hint: m[2],
}));

let bad = 0;
console.log('\n  ĐỐI CHIẾU SỐ APP TỰ KHAI VỚI DỮ LIỆU THẬT\n');
let soDoi = 0;
for (const h of hints) {
  for (const [, n, dv] of h.hint.matchAll(/(\d[\d.]*)\s*([a-zA-ZÀ-ỹ\-]+)/g)) {
    const khai = Number(n.replace(/\./g, ''));
    const m = MONG.find((x) => x.tab.test(h.label) && x.don.test(dv));
    if (!m) continue;
    soDoi++;
    if (khai !== m.that) {
      bad++;
      console.log(`  ✗ ${h.label.padEnd(24)} khai "${khai} ${dv}" · ${m.nguon} có ${m.that}`);
    }
  }
}
console.log(
  bad === 0
    ? `  ✓ đối chiếu ${soDoi} con số trong thanh điều hướng, tất cả khớp`
    : `\n  ${bad} chỗ khai không khớp`,
);

// Mọi cặp trong bảng MONG phải thật sự khớp được một nhãn — bảng chết là bảng
// không kiểm gì cả.
const khongDung = MONG.filter((m) => !hints.some((h) => m.tab.test(h.label)));
if (khongDung.length) {
  bad += khongDung.length;
  for (const k of khongDung) console.log(`  ✗ luật kiểm "${k.nguon}" không khớp nhãn tab nào — bảng đã lỗi thời`);
} else {
  console.log(`  ✓ cả ${MONG.length} luật kiểm đều còn khớp một nhãn tab có thật`);
}

/* Chuỗi bài giảng: totalLessons phải bằng số bài có thật. */
let khong = 0;
for (const s of D.LECTURE_SERIES as any[])
  if (s.lessons.length !== s.totalLessons) {
    khong++;
    console.log(`  ✗ chuỗi ${s.id}: khai ${s.totalLessons} bài, có ${s.lessons.length}`);
  }
if (!khong) console.log(`  ✓ ${(D.LECTURE_SERIES as any[]).length} chuỗi bài giảng đều khai đúng số bài`);
bad += khong;

/* Mọi bài giảng phải có bài luyện và bẫy — bài chỉ có tiêu đề là bài rỗng ruột. */
let thieu = 0;
const drillIds = new Set((D.DRILLS as any[]).map((d) => d.id));
const codes = new Set((D.ERROR_REMEDIES as any[]).map((r) => r.code));
for (const s of D.LECTURE_SERIES as any[])
  for (const l of s.lessons) {
    if (!l.drillId) { thieu++; console.log(`  ✗ ${s.id}#${l.no}: không có bài luyện`); }
    else if (!drillIds.has(l.drillId)) { thieu++; console.log(`  ✗ ${s.id}#${l.no}: bài luyện không tồn tại — ${l.drillId}`); }
    if (!l.trap) { thieu++; console.log(`  ✗ ${s.id}#${l.no}: không nêu bẫy`); }
    if (l.remedyCode && !codes.has(l.remedyCode)) { thieu++; console.log(`  ✗ ${s.id}#${l.no}: mã phác đồ không tồn tại — ${l.remedyCode}`); }
  }
if (!thieu) {
  const tong = (D.LECTURE_SERIES as any[]).reduce((a, s) => a + s.lessons.length, 0);
  console.log(`  ✓ cả ${tong} bài giảng đều có bài luyện hợp lệ và nêu rõ bẫy`);
}
bad += thieu;

/* Không mảng dữ liệu nào được rỗng, không trường nội dung nào được trống. */
let rong = 0;
for (const [ten, val] of Object.entries(D)) {
  if (Array.isArray(val) && val.length === 0) {
    rong++;
    console.log(`  ✗ ${ten}: mảng rỗng`);
  }
  if (Array.isArray(val))
    val.forEach((it: any, i) => {
      if (it && typeof it === 'object')
        for (const [k, v] of Object.entries(it)) {
          if (v === '' || v === null || v === undefined) {
            rong++;
            console.log(`  ✗ ${ten}[${i}].${k}: rỗng`);
          }
          if (Array.isArray(v) && v.length === 0) {
            rong++;
            console.log(`  ✗ ${ten}[${i}].${k}: mảng con rỗng`);
          }
        }
    });
}
if (!rong) console.log('  ✓ không mảng nào rỗng, không trường nội dung nào trống');
bad += rong;

console.log(`\n  ${bad === 0 ? 'ĐẠT — không chỗ nào khai khống hay rỗng ruột' : `HỎNG — ${bad} lỗi`}\n`);
process.exit(bad ? 1 : 0);
