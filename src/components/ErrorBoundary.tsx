import { Component, type ErrorInfo, type ReactNode } from 'react';
import { STORAGE_KEY } from '../config';
import { exportState, loadState } from '../lib/storage';

/**
 * RANH GIOI LOI
 *
 * Khong co lop nay thi mot loi render bat ky se de lai mot man hinh trang. Voi
 * mot ung dung luu toan bo tien do trong localStorage, man hinh trang la tinh
 * huong te nhat co the: nguoi hoc khong hieu chuyen gi xay ra, khong lay lai
 * duoc du lieu, va rat de xoa sach du lieu trinh duyet de "cho no chay lai".
 *
 * Nen o day, truoc khi noi gi khac, phai cho ho DUONG RA:
 *   1. Tai du lieu ve may — luon la nut dau tien.
 *   2. Tai lai trang — phan lon loi render la loi mot lan.
 *   3. Dat lai du lieu — chi khi hai cach tren khong an thua, va noi ro hau qua.
 */
interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // Ghi ra console de nguoi phat trien con dau vet; khong gui di dau ca.
    console.error('HSA365 gặp lỗi hiển thị:', error, info.componentStack);
  }

  private download = (): void => {
    try {
      const json = exportState(loadState());
      const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `hsa365-cuu-ho-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      // Neu chinh viec doc du lieu cung hong thi khong con gi de cuu — de nguoi
      // dung dung hai nut con lai.
    }
  };

  private reset = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* che do rieng tu: khong xoa duoc thi tai lai van la buoc dung */
    }
    location.reload();
  };

  override render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="grid min-h-dvh place-items-center bg-canvas p-6">
        <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-fg">HSA365 gặp lỗi hiển thị</h1>
          <p className="mt-2 text-sm text-fg-muted">
            Tiến độ của bạn vẫn nằm trong trình duyệt và chưa mất. Hãy tải dữ liệu về máy trước, rồi thử tải lại
            trang.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={this.download}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white"
            >
              Tải dữ liệu về máy
            </button>
            <button
              type="button"
              onClick={() => location.reload()}
              className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-fg"
            >
              Tải lại trang
            </button>
            <button
              type="button"
              onClick={this.reset}
              className="rounded-lg border border-bad/40 px-4 py-2 text-sm font-medium text-bad"
            >
              Đặt lại dữ liệu
            </button>
          </div>

          <p className="mt-3 text-xs text-fg-subtle">
            "Đặt lại dữ liệu" xóa toàn bộ tiến độ trong trình duyệt và không thể hoàn tác. Chỉ dùng khi tải lại
            trang vẫn không vào được.
          </p>

          <details className="mt-5">
            <summary className="cursor-pointer text-xs text-fg-subtle">Chi tiết kỹ thuật</summary>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-surface-2 p-3 text-xs text-fg-muted">
              {error.message}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}
