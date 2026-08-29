import { useRef, useState } from 'react';
import { DEFAULT_TARGET_SCORE, MAX_TOTAL_SCORE, SCIENCE_SUBJECTS } from '../../config';
import { aiStatus } from '../../lib/ai';
import { formatNumber } from '../../lib/format';
import { createInitialState, exportState, importState } from '../../lib/storage';
import { rankName } from '../../lib/permissions';
import { Link } from '../../lib/router';
import { useAppState, useDispatch, useUpdateSettings } from '../../store/AppStore';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Modal,
  Segmented,
  Select,
  Toggle,
  useToast,
} from '../../components/ui/primitives';
import type { ScienceSubject } from '../../types';

/**
 * CAI DAT
 *
 * Nguyen tac ve du lieu: nguoi hoc so huu du lieu cua ho. Xuat ra duoc, nhap
 * lai duoc, xoa duoc — va viec xoa phai co xac nhan ro rang vi khong the hoan tac.
 */
export function SettingsPage() {
  const state = useAppState();
  const dispatch = useDispatch();
  const updateSettings = useUpdateSettings();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const download = () => {
    const blob = new Blob([exportState(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hsa365-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast('Đã xuất dữ liệu học tập ra tệp JSON.', 'ok');
  };

  const upload = async (file: File) => {
    try {
      const next = importState(await file.text());
      dispatch({ type: 'state/replace', state: next });
      toast('Đã nhập dữ liệu. Toàn bộ tiến độ được khôi phục.', 'ok');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Không đọc được tệp.', 'bad');
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Cài đặt</h1>
        <p className="mt-1.5 text-sm text-fg-muted">
          Mọi dữ liệu học tập được lưu ngay trên thiết bị này và không gửi đi đâu.
        </p>
      </header>

      <Card>
        <CardHeader title="Hồ sơ" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tên hiển thị">
            {(props) => (
              <Input
                {...props}
                value={state.profile.displayName}
                onChange={(e) => dispatch({ type: 'profile/update', patch: { displayName: e.target.value } })}
                maxLength={40}
              />
            )}
          </Field>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-fg">Vai trò trong hệ thống</span>
            <div className="flex h-10 items-center gap-2">
              <Badge tone="brand">{rankName(state.profile.role, state.profile.rank)}</Badge>
              <Link to="/roles" className="text-sm font-medium text-brand underline underline-offset-2">
                Quản lý phân quyền
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Mục tiêu thi" subtitle="Những con số này chi phối lộ trình, mốc tuần và chỉ số sẵn sàng." />
        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            label={`Điểm mục tiêu (thang ${MAX_TOTAL_SCORE})`}
            hint={`Bài thi HSA chấm trên thang ${MAX_TOTAL_SCORE}. Mức ${DEFAULT_TARGET_SCORE} tương ứng nhóm dẫn đầu phổ điểm.`}
          >
            {(props) => (
              <Input
                {...props}
                type="number"
                min={50}
                max={MAX_TOTAL_SCORE}
                value={state.settings.targetScore}
                onChange={(e) => updateSettings({ targetScore: Number(e.target.value) })}
              />
            )}
          </Field>

          <Field label="Ngày thi dự kiến" hint="Dùng để chia giai đoạn và đặt trần khoảng cách ôn tập.">
            {(props) => (
              <Input
                {...props}
                type="date"
                value={state.settings.examDate ?? ''}
                onChange={(e) => updateSettings({ examDate: e.target.value || null })}
              />
            )}
          </Field>

          <Field label="Mục tiêu mỗi ngày" hint="Số câu tối thiểu để giữ chuỗi ngày học.">
            {(props) => (
              <Input
                {...props}
                type="number"
                min={5}
                max={300}
                value={state.settings.dailyGoal}
                onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}
              />
            )}
          </Field>
        </div>

        <div className="mt-5">
          <Field
            label="Môn tự chọn của phần 3"
            hint="Đổi môn sẽ đổi toàn bộ chuyên đề, phiếu luyện và đề thi thử của phần 3."
          >
            {(props) => (
              <Select
                {...props}
                value={state.settings.scienceSubject}
                onChange={(e) => updateSettings({ scienceSubject: e.target.value as ScienceSubject })}
                className="max-w-sm"
              >
                {SCIENCE_SUBJECTS.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} — {subject.note}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>
      </Card>

      <Card>
        <CardHeader title="Hiển thị" subtitle="Làm bài nhiều giờ thì mắt phải được ưu tiên." />
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm font-medium text-fg">Chủ đề màu</span>
            <Segmented
              label="Chủ đề màu"
              value={state.settings.theme}
              onChange={(theme) => updateSettings({ theme })}
              options={[
                { value: 'system', label: 'Theo hệ thống' },
                { value: 'light', label: 'Sáng' },
                { value: 'dark', label: 'Tối' },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm font-medium text-fg">Cỡ chữ</span>
            <Segmented
              label="Cỡ chữ"
              value={String(state.settings.fontScale)}
              onChange={(value) => updateSettings({ fontScale: Number(value) })}
              options={[
                { value: '0.875', label: 'Nhỏ' },
                { value: '1', label: 'Vừa' },
                { value: '1.125', label: 'Lớn' },
                { value: '1.375', label: 'Rất lớn' },
              ]}
            />
          </div>

          <Toggle
            checked={state.settings.reducedMotion}
            onChange={(reducedMotion) => updateSettings({ reducedMotion })}
            label="Giảm chuyển động"
            description="Tắt hiệu ứng chuyển cảnh. Hữu ích nếu bạn nhạy cảm với chuyển động hoặc dùng máy cấu hình thấp."
          />

          <Toggle
            checked={state.settings.soundCues}
            onChange={(soundCues) => updateSettings({ soundCues })}
            label="Âm báo khi sắp hết giờ"
            description="Phát một tiếng báo ngắn khi phần thi còn 5 phút."
          />
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Gia sư AI"
          subtitle="Tùy chọn. Không có khóa thì mọi tính năng còn lại vẫn hoạt động đầy đủ."
          action={
            <Badge tone={aiStatus(state.settings.aiApiKey) === 'ready' ? 'ok' : 'neutral'}>
              {aiStatus(state.settings.aiApiKey) === 'ready' ? 'Đang bật' : 'Đang tắt'}
            </Badge>
          }
        />
        <Field
          label="Khóa Gemini API"
          hint="Khóa được lưu trong trình duyệt của bạn và gọi thẳng tới Google, không đi qua máy chủ nào của HSA365."
        >
          {(props) => (
            <div className="flex gap-2">
              <Input
                {...props}
                type={showKey ? 'text' : 'password'}
                autoComplete="off"
                spellCheck={false}
                placeholder="AIza…"
                value={state.settings.aiApiKey}
                onChange={(e) => updateSettings({ aiApiKey: e.target.value })}
              />
              <Button onClick={() => setShowKey((v) => !v)}>{showKey ? 'Ẩn' : 'Hiện'}</Button>
            </div>
          )}
        </Field>
        <p className="mt-3 rounded-lg border border-warn/40 bg-warn-soft p-3 text-xs leading-relaxed text-warn">
          Lưu ý bảo mật: khóa nằm ở phía trình duyệt nên chỉ phù hợp khi bạn tự dùng trên máy cá nhân. Nếu triển
          khai HSA365 cho nhiều người học, hãy đặt một máy chủ trung gian giữ khóa thay vì phát khóa cho từng
          người.
        </p>
      </Card>

      <Card>
        <CardHeader
          title="Dữ liệu học tập"
          subtitle={`${formatNumber(state.results.length)} bài thi thử · ${formatNumber(
            Object.keys(state.worksheets).length,
          )} phiếu đã làm · ${formatNumber(Object.keys(state.srs).length)} câu trong sổ tay`}
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={download}>Xuất ra tệp JSON</Button>
          <Button onClick={() => fileRef.current?.click()}>Nhập từ tệp</Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
              event.target.value = '';
            }}
          />
          <Button variant="danger" onClick={() => setConfirmReset(true)}>
            Xóa toàn bộ dữ liệu
          </Button>
        </div>
        <p className="mt-3 text-xs text-fg-subtle">
          Tệp xuất ra chứa toàn bộ tiến độ. Hãy dùng nó để chuyển máy hoặc sao lưu trước khi xóa dữ liệu trình
          duyệt. <strong className="text-fg">Khóa Gemini không bao giờ nằm trong tệp xuất</strong> — tệp này
          thường được gửi cho giáo viên hoặc lưu trên đám mây, nên nó phải an toàn khi chia sẻ.
        </p>
      </Card>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Xóa toàn bộ dữ liệu học tập?"
        size="sm"
        footer={
          <>
            <Button onClick={() => setConfirmReset(false)}>Hủy</Button>
            <Button
              variant="danger"
              onClick={() => {
                dispatch({ type: 'state/replace', state: createInitialState() });
                setConfirmReset(false);
                toast('Đã xóa toàn bộ dữ liệu.', 'bad');
              }}
            >
              Xóa vĩnh viễn
            </Button>
          </>
        }
      >
        <p className="text-sm text-fg-muted">
          Thao tác này xóa mọi bài thi thử, tiến độ phiếu luyện, sổ tay lỗi sai và cấp độ đã đạt.{' '}
          <strong className="text-fg">Không thể hoàn tác.</strong> Hãy xuất dữ liệu ra tệp trước nếu bạn còn cần.
        </p>
      </Modal>
    </div>
  );
}
