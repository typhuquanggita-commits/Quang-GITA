/**
 * Hệ thống phân quyền MATH365.
 *
 * LƯU Ý QUAN TRỌNG: đây là mô hình phân quyền phía client, dùng để định hình
 * trải nghiệm và quy trình nghiệp vụ. Khi triển khai thật, mọi kiểm tra quyền
 * BẮT BUỘC phải được thực thi lại ở phía máy chủ — không bao giờ tin vào
 * trạng thái trong trình duyệt.
 */

export type Permission =
  | 'practice.basic'
  | 'practice.all'
  | 'solution.full'
  | 'mock.exam'
  | 'analytics.self'
  | 'analytics.deep'
  | 'roadmap.self'
  | 'track.both'
  | 'class.view'
  | 'class.assign'
  | 'class.grade'
  | 'class.unlock'
  | 'content.author'
  | 'report.export'
  | 'user.manage'
  | 'system.config';

export const PERMISSION_LABEL: Record<Permission, string> = {
  'practice.basic': 'Làm phiếu Level 1–2',
  'practice.all': 'Làm toàn bộ 2400 phiếu (mọi Level)',
  'solution.full': 'Xem lời giải chi tiết từng bước',
  'mock.exam': 'Thi thử tính giờ theo cấu trúc đề',
  'analytics.self': 'Xem thống kê tiến độ cá nhân',
  'analytics.deep': 'Phân tích sâu theo mạch & kỹ năng',
  'roadmap.self': 'Lộ trình cá nhân hoá',
  'track.both': 'Mở đồng thời cả hai luồng (Chuyên & THPT)',
  'class.view': 'Xem danh sách và tiến độ lớp',
  'class.assign': 'Giao nhiệm vụ cho học sinh',
  'class.grade': 'Chấm và nhận xét bài làm',
  'class.unlock': 'Mở khoá Level / Giai đoạn cho học sinh',
  'content.author': 'Biên soạn phiếu & chuyên đề',
  'report.export': 'Xuất báo cáo tiến độ',
  'user.manage': 'Quản lý tài khoản & phân quyền',
  'system.config': 'Cấu hình KPI và ngưỡng thăng cấp',
};

export type RoleId =
  | 'hs-thu'
  | 'hs-chuan'
  | 'hs-nang-cao'
  | 'hs-doi-tuyen'
  | 'gv-tro-giang'
  | 'gv-chinh'
  | 'gv-chu-nhiem'
  | 'quan-tri';

export type RoleGroup = 'hoc-sinh' | 'giao-vien' | 'quan-tri';

export interface Role {
  id: RoleId;
  group: RoleGroup;
  tier: number;
  name: string;
  shortName: string;
  description: string;
  /** Điều kiện để được xét lên cấp độ này. */
  criteria: string[];
  permissions: Permission[];
  /** Giới hạn định lượng gắn với cấp độ. */
  limits: { label: string; value: string }[];
  color: string;
}

const HS_BASE: Permission[] = ['practice.basic', 'analytics.self', 'roadmap.self'];

export const ROLES: Role[] = [
  {
    id: 'hs-thu',
    group: 'hoc-sinh',
    tier: 1,
    name: 'Học viên Trải nghiệm',
    shortName: 'HS · Trải nghiệm',
    description:
      'Tài khoản dùng thử. Được làm các phiếu nhập môn của giai đoạn 1 để hệ thống xác định trình độ.',
    criteria: ['Đăng ký tài khoản', 'Chưa hoàn thành bài test xếp lộ trình'],
    permissions: [...HS_BASE],
    limits: [
      { label: 'Phiếu được mở', value: '20 phiếu đầu của Giai đoạn 1' },
      { label: 'Lời giải', value: 'Chỉ xem gợi ý, không xem lời giải đầy đủ' },
      { label: 'Luồng', value: '1 luồng' },
    ],
    color: '#64748b',
  },
  {
    id: 'hs-chuan',
    group: 'hoc-sinh',
    tier: 2,
    name: 'Học viên Chuẩn',
    shortName: 'HS · Chuẩn',
    description:
      'Cấp độ chính của học sinh. Toàn quyền học theo lộ trình cá nhân hoá của luồng đã chọn.',
    criteria: [
      'Hoàn thành bài test xếp lộ trình',
      'Được xếp nhóm năng lực và có lộ trình cá nhân hoá',
    ],
    permissions: [...HS_BASE, 'practice.all', 'solution.full', 'mock.exam'],
    limits: [
      { label: 'Phiếu được mở', value: 'Toàn bộ phiếu của luồng đã chọn, theo tiến độ mở khoá' },
      { label: 'Lời giải', value: 'Đầy đủ từng bước sau khi nộp bài' },
      { label: 'Luồng', value: '1 luồng' },
    ],
    color: '#0f766e',
  },
  {
    id: 'hs-nang-cao',
    group: 'hoc-sinh',
    tier: 3,
    name: 'Học viên Nâng cao',
    shortName: 'HS · Nâng cao',
    description:
      'Dành cho học sinh đã đạt KPI ổn định, được mở phân tích sâu và học song song hai luồng.',
    criteria: [
      'Đạt KPI ≥ 90% ở tối thiểu 30 nhiệm vụ',
      'Đã hoàn thành ít nhất Giai đoạn 2 của luồng chính',
    ],
    permissions: [
      ...HS_BASE,
      'practice.all',
      'solution.full',
      'mock.exam',
      'analytics.deep',
      'track.both',
    ],
    limits: [
      { label: 'Phiếu được mở', value: 'Toàn bộ 2400 phiếu' },
      { label: 'Phân tích', value: 'Bản đồ năng lực theo mạch và theo kỹ năng' },
      { label: 'Luồng', value: 'Cả hai luồng' },
    ],
    color: '#4f46e5',
  },
  {
    id: 'hs-doi-tuyen',
    group: 'hoc-sinh',
    tier: 4,
    name: 'Học viên Đội tuyển',
    shortName: 'HS · Đội tuyển',
    description:
      'Nhóm mục tiêu top đầu KHTN / Ams. Được giáo viên giao nhiệm vụ riêng và theo dõi sát.',
    criteria: [
      'Đạt KPI ≥ 90% ở Giai đoạn 4 của luồng Chuyên',
      'Được giáo viên chủ nhiệm chuyên môn đề cử',
    ],
    permissions: [
      ...HS_BASE,
      'practice.all',
      'solution.full',
      'mock.exam',
      'analytics.deep',
      'track.both',
      'report.export',
    ],
    limits: [
      { label: 'Phiếu được mở', value: 'Toàn bộ, kể cả nhiệm vụ Thử thách vượt cấp' },
      { label: 'Báo cáo', value: 'Được xuất báo cáo tiến độ cá nhân' },
      { label: 'Kèm cặp', value: 'Có giáo viên phụ trách trực tiếp' },
    ],
    color: '#be123c',
  },
  {
    id: 'gv-tro-giang',
    group: 'giao-vien',
    tier: 1,
    name: 'Trợ giảng',
    shortName: 'GV · Trợ giảng',
    description:
      'Hỗ trợ theo dõi và chấm chữa. Không được thay đổi lộ trình hay mở khoá cấp độ của học sinh.',
    criteria: ['Được giáo viên chính hoặc quản trị viên thêm vào lớp'],
    permissions: [
      'practice.all',
      'solution.full',
      'analytics.self',
      'analytics.deep',
      'class.view',
      'class.grade',
    ],
    limits: [
      { label: 'Phạm vi', value: 'Các lớp được phân công' },
      { label: 'Giao nhiệm vụ', value: 'Không' },
      { label: 'Mở khoá cấp độ', value: 'Không' },
    ],
    color: '#0891b2',
  },
  {
    id: 'gv-chinh',
    group: 'giao-vien',
    tier: 2,
    name: 'Giáo viên',
    shortName: 'GV · Giáo viên',
    description:
      'Phụ trách lớp: giao nhiệm vụ, chấm chữa, mở khoá Level và theo dõi KPI toàn lớp.',
    criteria: ['Được phân công phụ trách ít nhất một lớp'],
    permissions: [
      'practice.all',
      'solution.full',
      'mock.exam',
      'analytics.self',
      'analytics.deep',
      'track.both',
      'class.view',
      'class.assign',
      'class.grade',
      'class.unlock',
      'report.export',
    ],
    limits: [
      { label: 'Phạm vi', value: 'Các lớp mình phụ trách' },
      { label: 'Mở khoá cấp độ', value: 'Có — cần ghi lý do, hệ thống lưu nhật ký' },
      { label: 'Biên soạn nội dung', value: 'Không' },
    ],
    color: '#4338ca',
  },
  {
    id: 'gv-chu-nhiem',
    group: 'giao-vien',
    tier: 3,
    name: 'Chủ nhiệm chuyên môn',
    shortName: 'GV · Chủ nhiệm CM',
    description:
      'Quản lý chuyên môn toàn khối: duyệt lộ trình, biên soạn ngân hàng phiếu, xem báo cáo tổng hợp.',
    criteria: ['Được quản trị viên bổ nhiệm'],
    permissions: [
      'practice.all',
      'solution.full',
      'mock.exam',
      'analytics.self',
      'analytics.deep',
      'track.both',
      'class.view',
      'class.assign',
      'class.grade',
      'class.unlock',
      'content.author',
      'report.export',
    ],
    limits: [
      { label: 'Phạm vi', value: 'Toàn bộ các lớp trong khối' },
      { label: 'Biên soạn nội dung', value: 'Có' },
      { label: 'Cấu hình hệ thống', value: 'Không' },
    ],
    color: '#b45309',
  },
  {
    id: 'quan-tri',
    group: 'quan-tri',
    tier: 4,
    name: 'Quản trị hệ thống',
    shortName: 'Quản trị',
    description:
      'Toàn quyền: quản lý tài khoản, phân quyền, cấu hình ngưỡng KPI và quy tắc thăng cấp.',
    criteria: ['Do tổ chức chỉ định, nên giới hạn ở 1–2 tài khoản'],
    permissions: Object.keys(PERMISSION_LABEL) as Permission[],
    limits: [
      { label: 'Phạm vi', value: 'Toàn hệ thống' },
      { label: 'Nhật ký', value: 'Mọi thao tác đều được ghi log' },
    ],
    color: '#0f172a',
  },
];

export const roleById = (id: RoleId) => ROLES.find((r) => r.id === id)!;
export const rolesByGroup = (g: RoleGroup) => ROLES.filter((r) => r.group === g);

export const ROLE_GROUP_LABEL: Record<RoleGroup, string> = {
  'hoc-sinh': 'Học sinh',
  'giao-vien': 'Giáo viên',
  'quan-tri': 'Quản trị',
};

/** Nhóm quyền để hiển thị bảng ma trận. */
export const PERMISSION_GROUPS: { name: string; items: Permission[] }[] = [
  {
    name: 'Học tập',
    items: ['practice.basic', 'practice.all', 'solution.full', 'mock.exam', 'track.both'],
  },
  { name: 'Theo dõi tiến độ', items: ['roadmap.self', 'analytics.self', 'analytics.deep'] },
  { name: 'Quản lý lớp', items: ['class.view', 'class.assign', 'class.grade', 'class.unlock'] },
  { name: 'Nội dung & báo cáo', items: ['content.author', 'report.export'] },
  { name: 'Hệ thống', items: ['user.manage', 'system.config'] },
];
