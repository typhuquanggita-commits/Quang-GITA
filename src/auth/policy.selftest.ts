/**
 * Bộ tự kiểm phân quyền — 15 mệnh đề bắt buộc đúng trước mỗi lần phát hành.
 * Đặc tả: docs/an-toan-va-phan-quyen/02-ma-tran-quyen.md §5
 *
 * Chạy:  npm run test:auth
 */
import {can, resolveScopes} from './can.ts';
import {InMemoryAuditSink} from './audit.ts';
import type {LevelTier, Relationship, Resource, RoleCode, Subject} from './types.ts';

const NOW = new Date('2026-09-01T09:00:00Z');
const PAST = '2026-01-01T00:00:00Z';
const YESTERDAY = '2026-08-31T00:00:00Z';
const TOMORROW = '2026-09-02T00:00:00Z';

let passed = 0;
let failed = 0;

function check(name: string, actual: boolean, expected: boolean): void {
  if (actual === expected) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}  — mong đợi ${expected}, nhận ${actual}`);
  }
}

function sink(): InMemoryAuditSink {
  return new InMemoryAuditSink();
}

function person(
  id: string,
  roles: RoleCode[],
  relationships: Relationship[] = [],
  extra: Partial<Subject> = {},
): Subject {
  return {
    id,
    roles,
    status: 'active',
    confidentialityAgreementSigned: true,
    relationships,
    ...extra,
  };
}

function rel(kind: Relationship['kind'], targetId: string, validTo?: string): Relationship {
  return {kind, targetId, validFrom: PAST, validTo};
}

function res(
  type: Resource['type'],
  sensitivity: Resource['sensitivity'],
  extra: Partial<Resource> = {},
): Resource {
  return {type, id: `${type}-1`, sensitivity, servicePackage: 'G5', ...extra};
}

const HS = 'hs-001';
const HS_KHAC = 'hs-999';

console.log('\nBỘ TỰ KIỂM PHÂN QUYỀN GITA 365\n');

// 1. Super Admin không đọc được hồ sơ tham vấn và báo cáo bảo vệ trẻ em.
{
  const su = person('su-1', ['SUPER_ADMIN'], [rel('org', '*')]);
  check(
    '01 · SUPER_ADMIN không đọc được counseling_record',
    can(su, 'read', res('counseling_record', 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  check(
    '01b · SUPER_ADMIN không đọc được safeguarding_report',
    can(su, 'read', res('safeguarding_report', 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// 2. Admin hệ thống không đọc được bất kỳ tài nguyên P3 nào.
{
  const sa = person('sa-1', ['SYSTEM_ADMIN'], [rel('org', '*')]);
  const p3: Array<Resource['type']> = [
    'health_record',
    'counseling_record',
    'safeguarding_report',
    'reflection_flagged',
  ];
  const anyAllowed = p3.some(
    (t) => can(sa, 'read', res(t, 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
  );
  check('02 · SYSTEM_ADMIN không đọc được mọi tài nguyên P3', anyAllowed, false);
}

// 3. Admin sản phẩm không đọc được dữ liệu học viên.
{
  const pd = person('pd-1', ['PRODUCT_ADMIN'], [rel('org', '*')]);
  const types: Array<Resource['type']> = ['profile', 'report', 'journal', 'health_record'];
  const anyAllowed = types.some(
    (t) => can(pd, 'read', res(t, t === 'health_record' ? 'P3' : 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
  );
  check('03 · PRODUCT_ADMIN không đọc được dữ liệu học viên', anyAllowed, false);
}

// 4. Coach chỉ đọc được học viên được phân công.
{
  const co = person('co-1', ['COACH'], [rel('assigned', HS)]);
  check(
    '04a · COACH đọc được học viên được phân công',
    can(co, 'read', res('report', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
  check(
    '04b · COACH KHÔNG đọc được học viên khác',
    can(co, 'read', res('report', 'P2', {ownerId: HS_KHAC}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// 5. Giáo viên chỉ thấy lớp mình.
{
  const te = person('te-1', ['TEACHER'], [rel('class', 'lop-6a')]);
  check(
    '05a · TEACHER đọc được học viên lớp mình',
    can(te, 'read', res('result', 'P2', {ownerId: HS, classId: 'lop-6a'}), {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
  check(
    '05b · TEACHER KHÔNG đọc được học viên lớp khác',
    can(te, 'read', res('result', 'P2', {ownerId: HS_KHAC, classId: 'lop-7b'}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// 6. Phụ huynh không đọc nguyên văn phản tư riêng tư của con ≥ 12 tuổi.
{
  const pa = person('pa-1', ['PARENT'], [rel('child', HS)]);
  check(
    '06a · PARENT KHÔNG đọc phản tư riêng tư của con 14 tuổi',
    can(pa, 'read', res('reflection', 'P2', {ownerId: HS, privateToStudent: true, ownerAgeYears: 14}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  check(
    '06b · PARENT đọc được phản tư của con 9 tuổi (chưa đến tuổi riêng tư)',
    can(pa, 'read', res('reflection', 'P2', {ownerId: HS, privateToStudent: true, ownerAgeYears: 9}), {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
}

// 7. Phụ huynh không đọc được hồ sơ trẻ khác.
{
  const pa = person('pa-1', ['PARENT'], [rel('child', HS)]);
  check(
    '07 · PARENT KHÔNG đọc được hồ sơ trẻ không phải con mình',
    can(pa, 'read', res('profile', 'P2', {ownerId: HS_KHAC}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// 8. Học sinh không đọc được hồ sơ học sinh khác.
{
  const st = person(HS, ['STUDENT'], [], {studentLevel: 5});
  check(
    '08 · STUDENT KHÔNG đọc được hồ sơ bạn khác',
    can(st, 'read', res('profile', 'P2', {ownerId: HS_KHAC}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// 9. Cổng cấp độ năng lực học viên.
{
  const mk = (lv: LevelTier) => person(HS, ['STUDENT'], [], {studentLevel: lv});
  const goal = res('goal', 'P2', {ownerId: HS});
  check(
    '09a · STUDENT L2 KHÔNG tự đặt được mục tiêu',
    can(mk(2), 'create', goal, {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  check(
    '09b · STUDENT L3 tự đặt được mục tiêu',
    can(mk(3), 'create', goal, {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
  check(
    '09c · STUDENT L4 KHÔNG tự xuất được Portfolio (cần L5)',
    can(mk(4), 'export', res('portfolio', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// 10. Chuyên gia chỉ đọc được ca đã chuyển tới.
{
  const spDuoc = person('sp-1', ['SPECIALIST'], [rel('referred', HS)]);
  const spChua = person('sp-2', ['SPECIALIST'], []);
  const rec = res('counseling_record', 'P3', {ownerId: HS});
  check('10a · SPECIALIST đọc được ca đã chuyển tới', can(spDuoc, 'read', rec, {now: NOW}, {auditSink: sink()}).allow, true);
  check('10b · SPECIALIST KHÔNG đọc được ca chưa chuyển', can(spChua, 'read', rec, {now: NOW}, {auditSink: sink()}).allow, false);
}

// 11. Giám đốc điều hành không đọc hồ sơ cá nhân nếu không có break-glass.
{
  const ed = person('ed-1', ['EXEC_DIRECTOR'], [rel('agg', '*'), rel('org', '*')]);
  check(
    '11a · EXEC_DIRECTOR KHÔNG đọc hồ sơ cá nhân khi không có break-glass',
    can(ed, 'read', res('report', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  const edBG = person('ed-1', ['EXEC_DIRECTOR'], [rel('agg', '*')], {
    breakGlass: [
      {
        resourceType: 'report',
        resourceId: 'report-1',
        reason: 'Điều tra sự việc an toàn số 2026-07',
        requestedBy: 'ed-1',
        approvedBy: 'cso-1',
        expiresAt: TOMORROW,
      },
    ],
  });
  check(
    '11b · EXEC_DIRECTOR đọc được khi có break-glass hợp lệ',
    can(edBG, 'read', res('report', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
}

// 12. Quyền mất khi phân công đã kết thúc.
{
  const coHetHan = person('co-2', ['COACH'], [rel('assigned', HS, YESTERDAY)]);
  check(
    '12 · COACH mất quyền sau khi phân công kết thúc',
    can(coHetHan, 'read', res('report', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// 13. Mọi truy cập P2/P3 đều ghi nhật ký kiểm toán.
{
  const s = sink();
  const co = person('co-1', ['COACH'], [rel('assigned', HS)]);
  can(co, 'read', res('report', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: s});
  can(co, 'read', res('report', 'P2', {ownerId: HS_KHAC}), {now: NOW}, {auditSink: s});
  check('13a · Ghi nhật ký cả lần cho phép lẫn lần từ chối', s.entries.length === 2, true);
  check('13b · Nhật ký ghi đúng chủ thể dữ liệu', s.entries[0].subjectOfDataId === HS, true);
  const s2 = sink();
  can(co, 'read', res('form_template', 'P1'), {now: NOW}, {auditSink: s2});
  check('13c · KHÔNG ghi nhật ký với tài nguyên P1', s2.entries.length === 0, true);
}

// 14. Lưu giữ pháp lý chặn xoá và xuất.
{
  const pa = person('pa-1', ['PARENT'], [rel('child', HS)]);
  check(
    '14a · Bị chặn export khi có lưu giữ pháp lý',
    can(pa, 'export', res('report', 'P2', {ownerId: HS, legalHold: true}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  check(
    '14b · Vẫn đọc được khi có lưu giữ pháp lý',
    can(pa, 'read', res('report', 'P2', {ownerId: HS, legalHold: true}), {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
}

// 15. Break-glass: không tự phê duyệt, và tự hết hạn.
{
  const tuPheDuyet = person('ed-1', ['EXEC_DIRECTOR'], [], {
    breakGlass: [
      {
        resourceType: 'counseling_record',
        resourceId: 'counseling_record-1',
        reason: 'tự phê duyệt',
        requestedBy: 'ed-1',
        approvedBy: 'ed-1',
        expiresAt: TOMORROW,
      },
    ],
  });
  check(
    '15a · Break-glass tự phê duyệt bị từ chối',
    can(tuPheDuyet, 'read', res('counseling_record', 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  const hetHan = person('ed-1', ['EXEC_DIRECTOR'], [], {
    breakGlass: [
      {
        resourceType: 'counseling_record',
        resourceId: 'counseling_record-1',
        reason: 'đã hết hạn',
        requestedBy: 'ed-1',
        approvedBy: 'cso-1',
        expiresAt: YESTERDAY,
      },
    ],
  });
  check(
    '15b · Break-glass hết hạn bị từ chối',
    can(hetHan, 'read', res('counseling_record', 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
}

// Kiểm tra bổ sung — các bất biến khác.
{
  const cn = person('cn-1', ['COUNSELOR'], [rel('referred', HS)]);
  check(
    'X1 · COUNSELOR đọc được hồ sơ tham vấn của ca được chuyển',
    can(cn, 'read', res('counseling_record', 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
  const cs = person('cs-1', ['CSO'], [rel('org', '*')]);
  check(
    'X2 · CSO đọc được báo cáo bảo vệ trẻ em',
    can(cs, 'read', res('safeguarding_report', 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
  const hc = person('hc-1', ['HEAD_COACH'], [rel('team', HS)]);
  check(
    'X3 · HEAD_COACH KHÔNG đọc được hồ sơ tham vấn',
    can(hc, 'read', res('counseling_record', 'P3', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  const chuaKy = person('co-3', ['COACH'], [rel('assigned', HS)], {
    confidentialityAgreementSigned: false,
  });
  check(
    'X4 · Nhân sự chưa ký cam kết bảo mật bị từ chối',
    can(chuaKy, 'read', res('report', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  const bikhoa = person('co-4', ['COACH'], [rel('assigned', HS)], {status: 'suspended'});
  check(
    'X5 · Tài khoản bị khoá bị từ chối',
    can(bikhoa, 'read', res('report', 'P2', {ownerId: HS}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  const co = person('co-1', ['COACH'], [rel('assigned', HS)]);
  check(
    'X6 · Gói dịch vụ thấp chặn tính năng chưa mua',
    can(co, 'read', res('portfolio', 'P2', {ownerId: HS, servicePackage: 'G2'}), {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  const paRut = person('pa-1', ['PARENT'], [rel('child', HS)]);
  check(
    'X7 · Rút đồng ý chặn truy cập theo mục đích',
    can(paRut, 'read', res('evidence', 'P2', {ownerId: HS}), {
      now: NOW,
      purpose: 'marketing',
      consent: {marketing: false},
    }, {auditSink: sink()}).allow,
    false,
  );
  const ed2 = person('ed-1', ['EXEC_DIRECTOR'], [rel('agg', '*')]);
  check(
    'X8 · Chỉ có phạm vi agg thì chưa đủ cho analytics_aggregate (policy yêu cầu org)',
    can(ed2, 'read', {type: 'analytics_aggregate', id: 'agg-1', sensitivity: 'P1'}, {now: NOW}, {auditSink: sink()}).allow,
    false,
  );
  const ed3 = person('ed-1', ['EXEC_DIRECTOR'], [rel('org', '*')]);
  check(
    'X9 · EXEC_DIRECTOR đọc thống kê tổng hợp qua phạm vi org',
    can(ed3, 'read', {type: 'analytics_aggregate', id: 'agg-1', sensitivity: 'P1'}, {now: NOW}, {auditSink: sink()}).allow,
    true,
  );
  const st = person(HS, ['STUDENT'], [], {studentLevel: 1});
  check(
    'X10 · Phạm vi own được tính đúng',
    resolveScopes(st, res('profile', 'P2', {ownerId: HS}), NOW).has('own'),
    true,
  );
}

console.log(`\nKẾT QUẢ: ${passed} đạt · ${failed} lỗi\n`);
if (failed > 0) process.exit(1);
