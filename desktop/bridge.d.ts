/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Hình dạng của cầu nối mà preload.cjs bơm vào trang. Khai báo ở đây để
 * TypeScript kiểm tra được mọi lời gọi từ phía React.
 */

export interface VaultResult {
  ok: boolean;
  error?: string;
  waitMs?: number;
  data?: unknown;
}

export interface EngwinBridge {
  isDesktop: true;
  platform: string;
  vault: {
    status(): Promise<{initialised: boolean; unlocked: boolean}>;
    validate(passcode: string): Promise<{error: string | null}>;
    create(passcode: string): Promise<VaultResult>;
    unlock(passcode: string): Promise<VaultResult>;
    lock(): Promise<VaultResult>;
    read(): Promise<VaultResult>;
    write(data: unknown): Promise<VaultResult>;
    change(oldPass: string, newPass: string): Promise<VaultResult>;
    destroy(): Promise<VaultResult>;
  };
  /**
   * Đăng ký hàm chạy khi két TỰ khoá (khoá màn hình, máy ngủ, hoặc nhàn rỗi
   * mười phút). Trả về hàm gỡ đăng ký.
   */
  khiTuKhoa(goiLai: (viSao: string) => void): () => void;
}

declare global {
  interface Window {
    engwin?: EngwinBridge;
  }
}

export {};
