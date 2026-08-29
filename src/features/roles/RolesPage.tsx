import { useMemo, useState } from 'react';
import { LEVELS, MAX_LEVEL } from '../../data/curriculum';
import { PERMISSIONS, ROLES, ROLE_BY_ID, STUDENT_LEVEL_GRANTS } from '../../data/roles';
import { cn } from '../../lib/cn';
import { formatNumber } from '../../lib/format';
import {
  actorOf,
  can,
  highestLevel,
  lockReason,
  maxRank,
  permissionMatrix,
  permissionsOf,
  rankName,
  studentRankForLevel,
} from '../../lib/permissions';
import { useAppState, useDispatch } from '../../store/AppStore';
import type { RoleFamily, RoleSpec } from '../../data/roles';
import type { Permission, Role } from '../../types';
import { Badge, Button, Card, CardHeader, Select, Stat } from '../../components/ui/primitives';
import { IconCheck, IconClose } from '../../components/layout/icons';

/**
 * PHAN QUYEN
 *
 * Man hinh nay vua la cong cu, vua la TAI LIEU: no in ra dung ma tran quyen ma
 * ma nguon dang dung, nen tai lieu khong bao gio lech khoi hanh vi that.
 */
export function RolesPage() {
  const state = useAppState();
  const dispatch = useDispatch();
  const actor = actorOf(state);
  const granted = useMemo(() => permissionsOf(actor), [actor]);
  const matrix = useMemo(() => permissionMatrix(), []);
  const [preview, setPreview] = useState<Permission | null>(null);

  const roleSpec = ROLE_BY_ID.get(state.profile.role);
  const level = highestLevel(state);
  const suggestedRank = studentRankForLevel(level);

  const families = useMemo(() => {
    const map = new Map<RoleFamily, RoleSpec[]>();
    for (const role of ROLES) map.set(role.family, [...(map.get(role.family) ?? []), role]);
    return [...map.entries()];
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, typeof PERMISSIONS>();
    for (const permission of PERMISSIONS) {
      map.set(permission.group, [...(map.get(permission.group) ?? []), permission]);
    }
    return [...map.entries()];
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Phân quyền hệ thống</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-fg-muted">
          Quyền được quyết định bởi ba tầng: <strong className="text-fg">vai trò</strong> (làm công việc gì),{' '}
          <strong className="text-fg">cấp bậc</strong> trong vai trò đó, và riêng học viên còn có{' '}
          <strong className="text-fg">cấp độ học</strong> — một số tính năng chỉ mở khi đã đủ nền.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Vai trò" value={roleSpec?.name ?? '—'} tone="brand" />
        <Stat
          label="Cấp bậc"
          value={`${state.profile.rank}/${maxRank(state.profile.role)}`}
          hint={rankName(state.profile.role, state.profile.rank)}
        />
        <Stat label="Cấp độ học cao nhất" value={`${level}/${MAX_LEVEL}`} hint={LEVELS[level - 1]?.name ?? ''} />
        <Stat label="Số quyền đang có" value={`${granted.size}/${PERMISSIONS.length}`} tone="ok" />
      </div>

      <Card>
        <CardHeader
          title="Danh tính hiện tại"
          subtitle="Trong bản chạy cục bộ, bạn tự đặt vai trò để xem hệ thống vận hành ở từng góc nhìn."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Vai trò</span>
            <Select
              value={state.profile.role}
              onChange={(e) => dispatch({ type: 'profile/update', patch: { role: e.target.value as Role, rank: 1 } })}
            >
              {families.map(([family, roles]) => (
                <optgroup key={family} label={family}>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Cấp bậc</span>
            <Select
              value={String(state.profile.rank)}
              onChange={(e) => dispatch({ type: 'profile/update', patch: { rank: Number(e.target.value) } })}
            >
              {(roleSpec?.ranks ?? []).map((rank) => (
                <option key={rank.rank} value={rank.rank}>
                  Bậc {rank.rank} — {rank.name}
                </option>
              ))}
            </Select>
          </label>
        </div>

        {roleSpec && <p className="mt-4 text-sm text-fg-muted">{roleSpec.summary}</p>}

        {state.profile.role === 'student' && suggestedRank > state.profile.rank && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ok/40 bg-ok-soft p-4">
            <p className="text-sm text-fg">
              Tiến độ học của bạn đã đạt cấp {level}, tương ứng bậc{' '}
              <strong>{rankName('student', suggestedRank)}</strong>.
            </p>
            <Button
              variant="success"
              size="sm"
              onClick={() => dispatch({ type: 'profile/update', patch: { rank: suggestedRank } })}
            >
              Nâng bậc
            </Button>
          </div>
        )}

        <p className="mt-4 rounded-lg border border-warn/40 bg-warn-soft p-3 text-xs leading-relaxed text-warn">
          Cảnh báo triển khai: đây là lớp kiểm soát phía người dùng. Nó quyết định giao diện hiện gì và chặn thao
          tác nhầm lẫn, nhưng không phải ranh giới bảo mật — bất kỳ ai mở công cụ nhà phát triển đều đổi được
          trạng thái cục bộ. Khi chạy thật, mọi quyền trong bảng dưới phải được kiểm tra lại trên máy chủ.
        </p>
      </Card>

      <Card>
        <CardHeader
          title="Bậc thang cấp độ học viên"
          subtitle="Tính năng mở dần theo tiến độ để người học không bị đẩy vào đề khó khi nền chưa vững."
        />
        <ol className="space-y-3">
          {STUDENT_LEVEL_GRANTS.map((gate) => {
            const reached = level >= gate.level;
            return (
              <li
                key={gate.level}
                className={cn(
                  'flex flex-wrap items-center gap-3 rounded-xl border p-4',
                  reached ? 'border-ok/40 bg-ok-soft' : 'border-line bg-surface-2',
                )}
              >
                <span
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-lg text-sm font-semibold',
                    reached ? 'bg-ok text-white' : 'bg-canvas-2 text-fg-subtle',
                  )}
                >
                  {reached ? <IconCheck className="size-4" /> : gate.level}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">Đạt cấp {gate.level} ở một tuyến bất kỳ</p>
                  <p className="mt-0.5 text-xs text-fg-muted">
                    Mở: {gate.grants.map((p) => PERMISSIONS.find((x) => x.id === p)?.name ?? p).join(', ')}
                  </p>
                </div>
                <Badge tone={reached ? 'ok' : 'neutral'}>{reached ? 'Đã mở' : 'Chưa mở'}</Badge>
              </li>
            );
          })}
        </ol>
      </Card>

      <Card>
        <CardHeader
          title="Bậc thang vai trò"
          subtitle="Quyền cộng dồn theo bậc: lên bậc chỉ thêm quyền, không bao giờ mất quyền đã có."
        />
        {families.map(([family, roles]) => (
          <section key={family} className="mt-5 first:mt-0">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">
              Họ vai trò: {family}
            </h3>
            <div className="grid gap-4 lg:grid-cols-2">
              {roles.map((role) => (
                <div key={role.id} className="rounded-xl border border-line bg-surface-2 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-fg">{role.name}</h4>
                    {role.id === state.profile.role && <Badge tone="brand">Bạn</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-fg-muted">{role.summary}</p>
                  <ol className="mt-3 space-y-2">
                    {role.ranks.map((rank) => (
                      <li key={rank.rank} className="text-xs">
                        <span className="font-medium text-fg">
                          Bậc {rank.rank} — {rank.name}
                        </span>
                        <p className="text-fg-muted">{rank.note}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>
        ))}
      </Card>

      <Card>
        <CardHeader
          title={`Ma trận quyền (${formatNumber(PERMISSIONS.length)} quyền)`}
          subtitle="Số trong ô là bậc tối thiểu của vai trò đó được cấp quyền. Dấu gạch nghĩa là không bao giờ."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[74rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Quyền</th>
                {ROLES.map((role) => (
                  <th key={role.id} scope="col" className="px-2 py-2 text-center">
                    <abbr title={role.name} className="no-underline">
                      {role.short}
                    </abbr>
                  </th>
                ))}
                <th scope="col" className="px-2 py-2 text-center">Bạn</th>
              </tr>
            </thead>
            {groups.map(([group, items]) => (
              <tbody key={group}>
                <tr className="bg-surface-2">
                  <th
                    colSpan={ROLES.length + 2}
                    scope="colgroup"
                    className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-fg-muted"
                  >
                    {group}
                  </th>
                </tr>
                {items.map((permission) => {
                  const row = matrix.find((m) => m.permission.id === permission.id);
                  const mine = can(actor, permission.id);
                  return (
                    <tr
                      key={permission.id}
                      className="border-b border-line/60"
                      onMouseEnter={() => setPreview(permission.id)}
                      onFocus={() => setPreview(permission.id)}
                    >
                      <th scope="row" className="px-2 py-2 font-normal">
                        <span className="text-fg">{permission.name}</span>
                        <span className="block text-xs text-fg-subtle">{permission.description}</span>
                      </th>
                      {ROLES.map((role) => {
                        const cell = row?.roles.find((r) => r.role.id === role.id);
                        return (
                          <td key={role.id} className="px-2 py-2 text-center tabular-nums">
                            {cell?.fromRank ? (
                              <span className="inline-grid size-6 place-items-center rounded-md bg-brand-soft text-xs font-semibold text-brand">
                                {cell.fromRank}
                              </span>
                            ) : (
                              <span className="text-fg-subtle">—</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-2 py-2 text-center">
                        {mine ? (
                          <IconCheck className="mx-auto size-4 text-ok" />
                        ) : (
                          <IconClose className="mx-auto size-4 text-fg-subtle" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ))}
          </table>
        </div>

        {preview && (
          <p className="mt-4 rounded-lg bg-surface-2 p-3 text-sm text-fg-muted" aria-live="polite">
            <strong className="text-fg">{PERMISSIONS.find((p) => p.id === preview)?.name}:</strong>{' '}
            {lockReason(actor, preview) ?? 'Bạn đang có quyền này.'}
          </p>
        )}
      </Card>
    </div>
  );
}
