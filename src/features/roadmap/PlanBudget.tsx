import { useMemo, useState } from 'react';
import { MAX_TOTAL_SCORE, SECTION_BY_ID } from '../../config';
import { bandOf } from '../../data/mockExams';
import { formatPercent, formatScore } from '../../lib/format';
import {
  AMBITIOUS_TARGET,
  HORIZONS,
  buildRoadmap,
  horizonFor,
  type HorizonSpec,
} from '../../lib/roadmap';
import { daysUntil } from '../../lib/format';
import { useAppState } from '../../store/AppStore';
import { Badge, Card, CardHeader, Progress, Segmented, Stat } from '../../components/ui/primitives';

/**
 * NGAN SACH GIO VA PHAN BO THEO LOI ICH BIEN
 *
 * Phan nay tra loi cau hoi ma moi lo trinh khac trong thi truong bo qua: "gio
 * hoc tiep theo cua toi nen dat vao dau, va voi nhip nay thi toi cham duoc bao
 * nhieu diem?"
 *
 * No co the noi "khong dat duoc" — va do la chu dich. Mot lo trinh chi biet
 * dong vien se de nguoi hoc phat hien su that vao dung ngay thi, khi khong con
 * gi de sua nua.
 */
export function PlanBudget() {
  const state = useAppState();
  const daysLeft = state.settings.examDate ? daysUntil(state.settings.examDate) : null;
  const auto = horizonFor(daysLeft);
  const [horizonId, setHorizonId] = useState<HorizonSpec['id']>(auto.id);

  const plan = useMemo(() => buildRoadmap({ state, horizonId }), [state, horizonId]);
  const band = bandOf(plan.scoreProjected);
  const ambitious = plan.targetScore > AMBITIOUS_TARGET;

  const top = plan.allocations.slice(0, 8);
  const maxHours = top.reduce((n, a) => Math.max(n, a.hours), 1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Ngân sách giờ và điểm chạm được"
          subtitle="Mọi con số dưới đây truy ngược được: độ thành thạo → năng lực → tỉ lệ đúng kỳ vọng trên phân bố độ khó chuẩn → điểm."
          action={
            <Segmented
              label="Quỹ thời gian"
              value={horizonId}
              onChange={setHorizonId}
              options={HORIZONS.map((h) => ({ value: h.id, label: h.name }))}
            />
          }
        />

        <p className="mb-5 text-sm text-fg-muted">
          {plan.horizon.note} Với nhịp hiện tại{' '}
          <strong className="text-fg">{formatScore(plan.weeklyHours)} giờ/tuần</strong>, quỹ thời gian{' '}
          {plan.horizon.name} cho bạn <strong className="text-fg">{plan.totalHours} giờ</strong> để phân bổ.
          Đổi nhịp bằng cách đổi mục tiêu số câu mỗi ngày trong Cài đặt.
        </p>

        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Điểm hiện tại" value={formatScore(plan.scoreNow)} hint={`/${MAX_TOTAL_SCORE}`} />
          <Stat
            label="Điểm khi hoàn thành"
            value={formatScore(plan.scoreProjected)}
            tone="brand"
            hint={band.label}
          />
          <Stat label="Mục tiêu" value={formatScore(plan.targetScore)} hint="đổi trong Cài đặt" />
          <Stat
            label="Trần quỹ thời gian"
            value={formatScore(plan.ceilingScore)}
            hint="học hết sức trong quỹ này"
          />
        </div>

        <div
          className={
            'mt-5 rounded-xl border p-4 text-sm ' +
            (plan.feasible ? 'border-ok bg-ok-soft' : 'border-warn bg-warn-soft')
          }
        >
          {plan.feasible ? (
            <p className="text-fg">
              <strong>Mục tiêu {formatScore(plan.targetScore)} điểm đạt được với nhịp hiện tại.</strong> Giữ đều{' '}
              {formatScore(plan.weeklyHours)} giờ mỗi tuần trong {plan.horizon.weeks} tuần và đi đúng thứ tự ưu tiên bên dưới.
            </p>
          ) : plan.requiredWeeklyHours === null ? (
            <div className="space-y-2 text-fg">
              <p>
                <strong>
                  Mục tiêu {formatScore(plan.targetScore)} điểm nằm ngoài tầm với của quỹ {plan.horizon.name}.
                </strong>{' '}
                Kể cả khi học hết sức, quỹ này chỉ chạm tới khoảng {formatScore(plan.ceilingScore)} điểm.
              </p>
              <p className="text-fg-muted">
                Hai lựa chọn có thật: kéo dài quỹ thời gian, hoặc đặt mục tiêu ở mức{' '}
                {formatScore(plan.ceilingScore)} rồi nâng lên khi đã đi được nửa đường. Hệ thống không hứa hẹn
                điều nó không tính ra được.
              </p>
            </div>
          ) : (
            <p className="text-fg">
              <strong>
                Nhịp hiện tại chưa đủ: {formatScore(plan.weeklyHours)} giờ/tuần cho ra{' '}
                {formatScore(plan.scoreProjected)} điểm.
              </strong>{' '}
              Để chạm {formatScore(plan.targetScore)} điểm trong {plan.horizon.weeks} tuần, cần khoảng{' '}
              <strong>{formatScore(plan.requiredWeeklyHours)} giờ mỗi tuần</strong> — tức thêm{' '}
              {formatScore(Math.max(0, plan.requiredWeeklyHours - plan.weeklyHours))} giờ so với bây giờ.
            </p>
          )}
        </div>

        {ambitious ? (
          <p className="mt-3 text-sm text-fg-muted">
            <Badge tone="warn">Lưu ý</Badge> Mục tiêu {formatScore(plan.targetScore)} điểm cao hơn nhóm dẫn đầu
            phổ điểm các mùa gần đây (thường trong khoảng {AMBITIOUS_TARGET} điểm đổ lại). Đặt mục tiêu cao là
            quyền của bạn — chỉ cần biết mình đang nhắm tới đâu.
          </p>
        ) : null}
      </Card>

      <Card>
        <CardHeader
          title="Giờ học tiếp theo nên đặt vào đâu"
          subtitle="Xếp theo lợi ích biên: mỗi giờ được đặt vào chuyên đề cho ra nhiều điểm nhất cho chính giờ đó, chứ không phải chuyên đề yếu nhất."
        />
        <p className="mb-4 text-sm text-fg-muted">
          Chuyên đề yếu nhất không phải lúc nào cũng là chỗ đáng đầu tư nhất. Một chuyên đề trọng số lớn trong đề
          và còn nhiều dư địa sẽ trả lại nhiều điểm hơn cho cùng số giờ. Bảng dưới là thứ tự trả lời đúng câu hỏi
          đó.
        </p>

        <ol className="space-y-3">
          {top.map((item) => (
            <li key={item.topicId} className="rounded-xl border border-line bg-surface-2 p-3.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-fg">
                  {item.priority}. {item.topicName}
                </span>
                <span className="tabular-nums text-xs text-fg-muted">
                  {SECTION_BY_ID[item.section].shortName} · {item.hours} giờ · +
                  {item.gainPoints.toFixed(1)} điểm
                </span>
              </div>
              <Progress
                value={(item.hours / maxHours) * 100}
                tone="brand"
                className="mt-2"
                label={`Giờ phân bổ cho ${item.topicName}`}
              />
              <p className="mt-1.5 text-xs text-fg-subtle">
                Thành thạo {formatPercent(item.masteryNow, 0)} → {formatPercent(item.masteryAfter, 0)}
              </p>
            </li>
          ))}
        </ol>

        {plan.allocations.length > top.length ? (
          <p className="mt-4 text-xs text-fg-subtle">
            Còn {plan.allocations.length - top.length} chuyên đề nữa trong phân bổ, mỗi chuyên đề nhận phần giờ
            nhỏ hơn. Không chuyên đề nào bị bỏ trắng — bỏ trắng một chuyên đề là để lại một lỗ hổng biết trước.
          </p>
        ) : null}
      </Card>

      <Card>
        <CardHeader
          title="Cột mốc kiểm tra giữa đường"
          subtitle="Mỗi mốc kèm một điểm kỳ vọng. Ý nghĩa của mốc là phát hiện lệch nhịp sớm, khi vẫn còn thời gian để sửa."
        />
        <ol className="space-y-3">
          {plan.checkpoints.map((point) => (
            <li key={point.label} className="flex gap-3.5">
              <span className="mt-0.5 inline-flex h-7 min-w-14 items-center justify-center rounded-full bg-brand-soft px-2 text-xs font-semibold text-brand">
                Tuần {point.week}
              </span>
              <div>
                <p className="text-sm font-medium text-fg">
                  {point.label}{' '}
                  <span className="font-normal tabular-nums text-fg-muted">
                    · kỳ vọng {formatScore(point.expectedScore)} điểm
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-fg-muted">{point.verify}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <CardHeader
          title="Ba giai đoạn và giờ dành cho mỗi giai đoạn"
          subtitle="Giai đoạn Nền tảng nhận nhiều giờ nhất vì đây là lúc kiến thức còn thủng. Giai đoạn Bứt phá ít giờ hơn nhưng giờ ở đó đắt hơn."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {plan.phases.map((phase) => (
            <div key={phase.stage} className="rounded-xl border border-line bg-surface-2 p-4">
              <p className="text-sm font-semibold text-fg">{phase.name}</p>
              <p className="mt-1 tabular-nums text-xs text-fg-muted">
                Tuần {phase.weeks[0]}–{phase.weeks[1]} · {phase.hours} giờ ·{' '}
                {formatPercent(phase.hoursShare, 0)} quỹ
              </p>
              <p className="mt-2 text-xs text-fg-subtle">{phase.purpose}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
