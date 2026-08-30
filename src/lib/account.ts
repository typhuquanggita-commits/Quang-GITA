import type { AppState } from '@/types';
import type { Permission, RoleId } from '@/data/roles';
import { currentRole } from '@/lib/auth';

/**
 * ĐIỂM CẮM TÀI KHOẢN
 *
 * Vì sao tệp này tồn tại: MATH365 hiện chạy hoàn toàn trên trình duyệt, dữ liệu
 * nằm trong localStorage của từng máy. Nghĩa là hiện chưa có đăng nhập thật và
 * chưa có ranh giới trả phí thật — mọi kiểm tra quyền trong ứng dụng chỉ để
 * dựng giao diện cho gọn, không ngăn được ai cả.
 *
 * Thay vì rải các câu lệnh kiểm tra quyền khắp nơi rồi sau này phải đi sửa từng
 * chỗ, toàn bộ câu hỏi "người này là ai và được mở những gì" được gom về đúng
 * một giao diện `AccountProvider`. Khi có máy chủ, chỉ cần viết một provider mới
 * gọi API và đổi một dòng ở cuối tệp này.
 *
 * Đặc tả đầy đủ của phần máy chủ: docs/DANG-NHAP-VA-PHAN-QUYEN.md
 */

/** Ba gói học. Gói quyết định nội dung được mở, độc lập với vai trò. */
export type PlanId = 'ngoai' | 'hoc-phi' | 'hoc-phi-chuyen';

export const PLAN_LABEL: Record<PlanId, { label: string; short: string; color: string; desc: string }> = {
  ngoai: {
    label: 'Học sinh ngoài',
    short: 'Ngoài',
    color: '#94A3B8',
    desc: 'Toàn bộ trang nội dung công khai, phiếu luyện Level 1–2, 20 đề đầu mỗi khối và lời giải rút gọn.',
  },
  'hoc-phi': {
    label: 'Học viên đóng phí',
    short: 'Đóng phí',
    color: '#1B4F9C',
    desc: 'Toàn bộ phiếu luyện mọi Level, trọn 700 đề luyện, lời giải chi tiết, lộ trình cá nhân hoá, báo cáo tuần và nhận bài giao từ giáo viên.',
  },
  'hoc-phi-chuyen': {
    label: 'Học viên lớp chuyên sâu',
    short: 'Chuyên sâu',
    color: '#E01B24',
    desc: 'Như gói đóng phí, cộng kho chuyên và đội tuyển, cộng các module nâng cao.',
  },
};

/** Quyền phụ thuộc gói học, không phụ thuộc vai trò. */
const PLAN_PERMISSIONS: Record<PlanId, Permission[]> = {
  ngoai: ['practice.basic', 'analytics.self', 'roadmap.self'],
  'hoc-phi': ['practice.basic', 'practice.all', 'solution.full', 'mock.exam', 'analytics.self', 'analytics.deep', 'roadmap.self'],
  'hoc-phi-chuyen': [
    'practice.basic',
    'practice.all',
    'solution.full',
    'mock.exam',
    'analytics.self',
    'analytics.deep',
    'roadmap.self',
    'track.both',
  ],
};

export interface AccountInfo {
  /** Mã tài khoản; ở chế độ trên máy thì là một mã cục bộ, không phải danh tính thật. */
  id: string;
  displayName: string;
  roleId: RoleId;
  plan: PlanId;
  /** Ngày hết hạn gói, dạng YYYY-MM-DD; không có nghĩa là không hết hạn. */
  planEndsAt?: string;
  /** Đã đăng nhập bằng tài khoản trên máy chủ hay chưa. */
  authenticated: boolean;
}

/**
 * Giao diện duy nhất mà phần còn lại của ứng dụng được phép hỏi về tài khoản.
 * Mọi cài đặt — trên máy hay qua máy chủ — đều phải trả lời đủ các câu hỏi này.
 */
export interface AccountProvider {
  /** Tên cài đặt, để hiển thị trung thực với người dùng. */
  readonly kind: 'local' | 'remote';
  /** Cài đặt này có thực sự kiểm soát được truy cập hay không. */
  readonly enforces: boolean;
  current(state: AppState): AccountInfo;
  /** Người này có quyền đó không — hợp cả vai trò lẫn gói học. */
  can(state: AppState, permission: Permission): boolean;
  /** Vì sao bị khoá, viết thành câu để hiển thị thẳng cho người dùng. */
  reasonDenied(state: AppState, permission: Permission): string | null;
}

/* ============================================================
   CÀI ĐẶT TRÊN MÁY — mặc định hiện nay
   ============================================================ */

const localPlan = (state: AppState): PlanId => {
  /* Chưa có máy chủ nên không có dữ liệu học phí thật. Mọi người dùng ở chế độ
     này đều được coi là học viên đóng phí, để trải nghiệm thử không bị chặn.
     Đây chính là lý do cài đặt này KHÔNG kiểm soát được truy cập. */
  return currentRole(state).id === 'hs-doi-tuyen' ? 'hoc-phi-chuyen' : 'hoc-phi';
};

export const localAccountProvider: AccountProvider = {
  kind: 'local',
  enforces: false,

  current(state) {
    const plan = localPlan(state);
    return {
      id: 'local',
      displayName: state.profile?.name ?? 'Học viên MATH365',
      roleId: currentRole(state).id,
      plan,
      authenticated: false,
    };
  },

  can(state, permission) {
    const role = currentRole(state);
    const plan = localPlan(state);
    const byRole = role.permissions.includes(permission);
    const planScoped = (Object.values(PLAN_PERMISSIONS).flat() as Permission[]).includes(permission);
    /* Quyền thuộc nhóm gói học thì xét theo gói; các quyền còn lại xét theo vai trò. */
    return planScoped ? PLAN_PERMISSIONS[plan].includes(permission) && byRole : byRole;
  },

  reasonDenied(state, permission) {
    if (this.can(state, permission)) return null;
    const role = currentRole(state);
    if (!role.permissions.includes(permission)) {
      return `Quyền này thuộc vai trò cao hơn vai trò hiện tại (${role.shortName}).`;
    }
    return 'Quyền này thuộc gói học chưa được mở cho tài khoản hiện tại.';
  },
};

/* ============================================================
   CHỌN CÀI ĐẶT
   ============================================================ */

/**
 * Khi có máy chủ: viết `remoteAccountProvider` cài đặt cùng giao diện trên rồi
 * đổi đúng dòng dưới đây. Không cần sửa bất kỳ trang nào khác.
 */
export const account: AccountProvider = localAccountProvider;

/** Câu cảnh báo hiển thị cho người dùng khi cài đặt hiện tại không kiểm soát được truy cập. */
export const ACCESS_NOTICE =
  account.enforces
    ? null
    : 'Phiên bản hiện tại chạy hoàn toàn trên trình duyệt của bạn: chưa có đăng nhập bằng tài khoản, và bảng phân quyền dưới đây chỉ dùng để dựng giao diện chứ không kiểm soát được truy cập. Muốn chặn nội dung theo gói học và đồng bộ tiến độ giữa nhiều thiết bị thì bắt buộc phải có máy chủ — đặc tả kỹ thuật nằm ở docs/DANG-NHAP-VA-PHAN-QUYEN.md trong kho mã.';
