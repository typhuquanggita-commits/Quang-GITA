import type { Permission, Role } from '../types';

/**
 * HE THONG PHAN QUYEN HSA365
 *
 * Ba tang quyet dinh mot nguoi lam duoc gi:
 *
 *   1. VAI TRO (role)     — hoc vien, tro giang, giao vien, chu nhiem, quan tri.
 *   2. CAP BAC (rank)     — bac trong vai tro do; giao vien bac cao co them quyen.
 *   3. CAP DO HOC (level) — rieng hoc vien, mot so tinh nang mo dan theo cap do
 *                           de tranh vao de kho qua som.
 *
 * CANH BAO QUAN TRONG:
 * Day la lop kiem soat PHIA NGUOI DUNG. No quyet dinh giao dien hien gi va
 * chan cac thao tac nham lan, nhung KHONG PHAI la ranh gioi bao mat: bat ky ai
 * mo cong cu nha phat trien deu co the doi trang thai cuc bo. Khi trien khai
 * that, moi quyen o day phai duoc kiem tra LAI tren may chu — danh sach quyen
 * trong tep nay chinh la hop dong de may chu hien thuc hoa.
 */

export interface PermissionSpec {
  id: Permission;
  group: string;
  name: string;
  description: string;
}

/** Danh muc quyen. Day la nguon su that duy nhat cho ca giao dien lan may chu. */
export const PERMISSIONS: readonly PermissionSpec[] = [
  // Học tập
  { id: 'learn.worksheet', group: 'Học tập', name: 'Làm phiếu luyện', description: 'Truy cập và làm các phiếu luyện đã mở khóa.' },
  { id: 'learn.mock', group: 'Học tập', name: 'Thi thử theo phần', description: 'Làm đề thi thử một phần với đồng hồ thật.' },
  { id: 'learn.mockFull', group: 'Học tập', name: 'Thi thử full 3 phần', description: 'Làm đề mô phỏng đầy đủ 150 câu / 195 phút.' },
  { id: 'learn.review', group: 'Học tập', name: 'Sổ tay lỗi sai', description: 'Ôn tập ngắt quãng các câu từng sai.' },
  { id: 'learn.aiTutor', group: 'Học tập', name: 'Gia sư AI', description: 'Nhờ AI giảng lại, gợi ý và ra câu tương tự.' },
  { id: 'learn.analytics', group: 'Học tập', name: 'Phân tích năng lực', description: 'Xem biểu đồ năng lực và điểm dự báo của chính mình.' },
  { id: 'learn.skipLevel', group: 'Học tập', name: 'Nhảy cấp', description: 'Bỏ qua cấp hiện tại của một tuyến chuyên đề.' },

  // Lớp học
  { id: 'class.view', group: 'Lớp học', name: 'Xem danh sách lớp', description: 'Xem học viên và tiến độ trong lớp được phân công.' },
  { id: 'class.viewAll', group: 'Lớp học', name: 'Xem mọi lớp', description: 'Xem tiến độ của tất cả các lớp trong hệ thống.' },
  { id: 'class.assign', group: 'Lớp học', name: 'Giao nhiệm vụ', description: 'Giao phiếu luyện và nhiệm vụ cho học viên.' },
  { id: 'class.comment', group: 'Lớp học', name: 'Nhận xét bài làm', description: 'Viết nhận xét cho từng bài làm của học viên.' },
  { id: 'class.approveLevel', group: 'Lớp học', name: 'Duyệt lên cấp', description: 'Phê duyệt việc nâng cấp độ cho học viên đạt KPI.' },
  { id: 'class.approveStage', group: 'Lớp học', name: 'Duyệt lên giai đoạn', description: 'Phê duyệt chuyển giai đoạn khi KPI đạt từ 90%.' },
  { id: 'class.manage', group: 'Lớp học', name: 'Quản lý lớp', description: 'Tạo lớp, thêm và chuyển học viên giữa các lớp.' },

  // Nội dung
  { id: 'content.author', group: 'Nội dung', name: 'Biên soạn câu hỏi', description: 'Thêm và sửa câu hỏi trong ngân hàng đề.' },
  { id: 'content.review', group: 'Nội dung', name: 'Thẩm định nội dung', description: 'Duyệt câu hỏi trước khi đưa vào ngân hàng chính thức.' },
  { id: 'content.curriculum', group: 'Nội dung', name: 'Sửa khung chương trình', description: 'Thay đổi cấp độ, ngưỡng KPI và phân bổ phiếu luyện.' },
  { id: 'content.publish', group: 'Nội dung', name: 'Phát hành nội dung', description: 'Đưa nội dung đã thẩm định lên môi trường thật.' },

  // Hệ thống
  { id: 'system.users', group: 'Hệ thống', name: 'Quản lý người dùng', description: 'Tạo tài khoản, đổi vai trò và cấp bậc.' },
  { id: 'system.roles', group: 'Hệ thống', name: 'Cấu hình phân quyền', description: 'Thay đổi ma trận quyền của từng vai trò.' },
  { id: 'system.export', group: 'Hệ thống', name: 'Xuất dữ liệu', description: 'Xuất toàn bộ dữ liệu học tập ra tệp JSON.' },
  { id: 'system.audit', group: 'Hệ thống', name: 'Xem nhật ký', description: 'Xem lịch sử thao tác trong hệ thống.' },
];

export const PERMISSION_BY_ID = new Map(PERMISSIONS.map((p) => [p.id, p]));

export interface RankSpec {
  rank: number;
  name: string;
  note: string;
  /** Quyen duoc CONG THEM khi dat bac nay (cong don voi cac bac thap hon). */
  grants: readonly Permission[];
}

export interface RoleSpec {
  id: Role;
  name: string;
  summary: string;
  /** Quyen nen, moi bac deu co. */
  base: readonly Permission[];
  ranks: readonly RankSpec[];
}

/**
 * Vai tro va cap bac.
 *
 * Quyen cong don theo bac: bac 3 co tat ca quyen cua bac 1 va 2. Nho vay khong
 * bao gio xay ra tinh huong "len bac lai mat quyen" — mot loi rat hay gap khi
 * moi bac duoc liet ke doc lap.
 */
export const ROLES: readonly RoleSpec[] = [
  {
    id: 'student',
    name: 'Học viên',
    summary:
      'Người học. Tính năng mở dần theo cấp độ để không bị đẩy vào đề khó quá sớm và không bỏ qua phần nền.',
    base: ['learn.worksheet', 'learn.review', 'learn.analytics', 'system.export'],
    ranks: [
      { rank: 1, name: 'Học viên — Giai đoạn Nền tảng', note: 'Cấp 1–2. Tập trung phiếu luyện và sổ tay lỗi sai.', grants: [] },
      {
        rank: 2,
        name: 'Học viên — Giai đoạn Tăng tốc',
        note: 'Cấp 3–4. Mở thi thử theo phần và Gia sư AI.',
        grants: ['learn.mock', 'learn.aiTutor'],
      },
      {
        rank: 3,
        name: 'Học viên — Giai đoạn Bứt phá',
        note: 'Cấp 5–6. Mở đề full 3 phần và quyền tự nhảy cấp ở tuyến đã thành thạo.',
        grants: ['learn.mockFull', 'learn.skipLevel'],
      },
    ],
  },
  {
    id: 'mentor',
    name: 'Trợ giảng',
    summary: 'Theo sát một lớp: xem tiến độ, nhắc nhiệm vụ và nhận xét bài làm. Không đổi được khung chương trình.',
    base: [
      'learn.worksheet',
      'learn.mock',
      'learn.review',
      'learn.analytics',
      'learn.aiTutor',
      'class.view',
      'class.comment',
      'system.export',
    ],
    ranks: [
      { rank: 1, name: 'Trợ giảng', note: 'Xem tiến độ lớp và nhận xét bài làm.', grants: [] },
      { rank: 2, name: 'Trợ giảng chính', note: 'Được giao nhiệm vụ cho học viên trong lớp.', grants: ['class.assign'] },
    ],
  },
  {
    id: 'teacher',
    name: 'Giáo viên',
    summary:
      'Phụ trách chuyên môn của lớp: giao nhiệm vụ, duyệt lên cấp, biên soạn câu hỏi. Bậc cao được duyệt chuyển giai đoạn.',
    base: [
      'learn.worksheet',
      'learn.mock',
      'learn.mockFull',
      'learn.review',
      'learn.analytics',
      'learn.aiTutor',
      'class.view',
      'class.assign',
      'class.comment',
      'system.export',
    ],
    ranks: [
      { rank: 1, name: 'Giáo viên', note: 'Giao nhiệm vụ và nhận xét trong lớp phụ trách.', grants: [] },
      {
        rank: 2,
        name: 'Giáo viên chính',
        note: 'Thêm quyền duyệt lên cấp và biên soạn câu hỏi.',
        grants: ['class.approveLevel', 'content.author'],
      },
      {
        rank: 3,
        name: 'Giáo viên cao cấp',
        note: 'Thêm quyền duyệt chuyển giai đoạn và quản lý lớp.',
        grants: ['class.approveStage', 'class.manage', 'content.review'],
      },
    ],
  },
  {
    id: 'headTeacher',
    name: 'Chủ nhiệm chuyên môn',
    summary: 'Chịu trách nhiệm chất lượng nội dung và chuẩn đầu ra của toàn bộ chương trình.',
    base: [
      'learn.worksheet',
      'learn.mock',
      'learn.mockFull',
      'learn.review',
      'learn.analytics',
      'learn.aiTutor',
      'class.view',
      'class.viewAll',
      'class.assign',
      'class.comment',
      'class.approveLevel',
      'class.approveStage',
      'class.manage',
      'content.author',
      'content.review',
      'system.export',
    ],
    ranks: [
      { rank: 1, name: 'Chủ nhiệm chuyên môn', note: 'Thẩm định nội dung và theo dõi mọi lớp.', grants: [] },
      {
        rank: 2,
        name: 'Chủ nhiệm chương trình',
        note: 'Thêm quyền sửa khung chương trình và phát hành nội dung.',
        grants: ['content.curriculum', 'content.publish', 'system.audit'],
      },
    ],
  },
  {
    id: 'admin',
    name: 'Quản trị hệ thống',
    summary: 'Toàn quyền kỹ thuật: tài khoản, ma trận phân quyền và nhật ký thao tác.',
    base: PERMISSIONS.map((p) => p.id),
    ranks: [{ rank: 1, name: 'Quản trị hệ thống', note: 'Toàn quyền.', grants: [] }],
  },
];

export const ROLE_BY_ID = new Map(ROLES.map((r) => [r.id, r]));

/**
 * Quyen mo them theo CAP DO HOC cua hoc vien.
 * Chi ap dung cho vai tro `student`; cac vai tro khac khong bi cap do chan.
 */
export const STUDENT_LEVEL_GRANTS: ReadonlyArray<{ level: number; grants: readonly Permission[] }> = [
  { level: 3, grants: ['learn.mock', 'learn.aiTutor'] },
  { level: 5, grants: ['learn.mockFull'] },
  { level: 6, grants: ['learn.skipLevel'] },
];
