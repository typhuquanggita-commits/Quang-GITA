import { Fragment } from 'react';
import { useApp } from '@/state';
import {
  ROLES,
  ROLE_GROUP_LABEL,
  PERMISSION_GROUPS,
  PERMISSION_LABEL,
  rolesByGroup,
  type RoleGroup,
} from '@/data/roles';
import { PRO_LEVELS } from '@/data/gita';
import { currentRole, applyRole } from '@/lib/auth';
import { account, ACCESS_NOTICE, PLAN_LABEL, type PlanId } from '@/lib/account';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';

const GROUPS: RoleGroup[] = ['hoc-sinh', 'giao-vien', 'quan-tri'];

export default function Roles() {
  const { state, update } = useApp();
  const role = currentRole(state);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Quản trị hệ thống"
        title="Phân quyền MATH365"
        desc="Tám vai trò chia làm ba nhóm: học sinh (4 cấp), giáo viên (3 cấp) và quản trị. Mỗi vai trò có phạm vi, giới hạn và tiêu chí thăng cấp rõ ràng."
      />

      {ACCESS_NOTICE && (
        <Callout tone="rose" title="Bản này chưa có đăng nhập và chưa kiểm soát được truy cập">
          {ACCESS_NOTICE}
        </Callout>
      )}

      <section>
        <h2 className="mb-1 text-[17px] font-extrabold text-slate-900">
          Ba gói học và ranh giới nội dung
        </h2>
        <div className="mb-3 text-[12.5px] leading-relaxed text-slate-600">
          Gói học quyết định nội dung được mở, và <b>độc lập với vai trò</b>: một học sinh có vai trò
          cao nhưng hết hạn học phí thì vẫn bị chặn. Ranh giới này chỉ có hiệu lực thật khi nội dung
          trả phí được đặt sau máy chủ — hiện tại toàn bộ nội dung nằm trong gói mã tải về trình duyệt,
          nên chưa có ranh giới nào cả.
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {(Object.keys(PLAN_LABEL) as PlanId[]).map((p) => {
            const meta = PLAN_LABEL[p];
            const active = account.current(state).plan === p;
            return (
              <Card key={p} className={`p-5 ${active ? 'ring-1 ring-brand' : ''}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                    style={{ background: meta.color }}
                  >
                    {meta.short}
                  </span>
                  {active && <Badge tone="brand">Đang áp dụng</Badge>}
                </div>
                <div className="mt-1.5 text-[14.5px] font-extrabold text-slate-900">{meta.label}</div>
                <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{meta.desc}</div>
              </Card>
            );
          })}
        </div>
        <Card className="mt-3 p-5">
          <div className="text-[13px] font-extrabold text-slate-900">
            Cần gì để ranh giới này có hiệu lực thật
          </div>
          <ol className="mt-2 space-y-1.5">
            {[
              'Dựng máy chủ xác thực: đăng ký, đăng nhập, phiên đăng nhập có thời hạn.',
              'Thêm bảng gói học gắn với từng tài khoản, có ngày bắt đầu và ngày hết hạn.',
              'Chuyển lời giải chi tiết và phần đề trả phí ra khỏi gói mã trình duyệt, lấy qua API.',
              'Máy chủ kiểm tra gói học trước khi trả nội dung; hết hạn thì từ chối.',
              'Viết một provider mới cài đặt giao diện AccountProvider trong src/lib/account.ts và đổi đúng một dòng.',
            ].map((x, i) => (
              <li key={x} className="text-[12.5px] leading-relaxed text-slate-700">
                {i + 1}. {x}
              </li>
            ))}
          </ol>
          <div className="mt-2 text-[12px] leading-relaxed text-slate-500">
            Đặc tả đầy đủ gồm mô hình dữ liệu, danh sách API và bảng phân quyền theo vai trò nằm ở
            tệp <span className="font-mono">docs/DANG-NHAP-VA-PHAN-QUYEN.md</span> trong kho mã.
          </div>
        </Card>
      </section>

      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Đang đăng nhập với vai trò
            </div>
            <div className="text-[16px] font-extrabold" style={{ color: role.color }}>
              {role.name}
            </div>
          </div>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {role.permissions.slice(0, 6).map((p) => (
              <Badge key={p} tone="brand">
                {PERMISSION_LABEL[p]}
              </Badge>
            ))}
            {role.permissions.length > 6 && <Badge>+{role.permissions.length - 6} quyền khác</Badge>}
          </div>
        </div>
      </Card>

      {GROUPS.map((g) => (
        <section key={g}>
          <h2 className="mb-3 text-[15px] font-extrabold uppercase tracking-wide text-slate-500">
            {ROLE_GROUP_LABEL[g]}
          </h2>
          <div className="grid gap-3 lg:grid-cols-2">
            {rolesByGroup(g).map((r) => (
              <Card key={r.id} className={`p-5 ${role.id === r.id ? 'ring-2 ring-brand-500' : ''}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-lg px-2 py-0.5 text-[11px] font-extrabold text-white"
                    style={{ background: r.color }}
                  >
                    Cấp {r.tier}
                  </span>
                  <h3 className="text-[15.5px] font-extrabold text-slate-900">{r.name}</h3>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{r.description}</p>

                <div className="mt-3">
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Điều kiện đạt vai trò
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {r.criteria.map((c) => (
                      <li key={c} className="text-[12.5px] text-slate-700">
                        ✔ {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {r.limits.map((l) => (
                    <div key={l.label} className="rounded-xl bg-slate-50 p-2.5">
                      <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">
                        {l.label}
                      </div>
                      <div className="mt-0.5 text-[12px] leading-snug text-slate-700">{l.value}</div>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-ghost mt-4 w-full"
                  onClick={() => update((s) => applyRole(s, r.id, 'Chọn vai trò từ trang Phân quyền'))}
                  disabled={role.id === r.id}
                >
                  {role.id === r.id ? 'Đang dùng vai trò này' : 'Dùng thử vai trò này'}
                </button>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* Ma trận quyền */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">Ma trận quyền</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Dấu ● nghĩa là vai trò đó có quyền tương ứng.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-[12.5px]">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white py-2 pr-3 text-left font-bold text-slate-500">
                  Quyền
                </th>
                {ROLES.map((r) => (
                  <th key={r.id} className="px-1 pb-2 text-center align-bottom">
                    <span
                      className="mx-auto block w-[74px] text-[10.5px] font-bold leading-tight"
                      style={{ color: r.color }}
                    >
                      {r.shortName}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_GROUPS.map((pg) => (
                <Fragment key={pg.name}>
                  <tr>
                    <td
                      colSpan={ROLES.length + 1}
                      className="sticky left-0 bg-slate-50 px-2 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-slate-500"
                    >
                      {pg.name}
                    </td>
                  </tr>
                  {pg.items.map((perm) => (
                    <tr key={perm} className="border-b border-slate-100">
                      <td className="sticky left-0 bg-white py-2 pr-3 text-slate-700">
                        {PERMISSION_LABEL[perm]}
                      </td>
                      {ROLES.map((r) => (
                        <td key={r.id} className="px-1 py-2 text-center">
                          {r.permissions.includes(perm) ? (
                            <span style={{ color: r.color }}>●</span>
                          ) : (
                            <span className="text-slate-200">·</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Liên hệ với cấp chuyên môn */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">
          Vai trò hệ thống ↔ Cấp độ chuyên môn
        </h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
          Vai trò nói về <b>quyền thao tác trong phần mềm</b>; cấp độ chuyên môn nói về{' '}
          <b>năng lực đã được kiểm định</b>. Một người phải đạt cấp chuyên môn tương ứng trước khi được
          cấp vai trò.
        </p>
        <div className="mt-4 space-y-2">
          {PRO_LEVELS.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-3">
              <span
                className="rounded-lg px-2 py-0.5 text-[11px] font-extrabold text-white"
                style={{ background: p.color }}
              >
                {p.id}
              </span>
              <span className="text-[13.5px] font-bold text-slate-900">{p.name}</span>
              <span className="text-[12.5px] text-slate-500">→ {p.roleHint}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Nhật ký */}
      {state.account.auditLog.length > 0 && (
        <Card className="p-5">
          <h2 className="text-[16px] font-extrabold text-slate-900">Nhật ký thao tác quyền</h2>
          <p className="mt-1 text-[12.5px] text-slate-500">
            Mọi thao tác đổi vai trò hoặc mở khoá thủ công đều được ghi lại để bảo đảm minh bạch.
          </p>
          <ul className="mt-3 space-y-2">
            {state.account.auditLog.map((l, i) => (
              <li key={i} className="rounded-xl bg-slate-50 p-3 text-[12.5px]">
                <span className="font-bold text-slate-800">{l.action}</span>
                <span className="ml-2 text-slate-400">
                  {new Date(l.at).toLocaleString('vi-VN')}
                </span>
                <div className="mt-0.5 text-slate-600">{l.detail}</div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
