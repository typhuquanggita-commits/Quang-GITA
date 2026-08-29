/**
 * Xuat bo tai lieu chuong trinh ra tep de in, chia se hoac nhap vao he thong khac.
 *
 *   npm run catalogue
 *
 * Sinh ra ba tep trong thu muc `catalogue/`:
 *   - phieu-luyen.csv                2000 phieu luyen, day du dac ta
 *   - nhiem-vu.csv                   2000 nhiem vu tuong ung
 *   - phieu-huong-dan-on-chac.csv    30 phieu huong dan on chac chuyen de
 *   - chuong-trinh.json              khung chuong trinh day du (may doc)
 *
 * Vi bo phieu duoc SINH RA tu dac ta chu khong go tay, tep xuat ra luon dong bo
 * voi ma nguon: khong bao gio co chuyen tai lieu noi mot dang, phan mem chay
 * mot neo.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  KINDS,
  LEVELS,
  MASTERED_TO_LEVEL_UP,
  STAGES,
  STAGE_PROMOTION_KPI,
} from '../src/data/curriculum';
import { getMissions } from '../src/data/missions';
import { findQuestion } from '../src/data/questions';
import { topicName } from '../src/data/topics';
import { bankCoverage, getWorksheets, guideCodeOf } from '../src/data/worksheets';
import { buildTopicGuide } from '../src/lib/topicGuide';
import { knowledgeFor } from '../src/data/knowledge';
import { TOPICS } from '../src/data/topics';
import { createInitialState } from '../src/lib/storage';
import { SECTION_BY_ID, SUBJECT_NAME } from '../src/config';

const OUT = 'catalogue';
mkdirSync(OUT, { recursive: true });

/** Boc mot o CSV: nhan doi dau nhay va boc trong dau nhay khi can. */
function cell(value: unknown): string {
  const text = String(value ?? '');
  return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(head: readonly string[], rows: ReadonlyArray<readonly unknown[]>): string {
  // BOM de Excel tren Windows mo dung tieng Viet UTF-8.
  return '﻿' + [head, ...rows].map((row) => row.map(cell).join(',')).join('\r\n') + '\r\n';
}

const sheets = getWorksheets();
const missions = getMissions();

writeFileSync(
  join(OUT, 'phieu-luyen.csv'),
  toCsv(
    [
      'Mã phiếu', 'Loại phiếu', 'Mã loại', 'Phiếu lời giải', 'Phiếu hướng dẫn ôn chắc',
      'Tiêu đề', 'Phần thi', 'Môn tự chọn', 'Chuyên đề', 'Giai đoạn', 'Cấp độ',
      'Số câu', 'Thời gian (phút)', 'Ngưỡng hoàn thành', 'Ngưỡng thành thạo',
      'Điểm KN', 'Phiếu tiên quyết',
      'Chặng 1', 'Chặng 1 (số câu)', 'Chặng 2', 'Chặng 2 (số câu)', 'Chặng 3', 'Chặng 3 (số câu)',
      'Mã câu hỏi', 'Mục tiêu', 'Đạt khi',
    ],
    sheets.map((s) => [
      s.code,
      KINDS.find((k) => k.kind === s.kind)?.name ?? s.kind,
      s.kindCode,
      s.solutionCode,
      s.guideCode,
      s.title,
      SECTION_BY_ID[s.section].shortName,
      s.subject ? SUBJECT_NAME[s.subject] : '',
      topicName(s.topicId),
      s.stage,
      s.level,
      s.questionCount,
      Math.max(1, Math.round(s.seconds / 60)),
      `${Math.round(s.passRatio * 100)}%`,
      `${Math.round(s.masteryRatio * 100)}%`,
      s.xp,
      s.requires ?? '',
      s.parts[0]?.name ?? '',
      s.parts[0]?.questionIds.length ?? 0,
      s.parts[1]?.name ?? '',
      s.parts[1]?.questionIds.length ?? 0,
      s.parts[2]?.name ?? '',
      s.parts[2]?.questionIds.length ?? 0,
      s.parts.flatMap((p) => p.questionIds).join(' | '),
      s.objective,
      KINDS.find((k) => k.kind === s.kind)?.masteryCue ?? '',
    ]),
  ),
  'utf8',
);

writeFileSync(
  join(OUT, 'nhiem-vu.csv'),
  toCsv(
    [
      'Mã nhiệm vụ', 'Phiếu luyện', 'Tiêu đề', 'Phần thi', 'Chuyên đề', 'Giai đoạn', 'Cấp độ',
      'Dạng', 'Điểm KN', 'Lời giao việc', 'Ràng buộc',
    ],
    missions.map((m) => [
      m.code,
      m.worksheetId,
      m.title,
      SECTION_BY_ID[m.section].shortName,
      topicName(m.topicId),
      m.stage,
      m.level,
      KINDS.find((k) => k.kind === m.kind)?.name ?? m.kind,
      m.xp,
      m.brief,
      m.constraint,
    ]),
  ),
  'utf8',
);

/* Phieu huong dan on chac chuyen de — mot phieu cho moi chuyen de. */
const blankState = createInitialState();
writeFileSync(
  join(OUT, 'phieu-huong-dan-on-chac.csv'),
  toCsv(
    [
      'Mã phiếu', 'Chuyên đề', 'Phần thi', 'Tỉ trọng trong phần', 'Số câu trong ngân hàng',
      'Ý lõi phải hiểu', 'Công thức phải thuộc', 'Dạng bài & dấu hiệu đọc vị', 'Bẫy hay mắc',
      'Chiến thuật thời gian', 'Tiêu chí ôn chắc',
    ],
    TOPICS.map((topic) => {
      const guide = buildTopicGuide(blankState, topic.id);
      const k = knowledgeFor(topic.id);
      return [
        guideCodeOf(topic.id),
        topic.name,
        SECTION_BY_ID[topic.section].shortName,
        `${Math.round(topic.weight * 100)}%`,
        guide?.questionCount ?? 0,
        (k?.coreIdeas ?? []).join(' | '),
        (k?.formulas ?? []).join(' | '),
        (k?.patterns ?? []).map((p) => `${p.name}: ${p.cue}`).join(' | '),
        (k?.traps ?? []).map((t) => `${t.trap} → ${t.fix}`).join(' | '),
        k?.timing ?? '',
        (guide?.criteria ?? []).map((c) => c.label).join(' | '),
      ];
    }),
  ),
  'utf8',
);

writeFileSync(
  join(OUT, 'chuong-trinh.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      rules: {
        passRatio: sheets[0]?.passRatio,
        masteredToLevelUp: MASTERED_TO_LEVEL_UP,
        stagePromotionKpi: STAGE_PROMOTION_KPI,
      },
      stages: STAGES,
      levels: LEVELS,
      kinds: KINDS,
      totals: { worksheets: sheets.length, missions: missions.length },
      bankCoverage: bankCoverage().map((c) => ({ ...c, topic: topicName(c.topicId) })),
      worksheets: sheets,
      missions,
    },
    null,
    2,
  ),
  'utf8',
);

const missingQuestions = sheets
  .flatMap((s) => s.parts.flatMap((p) => p.questionIds))
  .filter((id) => !findQuestion(id));

console.log(
  `Đã xuất ${sheets.length} phiếu luyện, ${missions.length} nhiệm vụ và ${TOPICS.length} phiếu hướng dẫn ôn chắc vào thư mục ${OUT}/`,
);
if (missingQuestions.length > 0) {
  console.error(`CẢNH BÁO: ${missingQuestions.length} mã câu hỏi không tồn tại trong ngân hàng.`);
  process.exitCode = 1;
}
