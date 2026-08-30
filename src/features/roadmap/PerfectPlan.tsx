import { MAX_TOTAL_SCORE, SECTION_BY_ID } from '../../config';
import {
  CHECK_LAYERS,
  ERROR_CLASSES,
  PERFECT_DISCLAIMER,
  PERFECT_PHASES,
  PERFECT_PILLARS,
} from '../../data/perfect';
import { topicName } from '../../data/topics';
import { formatNumber, formatPercent, formatScore } from '../../lib/format';
import {
  assessPerfect,
  cleanSheetProbability,
  observedErrorRate,
  oneErrorIn,
  perfectMilestones,
} from '../../lib/perfect';
import { useAppState } from '../../store/AppStore';
import { Badge, Card, CardHeader, Progress, Stat } from '../../components/ui/primitives';

/**
 * LO TRINH DIEM TUYET DOI
 *
 * Man hinh nay co mot viec kho phai lam cho dung: vua phuc vu nguoi dat muc
 * tieu 150, vua khong noi doi ho.
 *
 * Cach giai quyet: khong hien "diem du bao" ma hien XAC SUAT lam dung ca 150
 * cau. Con so do trung thuc ve mat toan hoc, va no van la mot con so tang len
 * duoc — nen nguoi hoc van co thu de nham toi va do tien do.
 */
export function PerfectPlan() {
  const state = useAppState();
  const assessment = assessPerfect(state);
  const milestones = perfectMilestones();
  const observed = observedErrorRate(state);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Lộ trình 150 điểm"
          subtitle="Điểm tuyệt đối cần một cách đo khác: không phải điểm dự báo, mà xác suất làm đúng cả 150 câu."
          action={<Badge tone="brand">Mục tiêu tuyệt đối</Badge>}
        />

        <p className="mb-5 rounded-xl border-l-4 border-l-warn bg-warn-soft p-4 text-sm leading-relaxed text-fg">
          {PERFECT_DISCLAIMER}
        </p>

        <div className="grid gap-4 sm:grid-cols-4">
          <Stat
            label="Cơ hội hiện tại"
            value={assessment.chance < 0.001 ? '< 0,1%' : formatPercent(assessment.chance, 1)}
            tone={assessment.chance >= 0.25 ? 'ok' : 'warn'}
            hint="làm đúng cả 150 câu"
          />
          <Stat
            label="Điểm kỳ vọng"
            value={formatScore(assessment.expectedScore)}
            hint={`/${MAX_TOTAL_SCORE}`}
          />
          <Stat
            label="Chuyên đề đạt chuẩn"
            value={`${assessment.topicsAtStandard}/${assessment.totalTopics}`}
            tone={assessment.topicsAtStandard === assessment.totalTopics ? 'ok' : 'warn'}
            hint="ngưỡng của mốc 50%"
          />
          <Stat
            label="Biên lỗi cho phép"
            value={`1/${formatNumber(assessment.oneErrorPer)}`}
            hint="để giữ 50% cơ hội"
          />
        </div>

        {assessment.weakestTopicId ? (
          <p className="mt-4 text-sm text-fg-muted">
            Cả bài chỉ mạnh bằng mắt xích yếu nhất của nó, nên con số trên đo theo{' '}
            <strong className="text-fg">chuyên đề yếu nhất</strong> chứ không theo trung bình. Hiện đó là{' '}
            <strong className="text-fg">{topicName(assessment.weakestTopicId)}</strong> ở mức{' '}
            {formatPercent(assessment.weakestMastery, 1)}. Đề thật lấy câu ở mọi chuyên đề, nên một lỗ hổng duy
            nhất đủ làm hỏng cả bài.
          </p>
        ) : null}
      </Card>

      <Card>
        <CardHeader
          title="Bốn mốc trên đường tới 150"
          subtitle="Mỗi mốc là một cặp yêu cầu: năng lực phải đạt tới đâu, và được phép sai bao nhiêu."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-fg-subtle">
                <th className="pb-2 pr-4 font-medium">Cơ hội đạt 150</th>
                <th className="pb-2 pr-4 font-medium">Thành thạo cần có</th>
                <th className="pb-2 pr-4 font-medium">Điểm kỳ vọng</th>
                <th className="pb-2 font-medium">Biên lỗi bất cẩn</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((m) => (
                <tr key={m.chance} className="border-b border-line/60 last:border-0">
                  <td className="py-2.5 pr-4 font-semibold tabular-nums text-brand">
                    {formatPercent(m.chance, 0)}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-fg">{formatPercent(m.mastery, 2)}</td>
                  <td className="py-2.5 pr-4 tabular-nums text-fg-muted">{formatScore(m.expectedScore)}</td>
                  <td className="py-2.5 tabular-nums text-fg-muted">
                    1 lỗi / {formatNumber(m.oneErrorPer)} câu
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-fg-muted">
          Cột điểm kỳ vọng nói lên điều quan trọng nhất của bảng này: ngay cả ở mốc 80% cơ hội, điểm kỳ vọng vẫn
          là {formatScore(milestones[milestones.length - 1]?.expectedScore ?? 0)} chứ không phải 150. Đạt điểm
          tuyệt đối là thắng một phép thử, không phải chạm một mức trung bình.
        </p>
      </Card>

      <Card>
        <CardHeader
          title="Ba trụ cột — và trụ cột ai cũng bỏ quên"
          subtitle="Kiến thức chỉ là điều kiện cần. Ở vùng điểm trên 140, thứ quyết định là độ chính xác thực thi."
        />
        <div className="space-y-4">
          {PERFECT_PILLARS.map((pillar, i) => (
            <section key={pillar.id} className="rounded-xl border border-line bg-surface-2 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-fg">
                  {i + 1}. {pillar.name}
                </h3>
                <span className="text-xs italic text-fg-subtle">{pillar.question}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{pillar.why}</p>

              <p className="mt-3 rounded-lg bg-surface p-3 text-sm text-fg">
                <strong>Đo bằng:</strong> {pillar.metric}
              </p>

              <ol className="mt-3 space-y-1.5">
                {pillar.protocol.map((step, j) => (
                  <li key={step} className="flex gap-2.5 text-sm text-fg-muted">
                    <span className="mt-0.5 shrink-0 font-mono text-xs text-brand">{j + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-3 border-l-2 border-l-warn pl-3 text-sm leading-relaxed text-fg-muted">
                <strong className="text-fg">Dấu hiệu đây là điểm nghẽn của bạn:</strong> {pillar.bottleneck}
              </p>
            </section>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Vì sao 1% nghe nhỏ mà lại hỏng cả bài"
          subtitle="Xác suất làm sạch cả bài bằng (1 − p) lũy thừa 150. Phép nhân này khuếch đại mọi tỉ lệ sai."
        />
        <ul className="space-y-2.5">
          {[0.02, 0.01, 0.005, 0.002].map((rate) => {
            const chance = cleanSheetProbability(rate);
            return (
              <li key={rate} className="rounded-xl border border-line bg-surface-2 p-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="text-fg">
                    Sai <strong>1 câu trong {formatNumber(oneErrorIn(rate))}</strong> ({formatPercent(rate, 1)})
                  </span>
                  <span className="tabular-nums font-semibold text-fg">
                    {formatPercent(chance, 1)} cơ hội đạt 150
                  </span>
                </div>
                <Progress
                  value={chance * 100}
                  tone={chance >= 0.5 ? 'ok' : chance >= 0.2 ? 'brand' : 'bad'}
                  className="mt-2"
                  label={`Cơ hội với tỉ lệ sai ${formatPercent(rate, 1)}`}
                />
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-sm text-fg-muted">
          {observed === null ? (
            <>
              Cần ít nhất 30 câu ở các chuyên đề đã thành thạo để đo được tỉ lệ sai bất cẩn của bạn. Hệ thống
              chưa đủ dữ liệu nên chưa đưa ra con số — một con số bịa ở đây còn tệ hơn không có con số.
            </>
          ) : (
            <>
              Tỉ lệ sai hiện tại của bạn trên các chuyên đề <strong className="text-fg">đã thành thạo</strong>:{' '}
              <strong className="text-fg">{formatPercent(observed, 2)}</strong>, tức 1 lỗi trong{' '}
              {formatNumber(oneErrorIn(observed))} câu — cho khoảng{' '}
              <strong className="text-fg">{formatPercent(cleanSheetProbability(observed), 1)}</strong> cơ hội làm
              đúng cả bài. Chỉ tính trên chuyên đề đã thành thạo, vì sai ở chuyên đề chưa học là lỗ hổng kiến
              thức chứ không phải lỗi bất cẩn.
            </>
          )}
        </p>
      </Card>

      <Card>
        <CardHeader
          title="Bốn nhóm lỗi thực thi và thao tác chống lại"
          subtitle="Phân loại được thì chống được. Một cuốn sổ ghi &quot;hôm nay sai 3 câu&quot; không dẫn tới hành động nào."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {ERROR_CLASSES.map((cls) => (
            <article key={cls.id} className="rounded-xl border border-line bg-surface-2 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-fg">{cls.name}</h3>
                <span className="text-xs text-fg-subtle">
                  {cls.common.map((s) => SECTION_BY_ID[s].shortName).join(' · ')}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                <strong className="text-fg">Nhận ra:</strong> {cls.tell}
              </p>
              <p className="mt-2 rounded-lg border-l-4 border-l-ok bg-ok-soft p-2.5 text-sm leading-relaxed text-fg">
                <strong>Chống bằng:</strong> {cls.guard}
              </p>
            </article>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Quy trình kiểm tra ba lớp"
          subtitle="Kiểm lại cả bài ở cuối giờ là cách kém hiệu quả nhất: lúc đó đã mệt, và đọc lại lời giải của chính mình thì não có xu hướng xác nhận chứ không tìm lỗi."
        />
        <ol className="space-y-3">
          {CHECK_LAYERS.map((layer) => (
            <li key={layer.name} className="rounded-xl border border-line bg-surface-2 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-fg">{layer.name}</h3>
                <Badge>
                  {layer.seconds < 60 ? `${layer.seconds} giây` : `${Math.round(layer.seconds / 60)} phút`}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-fg-subtle">{layer.when}</p>
              <ul className="mt-2.5 space-y-1.5">
                {layer.actions.map((action) => (
                  <li key={action} className="flex gap-2.5 text-sm text-fg-muted">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                <strong className="text-fg">Bắt được:</strong> {layer.catches}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <CardHeader
          title="Bốn giai đoạn của lộ trình tuyệt đối"
          subtitle="Khác lộ trình thông thường ở một chỗ: quá nửa đường thì thêm giờ học kiến thức không còn là thứ nâng điểm lên nữa."
        />
        <ol className="space-y-3">
          {PERFECT_PHASES.map((phase) => {
            const pillar = PERFECT_PILLARS.find((p) => p.id === phase.focus);
            return (
              <li key={phase.order} className="rounded-xl border border-line bg-surface-2 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-fg">
                    Giai đoạn {phase.order} — {phase.name}
                  </h3>
                  <span className="text-xs text-fg-subtle">
                    {formatPercent(phase.share, 0)} quỹ · trụ cột {pillar?.name}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{phase.goal}</p>
                <p className="mt-2 rounded-lg bg-surface p-2.5 text-sm text-fg">
                  <strong>Điều kiện qua giai đoạn:</strong> {phase.exit}
                </p>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
