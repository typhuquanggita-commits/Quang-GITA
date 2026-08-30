import { describe, expect, it, beforeEach, vi } from 'vitest';
import { PERMISSIONS, ROLES } from '../src/data/roles';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../src/App';
import { AppStoreProvider } from '../src/store/AppStore';
import { ToastProvider } from '../src/components/ui/primitives';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { createInitialState } from '../src/lib/storage';
import type { PersistedState } from '../src/types';

function renderApp(state?: PersistedState) {
  return render(
    <AppStoreProvider initialState={state ?? createInitialState()}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppStoreProvider>,
  );
}

/**
 * Dieu huong trong test.
 *
 * Ung dung nay dung History API khi chay tren http (jsdom la http://localhost),
 * va chi lui ve hash khi mo bang file://. Nen test phai dieu huong dung cach
 * ung dung that dieu huong — dung hash o day se test mot duong di ma nguoi
 * dung khong bao gio di.
 */
function goTo(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('hsa365:route'));
}

beforeEach(() => {
  window.history.replaceState(null, '', '/');
  localStorage.clear();
  sessionStorage.clear();
});

describe('khung ứng dụng', () => {
  it('dựng được màn hình tổng quan cho người dùng mới', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Chào');
    expect(screen.getByRole('navigation', { name: 'Điều hướng chính' })).toBeInTheDocument();
    // Không có dữ liệu vẫn phải có việc để làm ngay.
    expect(screen.getByText('Việc của hôm nay')).toBeInTheDocument();
  });

  it('có liên kết bỏ qua điều hướng cho người dùng bàn phím', () => {
    renderApp();
    expect(screen.getByText('Bỏ qua điều hướng, đến nội dung chính')).toHaveAttribute('href', '#main');
  });

  it('điều hướng đổi đúng màn hình và đổi luôn đường dẫn thật', async () => {
    renderApp();
    goTo('/roles');
    expect(await screen.findByRole('heading', { level: 1, name: 'Phân quyền hệ thống' })).toBeInTheDocument();
  });

  it('đường dẫn không tồn tại hiện trang 404 thay vì màn hình trắng', async () => {
    renderApp();
    goTo('/khong-ton-tai');
    expect(await screen.findByText('404')).toBeInTheDocument();
  });
});

describe('phân quyền trên giao diện', () => {
  it('học viên mới bị chặn đề full 3 phần và được giải thích lý do', async () => {
    renderApp();
    goTo('/exam');
    expect(await screen.findByText('Đề full 3 phần chưa mở')).toBeInTheDocument();
  });

  it('đổi vai trò sang Super Admin thì mở đủ mọi quyền', async () => {
    const user = userEvent.setup();
    const state = createInitialState();
    state.profile = { ...state.profile, role: 'superAdmin', rank: 1 };
    renderApp(state);

    goTo('/roles');

    const heading = await screen.findByRole('heading', { level: 1, name: 'Phân quyền hệ thống' });
    expect(heading).toBeInTheDocument();
    // Lay tu danh muc quyen thay vi go cung con so — them quyen moi thi test
    // van dung thay vi hong mot cach vo nghia.
    const total = PERMISSIONS.length;
    expect(screen.getByText(`${total}/${total}`)).toBeInTheDocument();

    // Man hinh Phan quyen vua la cong cu vua la tai lieu: no phai in ra du moi
    // vai tro ma ma nguon dang dung, khong duoc thieu vai tro nao.
    for (const role of ROLES) {
      expect(screen.getAllByText(role.name).length, role.id).toBeGreaterThan(0);
    }
    await user.click(screen.getByRole('link', { name: /Thi thử/ }));
  });
});

describe('phiếu luyện', () => {
  it('mở đúng phiếu theo mã và hiện lời giao nhiệm vụ trước khi làm', async () => {
    renderApp();
    goTo('/worksheet?id=PL-TOA-ARI-L1-001');

    expect(await screen.findByText(/Nhiệm vụ NV-/)).toBeInTheDocument();
    expect(screen.getByText('Bạn sẽ đi qua 3 chặng')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bắt đầu chặng 1' })).toBeInTheDocument();
  });

  it('mã phiếu sai không làm hỏng ứng dụng', async () => {
    renderApp();
    goTo('/worksheet?id=KHONG-CO-THAT');
    expect(await screen.findByText('Không tìm thấy phiếu luyện')).toBeInTheDocument();
  });

  it('làm được chặng 1: chọn phương án rồi đi tiếp', async () => {
    const user = userEvent.setup();
    renderApp();
    goTo('/worksheet?id=PL-TOA-ARI-L1-001');

    await user.click(await screen.findByRole('button', { name: 'Bắt đầu chặng 1' }));
    const group = await screen.findByRole('radiogroup', { name: /Phương án cho câu 1/ });
    const options = within(group).getAllByRole('radio');
    expect(options.length).toBe(4);

    await user.click(options[0] as HTMLElement);
    expect(options[0]).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('button', { name: /Câu tiếp theo|Sang chặng/ })).toBeInTheDocument();
  });
});

describe('ranh giới lỗi', () => {
  it('lỗi hiển thị cho ra đường thoát chứ không phải màn hình trắng', () => {
    // React in loi ra console khi mot component nem — chan lai de ban ghi test
    // khong bi lap day boi mot loi ma chinh test nay co y tao ra.
    const quiet = vi.spyOn(console, 'error').mockImplementation(() => {});

    function Broken(): never {
      throw new Error('hỏng có chủ đích');
    }

    render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('HSA365 gặp lỗi hiển thị');
    // Nut dau tien phai la cuu du lieu, truoc ca tai lai trang.
    expect(screen.getByRole('button', { name: 'Tải dữ liệu về máy' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tải lại trang' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Đặt lại dữ liệu' })).toBeInTheDocument();

    quiet.mockRestore();
  });
});

describe('không gian làm việc', () => {
  it('học viên bị chặn nhưng vẫn có tiêu đề cấp 1 và lời giải thích', async () => {
    renderApp();
    goTo('/workspace');

    // Cho dung tieu de can tim: man hinh nap dong nen h1 cua trang truoc van
    // con o do trong vai nhip dau.
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Không gian làm việc chưa mở' }),
    ).toBeInTheDocument();
    // Mot cho khoa khong giai thich duoc cach mo la trai nguyen tac cua he thong.
    expect(screen.getByText(/Chỉ các vai trò sau|Cần bậc|Mở khóa khi/)).toBeInTheDocument();
  });

  it('giáo viên mở được bảng lớp và được nói rõ đây là ảnh chụp, không phải trực tuyến', async () => {
    const state = createInitialState();
    state.profile = { ...state.profile, role: 'teacher', rank: 3 };
    renderApp(state);

    goTo('/workspace');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Không gian làm việc' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ảnh chụp tại thời điểm học viên xuất tệp/)).toBeInTheDocument();
  });
});

describe('báo cáo gia đình', () => {
  it('luôn nêu ba việc gia đình làm được, không chỉ nêu điểm số', async () => {
    renderApp();
    goTo('/report');

    expect(await screen.findByRole('heading', { level: 1, name: /Báo cáo học tập/ })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Ba việc gia đình làm được tuần này' }),
    ).toBeInTheDocument();
  });
});

describe('đề cương và chứng chỉ', () => {
  it('đề cương luôn dựng được và có tiêu đề cấp 1', async () => {
    renderApp();
    goTo('/de-cuong');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Đề cương 32 tuần' }),
    ).toBeInTheDocument();
  });

  it('trang chứng chỉ có tiêu đề cấp 1 ngay cả khi chưa đạt bậc nào', async () => {
    // Truoc khi sua, ca trang khong co h1 nao khi nguoi hoc chua dat bac —
    // nguoi dung trinh doc man hinh khong biet minh dang o dau.
    renderApp();
    goTo('/chung-chi');
    expect(
      await screen.findByRole('heading', { level: 1, name: /Kỳ thi cấp chứng chỉ/ }),
    ).toBeInTheDocument();
    // Va chi co DUNG MOT h1 tren trang.
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
