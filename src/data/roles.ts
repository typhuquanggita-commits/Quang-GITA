import type { Permission, Role } from '../types';

/**
 * HE THONG PHAN QUYEN HSA365
 *
 * Ba tang quyet dinh mot nguoi lam duoc gi:
 *
 *   1. VAI TRO (role)     — 10 vai tro, chia hai ho: chuyen mon va van hanh.
 *   2. CAP BAC (rank)     — bac trong vai tro do; giao vien bac cao co them quyen.
 *   3. CAP DO HOC (level) — rieng hoc vien, mot so tinh nang mo dan theo cap do
 *                           de tranh vao de kho qua som.
 *
 * NGUYEN TAC DAC QUYEN TOI THIEU:
 * Moi vai tro chi giu dung quyen can de lam viec cua no. Cu the:
 *   - Admin he thong lo tai khoan va nhat ky, KHONG sua duoc noi dung hay diem.
 *   - Admin san pham lo noi dung va chuong trinh, KHONG tao duoc tai khoan.
 *   - Giam doc dieu hanh CHI DOC: xem duoc moi bao cao, khong ghi bat cu dau.
 *   - Chi Super Admin giu dong thoi ca hai phia, va giu rieng quyen nguy hiem.
 * Tach nhu vay de mot tai khoan bi chiem doat khong keo theo toan bo he thong.
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

  // Huấn luyện GITA
  { id: 'coach.session', group: 'Huấn luyện GITA', name: 'Ghi buổi huấn luyện', description: 'Ghi nhận nội dung và cam kết sau mỗi buổi huấn luyện GITA.' },
  { id: 'coach.habit', group: 'Huấn luyện GITA', name: 'Thiết kế thói quen', description: 'Giao và theo dõi bộ thói quen theo bốn trụ GITA cho người học.' },
  { id: 'coach.plan', group: 'Huấn luyện GITA', name: 'Kê lộ trình cá nhân', description: 'Điều chỉnh lộ trình cá nhân hóa dựa trên hồ sơ năng lực.' },

  // Tư vấn
  { id: 'consult.profile', group: 'Tư vấn', name: 'Xem hồ sơ tư vấn', description: 'Xem hồ sơ năng lực tổng hợp của người được phân công tư vấn.' },
  { id: 'consult.roadmap', group: 'Tư vấn', name: 'Đề xuất lộ trình', description: 'Lập và gửi đề xuất lộ trình học cho người học và gia đình.' },

  // Báo cáo
  { id: 'report.org', group: 'Báo cáo', name: 'Báo cáo toàn hệ thống', description: 'Xem báo cáo tổng hợp về tiến độ và kết quả của toàn bộ tổ chức.' },
  { id: 'report.quality', group: 'Báo cáo', name: 'Báo cáo chất lượng nội dung', description: 'Xem độ phủ ngân hàng câu hỏi, tỉ lệ sai theo câu và cảnh báo chất lượng.' },

  // Hệ thống
  { id: 'system.users', group: 'Hệ thống', name: 'Quản lý người dùng', description: 'Tạo tài khoản, đổi vai trò và cấp bậc.' },
  { id: 'system.roles', group: 'Hệ thống', name: 'Cấu hình phân quyền', description: 'Thay đổi ma trận quyền của từng vai trò.' },
  { id: 'system.export', group: 'Hệ thống', name: 'Xuất dữ liệu', description: 'Xuất toàn bộ dữ liệu học tập ra tệp JSON.' },
  { id: 'system.audit', group: 'Hệ thống', name: 'Xem nhật ký', description: 'Xem lịch sử thao tác trong hệ thống.' },
  { id: 'system.danger', group: 'Hệ thống', name: 'Thao tác nguy hiểm', description: 'Xóa sạch dữ liệu, khôi phục bản sao lưu, đặt lại toàn hệ thống.' },
];

export const PERMISSION_BY_ID = new Map(PERMISSIONS.map((p) => [p.id, p]));

export interface RankSpec {
  rank: number;
  name: string;
  note: string;
  /** Quyen duoc CONG THEM khi dat bac nay (cong don voi cac bac thap hon). */
  grants: readonly Permission[];
}

export type RoleFamily = 'Chuyên môn' | 'Vận hành';

export interface RoleSpec {
  id: Role;
  name: string;
  /** Ten ngan cho cot bang ma tran — bang 10 vai tro rat de tran chieu ngang. */
  short: string;
  family: RoleFamily;
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
    short: 'Học viên',
    family: 'Chuyên môn',
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
    short: 'Trợ giảng',
    family: 'Chuyên môn',
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
    short: 'Giáo viên',
    family: 'Chuyên môn',
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
        note: 'Thêm quyền duyệt lên cấp, biên soạn câu hỏi và thiết kế thói quen GITA.',
        grants: ['class.approveLevel', 'content.author', 'coach.habit'],
      },
      {
        rank: 3,
        name: 'Giáo viên cao cấp',
        note: 'Thêm quyền duyệt chuyển giai đoạn, quản lý lớp và dẫn buổi huấn luyện GITA.',
        grants: ['class.approveStage', 'class.manage', 'content.review', 'coach.session', 'coach.plan'],
      },
    ],
  },
  {
    id: 'coach',
    name: 'Coach GITA',
    short: 'Coach',
    family: 'Chuyên môn',
    summary:
      'Phụ trách phần con người của việc học: mục tiêu, động lực, thói quen và kỷ luật hành động. Coach không thay giáo viên dạy kiến thức, nhưng là người giữ nhịp cho cả bốn trụ GITA.',
    base: [
      'learn.worksheet',
      'learn.mock',
      'learn.review',
      'learn.analytics',
      'learn.aiTutor',
      'class.view',
      'class.comment',
      'coach.session',
      'coach.habit',
      'system.export',
    ],
    ranks: [
      { rank: 1, name: 'Coach', note: 'Huấn luyện theo lớp: ghi buổi huấn luyện và thiết kế thói quen.', grants: [] },
      {
        rank: 2,
        name: 'Coach chính',
        note: 'Thêm quyền kê lộ trình cá nhân và giao nhiệm vụ.',
        grants: ['coach.plan', 'class.assign'],
      },
      {
        rank: 3,
        name: 'Coach trưởng',
        note: 'Thêm quyền theo dõi mọi lớp và duyệt lên cấp cho học viên đạt KPI.',
        grants: ['class.viewAll', 'class.approveLevel'],
      },
    ],
  },
  {
    id: 'consultant',
    name: 'Tư vấn',
    short: 'Tư vấn',
    family: 'Chuyên môn',
    summary:
      'Cửa vào của hệ thống: đọc hồ sơ năng lực và đề xuất lộ trình phù hợp cho người học cùng gia đình. Không chấm bài, không sửa nội dung — lời tư vấn phải dựa trên dữ liệu chứ không tạo ra dữ liệu.',
    base: [
      'learn.worksheet',
      'learn.analytics',
      'class.view',
      'consult.profile',
      'coach.session',
      'system.export',
    ],
    ranks: [
      { rank: 1, name: 'Chuyên viên tư vấn', note: 'Đọc hồ sơ năng lực của người được phân công.', grants: [] },
      {
        rank: 2,
        name: 'Tư vấn cao cấp',
        note: 'Thêm quyền lập đề xuất lộ trình, kê lộ trình cá nhân và xem báo cáo toàn hệ thống.',
        grants: ['consult.roadmap', 'coach.plan', 'class.viewAll', 'report.org'],
      },
    ],
  },
  {
    id: 'headTeacher',
    name: 'Chủ nhiệm chuyên môn',
    short: 'Chủ nhiệm',
    family: 'Chuyên môn',
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
      'coach.session',
      'coach.habit',
      'coach.plan',
      'consult.profile',
      'consult.roadmap',
      'report.quality',
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
    id: 'productAdmin',
    name: 'Admin sản phẩm',
    short: 'Admin SP',
    family: 'Vận hành',
    summary:
      'Chịu trách nhiệm nội dung và khung chương trình trên môi trường thật. Không tạo được tài khoản và không chấm bài — quyền của sản phẩm tách khỏi quyền của con người.',
    base: [
      'learn.worksheet',
      'learn.mock',
      'learn.mockFull',
      'learn.review',
      'learn.analytics',
      'learn.aiTutor',
      'class.viewAll',
      'content.author',
      'content.review',
      'content.curriculum',
      'report.org',
      'report.quality',
      'system.export',
    ],
    ranks: [
      { rank: 1, name: 'Admin sản phẩm', note: 'Biên soạn, thẩm định và sửa khung chương trình.', grants: [] },
      {
        rank: 2,
        name: 'Giám đốc sản phẩm',
        note: 'Thêm quyền phát hành nội dung ra môi trường thật và xem nhật ký.',
        grants: ['content.publish', 'system.audit'],
      },
    ],
  },
  {
    id: 'sysAdmin',
    name: 'Admin hệ thống',
    short: 'Admin HT',
    family: 'Vận hành',
    summary:
      'Lo tài khoản, phân quyền và nhật ký. Cố ý KHÔNG có quyền sửa nội dung hay duyệt tiến độ: người giữ chìa khóa không đồng thời là người chấm bài.',
    base: ['learn.worksheet', 'class.viewAll', 'report.org', 'system.users', 'system.export', 'system.audit'],
    ranks: [
      { rank: 1, name: 'Admin hệ thống', note: 'Quản lý tài khoản và đọc nhật ký thao tác.', grants: [] },
      {
        rank: 2,
        name: 'Trưởng quản trị hệ thống',
        note: 'Thêm quyền cấu hình ma trận phân quyền của từng vai trò.',
        grants: ['system.roles'],
      },
    ],
  },
  {
    id: 'executive',
    name: 'Giám đốc điều hành',
    short: 'GĐ điều hành',
    family: 'Vận hành',
    summary:
      'Góc nhìn toàn tổ chức, CHỈ ĐỌC. Xem được mọi báo cáo và nhật ký nhưng không ghi ở bất cứ đâu — nhờ vậy tài khoản cấp cao nhất về tổ chức lại là tài khoản ít rủi ro nhất về dữ liệu.',
    base: ['class.viewAll', 'report.org', 'report.quality', 'system.audit', 'system.export'],
    ranks: [{ rank: 1, name: 'Giám đốc điều hành', note: 'Đọc toàn bộ báo cáo, không sửa dữ liệu.', grants: [] }],
  },
  {
    id: 'superAdmin',
    name: 'Super Admin',
    short: 'Super Admin',
    family: 'Vận hành',
    summary:
      'Toàn quyền, kể cả các thao tác nguy hiểm. Đây phải là vai trò hiếm nhất trong hệ thống: mỗi tài khoản Super Admin là một điểm sập duy nhất.',
    base: PERMISSIONS.map((p) => p.id),
    ranks: [{ rank: 1, name: 'Super Admin', note: 'Toàn quyền, gồm cả thao tác nguy hiểm.', grants: [] }],
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
