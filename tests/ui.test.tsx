import { describe, expect, it, beforeEach, vi } from 'vitest';
import { PERMISSIONS } from '../src/data/roles';
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

beforeEach(() => {
  window.location.hash = '#/';
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

  it('điều hướng bằng hash đổi đúng màn hình', async () => {
    renderApp();
    window.location.hash = '#/roles';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(await screen.findByRole('heading', { level: 1, name: 'Phân quyền hệ thống' })).toBeInTheDocument();
  });

  it('đường dẫn không tồn tại hiện trang 404 thay vì màn hình trắng', async () => {
    renderApp();
    window.location.hash = '#/khong-ton-tai';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(await screen.findByText('404')).toBeInTheDocument();
  });
});

describe('phân quyền trên giao diện', () => {
  it('học viên mới bị chặn đề full 3 phần và được giải thích lý do', async () => {
    renderApp();
    window.location.hash = '#/exam';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(await screen.findByText('Đề full 3 phần chưa mở')).toBeInTheDocument();
  });

  it('đổi vai trò sang Super Admin thì mở đủ mọi quyền', async () => {
    const user = userEvent.setup();
    const state = createInitialState();
    state.profile = { ...state.profile, role: 'superAdmin', rank: 1 };
    renderApp(state);

    window.location.hash = '#/roles';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    const heading = await screen.findByRole('heading', { level: 1, name: 'Phân quyền hệ thống' });
    expect(heading).toBeInTheDocument();
    // Lay tu danh muc quyen thay vi go cung con so — them quyen moi thi test
    // van dung thay vi hong mot cach vo nghia.
    const total = PERMISSIONS.length;
    expect(screen.getByText(`${total}/${total}`)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /Thi thử/ }));
  });
});

describe('phiếu luyện', () => {
  it('mở đúng phiếu theo mã và hiện lời giao nhiệm vụ trước khi làm', async () => {
    renderApp();
    window.location.hash = '#/worksheet?id=PL-TOA-ARI-L1-001';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(await screen.findByText(/Nhiệm vụ NV-/)).toBeInTheDocument();
    expect(screen.getByText('Bạn sẽ đi qua 3 chặng')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bắt đầu chặng 1' })).toBeInTheDocument();
  });

  it('mã phiếu sai không làm hỏng ứng dụng', async () => {
    renderApp();
    window.location.hash = '#/worksheet?id=KHONG-CO-THAT';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(await screen.findByText('Không tìm thấy phiếu luyện')).toBeInTheDocument();
  });

  it('làm được chặng 1: chọn phương án rồi đi tiếp', async () => {
    const user = userEvent.setup();
    renderApp();
    window.location.hash = '#/worksheet?id=PL-TOA-ARI-L1-001';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

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
