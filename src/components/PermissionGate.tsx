import type { ReactNode } from 'react';
import { actorOf, can, lockReason } from '../lib/permissions';
import { useAppState } from '../store/AppStore';
import type { Permission } from '../types';
import { Card } from './ui/primitives';
import { Link } from '../lib/router';

export function useCan(permission: Permission): boolean {
  const state = useAppState();
  return can(actorOf(state), permission);
}

export function useLockReason(permission: Permission): string | null {
  const state = useAppState();
  return lockReason(actorOf(state), permission);
}

/**
 * Chan mot vung giao dien theo quyen.
 *
 * Khi bi chan, hien ly do va duong di de mo — khong bao gio de nguoi dung doi
 * mat voi mot man hinh trong hoac mot thong bao cut lui.
 */
export function PermissionGate({
  permission,
  children,
  fallback,
  title,
}: {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
  title?: string;
}) {
  const state = useAppState();
  const actor = actorOf(state);

  if (can(actor, permission)) return <>{children}</>;
  if (fallback !== undefined) return <>{fallback}</>;

  return (
    <Card className="border-dashed">
      <h2 className="text-base font-semibold text-fg">{title ?? 'Tính năng chưa mở'}</h2>
      <p className="mt-2 text-sm text-fg-muted">{lockReason(actor, permission)}</p>
      <Link to="/roles" className="mt-3 inline-block text-sm font-medium text-brand underline underline-offset-2">
        Xem hệ thống phân quyền
      </Link>
    </Card>
  );
}
