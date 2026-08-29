import { useState } from 'react';
import { useApp } from '@/state';
import { CLASSES, classSummary } from '@/data/classes';
import { groupById } from '@/data/groups';
import { roleById } from '@/data/roles';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { can, currentRole } from '@/lib/auth';
import { Card, SectionTitle, Badge, Progress, Stat, BarChart, Callout, Empty } from '@/components/ui';

export default function Classes() {
  const { state } = useApp();
  const [classId, setClassId] = useState(CLASSES[0].id);
  const room = CLASSES.find((c) => c.id === classId)!;
  const sum = classSummary(room);
  const role = currentRole(state);

  if (!can(state, 'class.view')) {
    return (
      <Empty
        title="Vai trò hiện tại không có quyền xem lớp"
        desc={`Bạn đang ở vai trò “${role.name}”. Hãy chuyển sang một vai trò giáo viên ở thanh bên để xem trang này.`}
      />
    );
  }

  const canAssign = can(state, 'class.assign');
  const canUnlock = can(state, 'class.unlock');
  const canExport = can(state, 'report.export');

  const dist = [
    { label: '< 70%', value: room.students.filter((s) => s.avgKpi < 70).length, color: '#be123c' },
    { label: '70–79%', value: room.students.filter((s) => s.avgKpi >= 70 && s.avgKpi < 80).length, color: '#b45309' },
    { label: '80–89%', value: room.students.filter((s) => s.avgKpi >= 80 && s.avgKpi < 90).length, color: '#4f46e5' },
    { label: '≥ 90%', value: room.students.filter((s) => s.avgKpi >= 90).length, color: '#047857' },
  ];

  const atRisk = room.students.filter((s) => s.avgKpi < 70 || s.lastActiveDays >= 7);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={`Vai trò: ${role.name}`}
        title="Quản lý lớp"
        desc="Dữ liệu lớp dùng để ra quyết định chuyên môn: ai cần can thiệp trước, nhóm nào đang tụt nhịp, và nội dung nào cần chữa chung cho cả lớp."
      />

      <div className="flex flex-wrap gap-2">
        {CLASSES.map((c) => {
          const st = BRAND_TRACK_STYLE[c.track];
          return (
            <button
              key={c.id}
              className="chip"
              style={
                classId === c.id
                  ? { background: st.color, color: '#fff' }
                  : { background: `${st.color}14`, color: st.color }
              }
              onClick={() => setClassId(c.id)}
            >
              {c.name.split('—')[0].trim()}
            </button>
          );
        })}
      </div>

      <Card className="p-5">
        <h2 className="text-[17px] font-extrabold text-slate-900">{room.name}</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          GV phụ trách: <b className="text-slate-700">{room.teacher}</b> · Trợ giảng:{' '}
          <b className="text-slate-700">{room.assistant}</b> · Mục tiêu: {room.targetSchool}
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Sĩ số" value={sum.n} sub="học sinh đang theo học" />
        <Stat
          label="KPI trung bình lớp"
          value={`${sum.avg}%`}
          tone={sum.avg >= 90 ? '#047857' : sum.avg >= 80 ? '#4f46e5' : '#b45309'}
          sub="chuẩn mục tiêu 90%"
        />
        <Stat label="Đạt chuẩn" value={sum.onTarget} tone="#047857" sub="học sinh có KPI ≥ 90%" />
        <Stat label="Cần can thiệp" value={sum.atRisk} tone="#be123c" sub="KPI thấp hoặc nghỉ ≥ 7 ngày" />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-2">
          <h3 className="text-[15px] font-extrabold text-slate-900">Phân bố KPI</h3>
          <div className="mt-3">
            <BarChart data={dist} height={170} />
          </div>
        </Card>

        <Card className="p-5 lg:col-span-3">
          <h3 className="text-[15px] font-extrabold text-slate-900">Ưu tiên can thiệp tuần này</h3>
          {atRisk.length === 0 ? (
            <p className="mt-4 text-[13px] text-slate-500">
              Không có học sinh nào trong diện cảnh báo. Hãy dồn nguồn lực vào việc nâng trần cho nhóm
              đang ở 80–89%.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {atRisk.slice(0, 6).map((s) => (
                <li key={s.id} className="flex flex-wrap items-center gap-2 rounded-xl bg-rose-50 p-3">
                  <span className="text-[13px] font-bold text-slate-900">{s.name}</span>
                  <Badge tone="rose">KPI {s.avgKpi}%</Badge>
                  {s.lastActiveDays >= 7 && <Badge tone="amber">Nghỉ {s.lastActiveDays} ngày</Badge>}
                  <span className="ml-auto text-[12px] text-slate-600">
                    {s.lastActiveDays >= 7
                      ? 'Liên hệ gia đình để khôi phục nhịp học.'
                      : 'Hạ một Level và luyện lại nền tảng.'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[15px] font-extrabold text-slate-900">Danh sách lớp</h3>
          <div className="flex flex-wrap gap-2">
            <button className="btn-ghost py-1.5 text-[12.5px]" disabled={!canAssign}>
              {canAssign ? 'Giao nhiệm vụ hàng loạt' : '🔒 Giao nhiệm vụ'}
            </button>
            <button className="btn-ghost py-1.5 text-[12.5px]" disabled={!canExport}>
              {canExport ? 'Xuất báo cáo' : '🔒 Xuất báo cáo'}
            </button>
          </div>
        </div>
        {!canAssign && (
          <Callout tone="amber" title="Vai trò Trợ giảng bị giới hạn">
            Trợ giảng chỉ được xem và chấm chữa. Việc giao nhiệm vụ và mở khoá cấp độ thuộc thẩm quyền
            của Giáo viên trở lên, và mọi thao tác mở khoá đều được ghi nhật ký.
          </Callout>
        )}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-2">Học sinh</th>
                <th className="py-2">Nhóm năng lực</th>
                <th className="py-2">Vai trò</th>
                <th className="py-2 text-center">GĐ</th>
                <th className="py-2 text-center">Level</th>
                <th className="py-2 text-right">Nhiệm vụ</th>
                <th className="py-2">KPI</th>
                <th className="py-2 text-right">Hoạt động</th>
                <th className="py-2 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {room.students.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 font-semibold text-slate-800">{s.name}</td>
                  <td className="py-2.5 text-slate-600">{groupById(s.groupId).name.split('·')[1]?.trim()}</td>
                  <td className="py-2.5">
                    <Badge style={{ background: `${roleById(s.roleId as never).color}14`, color: roleById(s.roleId as never).color }}>
                      {roleById(s.roleId as never).shortName}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-center tabular-nums">{s.stage}</td>
                  <td className="py-2.5 text-center tabular-nums">{s.level}</td>
                  <td className="py-2.5 text-right tabular-nums">{s.missionsDone}</td>
                  <td className="py-2.5">
                    <div className="w-28">
                      <Progress
                        value={s.avgKpi}
                        height={5}
                        tone={s.avgKpi >= 90 ? '#047857' : s.avgKpi >= 80 ? '#4f46e5' : '#be123c'}
                      />
                    </div>
                    <span className="text-[11px] tabular-nums text-slate-500">{s.avgKpi}%</span>
                  </td>
                  <td className="py-2.5 text-right text-[12px] text-slate-500">
                    {s.lastActiveDays === 0 ? 'Hôm nay' : `${s.lastActiveDays} ngày trước`}
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      className="rounded-lg border border-slate-200 px-2 py-1 text-[11.5px] font-semibold text-slate-600 disabled:opacity-40"
                      disabled={!canUnlock}
                      title={canUnlock ? 'Mở khoá Level tiếp theo' : 'Vai trò của bạn không có quyền này'}
                    >
                      {canUnlock ? 'Mở khoá' : '🔒'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-[12px] leading-relaxed text-slate-400">
        Dữ liệu lớp trong bản này là dữ liệu mô phỏng, sinh cố định từ hạt giống nên luôn giống nhau ở
        mọi lần mở. Khi kết nối máy chủ thật, phần này sẽ đọc dữ liệu học tập thực của học sinh.
      </p>
    </div>
  );
}
