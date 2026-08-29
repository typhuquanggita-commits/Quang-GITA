import { useMemo, useState } from 'react';
import { MAX_TOTAL_SCORE } from '../../config';
import { cn } from '../../lib/cn';
import { formatDateTime, formatNumber, formatPercent, formatScore } from '../../lib/format';
import { buildDossier } from '../../lib/dossier';
import { ERROR_LABEL } from '../../lib/solutions';
import { navigate } from '../../lib/router';
import { useAppState } from '../../store/AppStore';
import { scoreHistory } from '../../store/selectors';
import type { ErrorType } from '../../types';
import { BarList, TrendLine } from '../../components/charts';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  Progress,
  Segmented,
  Stat,
  type Tone,
} from '../../components/ui/primitives';
import { IconSpark } from '../../components/layout/icons';

/**
 * HO SO HOC VIEN
 *
 * Mot noi duy nhat gom toan bo dau vet hoc tap, va tu do sinh ra lo trinh ca
 * nhan hoa. Moi buoc trong lo trinh deu hien LY DO ben canh — de nguoi hoc
 * biet vi sao he thong bao lam viec do, chu khong phai lam theo mot cach mu quang.
 */

const ERROR_TONE: Record<ErrorType, Tone> = {
  knowledge: 'bad',
  skill: 'warn',
  tactic: 'warn',
  lucky: 'warn',
  clean: 'ok',
};

export function ProfilePage() {
  const state = useAppState();
  const dossier = useMemo(() => buildDossier(state), [state]);
  const trend = scoreHistory(state);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'worksheet' | 'exam'>('all');

  const history = dossier.history.filter((h) => historyFilter === 'all' || h.kind === historyFilter);
  const gap = dossier.target - dossier.projected;
  const problems = dossier.errorCounts.knowledge + dossier.errorCounts.skill + dossier.errorCounts.tactic;

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <Badge tone="brand">Hồ sơ học viên</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{state.profile.displayName}</h1>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Mọi lượt làm phiếu và bài thi thử đều được lưu lại đầy đủ — đề, đáp án bạn đã chọn, thời gian từng câu.
          Nhờ vậy bạn mở lại bộ giải đề của một phiếu đã làm ba tháng trước và vẫn thấy đúng bộ câu, đúng phương án
          mình đã chọn lúc đó. Lộ trình bên dưới được sinh ra từ chính hồ sơ này.
        </p>
      </header>

      {/* Vị trí hiện tại */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Điểm dự báo"
          value={formatScore(dossier.projected)}
          tone="brand"
          hint={`mục tiêu ${dossier.target}/${MAX_TOTAL_SCORE}`}
        />
        <Stat
          label="Còn thiếu"
          value={gap > 0 ? formatScore(gap) : 'Đã đạt'}
          tone={gap > 0 ? 'warn' : 'ok'}
          hint={dossier.daysLeft === null ? 'chưa đặt ngày thi' : `còn ${dossier.daysLeft} ngày`}
        />
        <Stat
          label="Tầng hấp thu"
          value={`${dossier.tierId} — ${dossier.tierName}`}
          hint={`Cấp hành động ${dossier.actionLevelId} ${dossier.actionLevelName}`}
        />
        <Stat
          label="Đã tích lũy"
          value={`${formatNumber(dossier.totalQuestions)} câu`}
          hint={`${formatNumber(Math.round(dossier.totalMinutes / 60))} giờ · ${dossier.sessions} lượt làm`}
        />
      </div>

      {/* Lộ trình cá nhân hóa */}
      <Card className="border-brand-line bg-brand-soft">
        <CardHeader
          title="Lộ trình cá nhân hóa của bạn"
          subtitle="Thứ tự các bước theo đúng logic chữa bệnh: cầm máu trước, chữa đúng loại lỗi, dồn sức đúng chỗ, rồi mới mài sở trường."
          action={
            <Badge tone="brand">
              <IconSpark className="size-3.5" />
              {dossier.roadmap.reduce((n, s) => n + s.minutes, 0)} phút
            </Badge>
          }
        />
        <ol className="space-y-3">
          {dossier.roadmap.map((step) => (
            <li key={step.id} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-sm font-semibold text-white">
                  {step.order}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-fg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    <strong className="font-medium text-fg">Vì sao:</strong> {step.reason}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    <strong className="font-medium text-fg">Việc cần làm:</strong> {step.action}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {step.minutes > 0 && (
                    <span className="text-xs tabular-nums text-fg-subtle">{step.minutes}′</span>
                  )}
                  {step.href && (
                    <Button size="sm" onClick={() => navigate(step.href!.replace(/^#/, ''))}>
                      Làm ngay
                    </Button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* Chân dung lỗi */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Chân dung lỗi trên toàn hồ sơ"
            subtitle={
              problems === 0
                ? 'Chưa ghi nhận lỗi nào — hồ sơ còn ít dữ liệu hoặc bạn đang làm rất tốt.'
                : `Tổng ${problems} câu chưa đạt. Loại lỗi chiếm ưu thế quyết định cách chữa.`
            }
          />
          <ul className="space-y-3">
            {(['knowledge', 'skill', 'tactic', 'lucky', 'clean'] as ErrorType[]).map((type) => {
              const count = dossier.errorCounts[type];
              const total = Object.values(dossier.errorCounts).reduce((a, b) => a + b, 0);
              const ratio = total > 0 ? count / total : 0;
              return (
                <li key={type}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <Badge tone={ERROR_TONE[type]}>{ERROR_LABEL[type]}</Badge>
                    <span className="tabular-nums text-fg-muted">
                      {count} câu · {formatPercent(ratio, 0)}
                    </span>
                  </div>
                  <Progress
                    value={ratio * 100}
                    tone={ERROR_TONE[type]}
                    className="mt-1.5"
                    label={`${ERROR_LABEL[type]}: ${count} câu`}
                  />
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <CardHeader
            title="Lỗ hổng kiến thức"
            subtitle="Chỉ những chuyên đề sai lặp lại từ 2 câu trở lên — một câu sai là tai nạn, sai lặp lại mới là lỗ hổng."
          />
          {dossier.gaps.length === 0 ? (
            <p className="text-sm text-fg-muted">
              Chưa phát hiện lỗ hổng nào lặp lại. Tiếp tục làm thêm phiếu để hệ thống có đủ dữ liệu.
            </p>
          ) : (
            <>
              <BarList
                max={1}
                format={(v) => formatPercent(v, 0)}
                data={dossier.gaps.slice(0, 6).map((g) => ({
                  label: g.label,
                  value: g.ratio,
                  hint: `sai ${g.wrong}/${g.total} câu`,
                }))}
              />
              {dossier.gaps[0]?.trapsHit[0] && (
                <p className="mt-4 rounded-lg border-l-4 border-l-bad bg-bad-soft p-3 text-sm leading-relaxed text-bad">
                  <strong>Bẫy đã mắc nhiều nhất:</strong> {dossier.gaps[0].trapsHit[0]}
                </p>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Đường đi của điểm số */}
      {trend.length >= 2 && (
        <Card>
          <CardHeader title="Đường đi của điểm số" subtitle="Đường nét đứt là mục tiêu của bạn." />
          <TrendLine
            points={trend.map((h, i) => ({ label: `Lần ${i + 1}`, value: h.total }))}
            max={MAX_TOTAL_SCORE}
            target={dossier.target}
          />
        </Card>
      )}

      {/* Mốc theo tuần */}
      {dossier.milestones.length > 0 && (
        <Card>
          <CardHeader
            title="Mốc theo tuần đến ngày thi"
            subtitle="Điểm mục tiêu của mỗi tuần được tính để bạn chạm đích đúng ngày thi."
          />
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {dossier.milestones.slice(0, 9).map((m) => (
              <li key={m.weekIndex} className="rounded-lg border border-line bg-surface-2 p-3">
                <p className="text-sm font-medium text-fg">{m.label}</p>
                <p className="mt-0.5 text-xs tabular-nums text-brand">
                  {formatScore(m.targetScore)}/{MAX_TOTAL_SCORE}
                </p>
                {m.focusTopics.length > 0 && (
                  <p className="mt-1 text-xs text-fg-subtle">{m.focusTopics.join(', ')}</p>
                )}
              </li>
            ))}
          </ol>
        </Card>
      )}

      {/* Nhật ký học tập */}
      <Card>
        <CardHeader
          title={`Nhật ký học tập (${dossier.history.length} lượt)`}
          subtitle="Mọi lượt làm đều mở lại được bộ giải đề và bảng phân tích, bất kể đã làm từ bao lâu."
          action={
            <Segmented
              label="Lọc theo loại"
              value={historyFilter}
              onChange={setHistoryFilter}
              options={[
                { value: 'all', label: 'Tất cả' },
                { value: 'worksheet', label: 'Phiếu luyện' },
                { value: 'exam', label: 'Thi thử' },
              ]}
            />
          }
        />

        {history.length === 0 ? (
          <EmptyState
            title="Chưa có lượt làm nào"
            description="Hoàn thành một phiếu luyện, hệ thống sẽ lưu lại toàn bộ bài làm để bạn xem đáp án và phân tích bất cứ lúc nào."
            action={
              <Button variant="primary" onClick={() => navigate('/practice')}>
                Tới thư viện phiếu luyện
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-line">
            {history.slice(0, 40).map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium text-fg">
                    <Badge tone={item.kind === 'exam' ? 'brand' : 'neutral'}>
                      {item.kind === 'exam' ? 'Thi thử' : 'Phiếu luyện'}
                    </Badge>
                    <span className="truncate">{item.title}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-fg-subtle">
                    {formatDateTime(item.at)}
                    {item.subtitle ? ` · ${item.subtitle}` : ''}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 text-sm font-medium tabular-nums',
                    item.ratio >= 0.85 ? 'text-ok' : item.ratio >= 0.7 ? 'text-fg' : 'text-bad',
                  )}
                >
                  {item.correct}/{item.total}
                </span>
                <Button size="sm" onClick={() => navigate(item.href.replace(/^#/, ''))}>
                  Xem đáp án &amp; phân tích
                </Button>
              </li>
            ))}
          </ul>
        )}

        {dossier.history.length > 40 && (
          <p className="mt-3 text-xs text-fg-subtle">Đang hiển thị 40 lượt gần nhất.</p>
        )}
      </Card>

      <Card>
        <CardHeader
          title="Hồ sơ này thuộc về bạn"
          subtitle="Toàn bộ dữ liệu nằm trên thiết bị này. Xuất ra tệp JSON để sao lưu hoặc chuyển sang máy khác."
          action={
            <Button onClick={() => navigate('/settings')}>Xuất hồ sơ</Button>
          }
        />
        <p className="text-sm text-fg-muted">
          {dossier.firstActivity
            ? `Bắt đầu từ ${formatDateTime(dossier.firstActivity)} · hoạt động gần nhất ${formatDateTime(
                dossier.lastActivity ?? dossier.firstActivity,
              )}.`
            : 'Chưa có hoạt động nào được ghi nhận.'}{' '}
          Hệ thống giữ tối đa 300 lượt làm phiếu gần nhất để hồ sơ không phình vô hạn.
        </p>
      </Card>
    </div>
  );
}
