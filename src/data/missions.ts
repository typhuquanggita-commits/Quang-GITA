import type { Mission, Worksheet } from '../types';
import { KIND_BY_ID, LEVEL_BY_ID } from './curriculum';
import { getWorksheets } from './worksheets';
import { topicName } from './topics';

/**
 * SINH BO 2000 NHIEM VU
 *
 * Phieu luyen la TAI LIEU; nhiem vu la VIEC DUOC GIAO. Moi phieu tuong ung
 * dung mot nhiem vu, nen bo nhiem vu cung co dung 2000 muc va duoc phan bo
 * san sang cho ba phan luyen theo dung ti trong cua de thi.
 *
 * Nhiem vu bo sung ba thu ma phieu khong co:
 *  - Loi giao viec ro rang (lam gi, trong bao lau, dat bao nhieu la xong).
 *  - Rang buoc rieng theo dang phieu (siet gio, gioi han so cau sai...).
 *  - Dieu kien mo khoa, tao thanh chuoi nhiem vu lien tuc trong tung tuyen.
 */

export const TOTAL_MISSIONS = 2000;

function briefFor(sheet: Worksheet): string {
  const level = LEVEL_BY_ID.get(sheet.level);
  const minutes = Math.max(1, Math.round(sheet.seconds / 60));
  const passCount = Math.ceil(sheet.questionCount * sheet.passRatio);
  const masterCount = Math.ceil(sheet.questionCount * sheet.masteryRatio);

  return [
    `Hoàn thành ${sheet.questionCount} câu chuyên đề "${topicName(sheet.topicId)}" trong khoảng ${minutes} phút,`,
    `lần lượt qua 3 chặng: khởi động → rèn luyện → bứt tốc.`,
    `Đúng từ ${passCount} câu là hoàn thành; đúng từ ${masterCount} câu được tính là thành thạo và cộng điểm lên cấp.`,
    level ? `Tinh thần cấp ${sheet.level}: ${level.motto}` : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function buildMissions(): Mission[] {
  return getWorksheets().map((sheet, index) => {
    const kind = KIND_BY_ID.get(sheet.kind);
    const code = `NV-${String(index + 1).padStart(4, '0')}`;
    return {
      id: code,
      code,
      worksheetId: sheet.id,
      title: `${kind?.name ?? 'Nhiệm vụ'}: ${topicName(sheet.topicId)} — cấp ${sheet.level}`,
      brief: briefFor(sheet),
      constraint: kind?.constraint ?? 'Hoàn thành đủ ba chặng trong một lượt.',
      section: sheet.section,
      topicId: sheet.topicId,
      level: sheet.level,
      stage: sheet.stage,
      kind: sheet.kind,
      xp: sheet.xp,
      ...(sheet.subject ? { subject: sheet.subject } : {}),
    };
  });
}

let cache: Mission[] | null = null;

export function getMissions(): Mission[] {
  if (!cache) cache = buildMissions();
  return cache;
}

let byWorksheet: Map<string, Mission> | null = null;

export function missionForWorksheet(worksheetId: string): Mission | undefined {
  if (!byWorksheet) byWorksheet = new Map(getMissions().map((m) => [m.worksheetId, m]));
  return byWorksheet.get(worksheetId);
}

let byId: Map<string, Mission> | null = null;

export function missionById(id: string): Mission | undefined {
  if (!byId) byId = new Map(getMissions().map((m) => [m.id, m]));
  return byId.get(id);
}
