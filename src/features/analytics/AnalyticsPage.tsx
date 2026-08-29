import { useMemo } from 'react';
import { DIFFICULTY_LABEL, MAX_TOTAL_SCORE, SECTIONS, SECTION_BY_ID } from '../../config';
import { findQuestion } from '../../data/questions';
import { TOPICS } from '../../data/topics';
import { expectedAccuracy } from '../../lib/ability';
import { masteryToAbility } from '../../lib/analytics';
import { formatNumber, formatPercent, formatScore } from '../../lib/format';
import { isCorrect } from '../../lib/scoring';
import { trackStatus } from '../../lib/progression';
import { useAppState } from '../../store/AppStore';
import { readinessOf, sectionProgress } from '../../store/selectors';
import { BarList, DataTable, RadarChart } from '../../components/charts';
import { Badge, Card, CardHeader, EmptyState, Stat } from '../../components/ui/primitives';
import { PermissionGate } from '../../components/PermissionGate';

/**
 * PHAN TICH NANG LUC
 *
 * Muc tieu: bien du lieu tho thanh cau tra loi cho ba cau hoi —
 * yeu o dau, sai vi sao, va con bao xa toi muc tieu.
 */
export function AnalyticsPage() {
  return (
    <PermissionGate permission="learn.analytics" title="Chưa mở quyền xem phân tích">
      <AnalyticsContent />
    </PermissionGate>
  );
}

function AnalyticsContent() {
  const state = useAppState();
  const readiness = readinessOf(state);
  const subject = state.settings.scienceSubject;

  const topics = useMemo(
    () => TOPICS.filter((t) => t.section !== 'science' || t.subject === subject),
    [subject],
  );

  /** Thống kê theo độ khó và theo mức tự tin, gộp từ mọi bài đã nộp. */
  const stats = useMemo(() => {
    const byDifficulty = new Map<number, { correct: number; total: number }>();
    const byConfidence = new Map<string, { correct: number; total: number }>();
    let totalTime = 0;
    let totalAnswered = 0;

    for (const attempt of state.attempts) {
      if (attempt.status !== 'submitted') continue;
      for (const run of attempt.sections) {
        for (const id of run.questionIds) {
          const question = findQuestion(id);
          if (!question) continue;
          const response = attempt.responses[id];
          const ok = isCorrect(question, response?.value ?? null);

          const d = byDifficulty.get(question.difficulty) ?? { correct: 0, total: 0 };
          d.total += 1;
          if (ok) d.correct += 1;
          byDifficulty.set(question.difficulty, d);

          const key = response?.confidence ?? 'none';
          const c = byConfidence.get(key) ?? { correct: 0, total: 0 };
          c.total += 1;
          if (ok) c.correct += 1;
          byConfidence.set(key, c);

          totalTime += response?.timeSpentMs ?? 0;
          if (response?.value) totalAnswered += 1;
        }
      }
    }
    return { byDifficulty, byConfidence, totalTime, totalAnswered };
  }, [state.attempts]);

  const hasData = Object.keys(state.mastery).length > 0;

  if (!hasData) {
    return (
      <EmptyState
        icon="📊"
        title="Chưa có dữ liệu để phân tích"
        description="Hoàn thành ít nhất một phiếu luyện hoặc một đề thi thử, hệ thống sẽ dựng bản đồ năng lực chi tiết theo từng chuyên đề."
      />
    );
  }

  const radarAxes = SECTIONS.flatMap((spec) =>
    topics.filter((t) => t.section === spec.id).map((t) => shortName(t.name)),
  );
  const radarValues = SECTIONS.flatMap((spec) =>
    topics.filter((t) => t.section === spec.id).map((t) => state.mastery[t.id]?.mastery ?? 0.5),
  );
  const targetRatio = state.settings.targetScore / MAX_TOTAL_SCORE;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Phân tích năng lực</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-fg-muted">
          Số liệu ở đây dùng mô hình Rasch: độ khó của câu được tách khỏi năng lực của bạn, nên 8/10 câu khó và
          8/10 câu dễ cho ra hai kết luận khác nhau.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Chỉ số sẵn sàng" value={`${readiness.score}/100`} tone="brand" />
        <Stat
          label="Tổng thời gian luyện"
          value={`${Math.round(stats.totalTime / 3600000)} giờ`}
          hint={`${formatNumber(stats.totalAnswered)} câu đã trả lời`}
        />
        <Stat
          label="Chuyên đề đã luyện"
          value={`${Object.values(state.mastery).filter((m) => m.attempts > 0).length}/${topics.length}`}
        />
        <Stat label="Kinh nghiệm" value={formatNumber(state.xp)} tone="ok" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Bản đồ năng lực"
            subtitle="Vòng trong là mức hiện tại, vòng ngoài là mức cần đạt để chạm mục tiêu."
          />
          <RadarChart
            axes={radarAxes}
            series={[
              { name: 'Mức cần đạt', colorIndex: 1, values: radarValues.map(() => targetRatio) },
              { name: 'Hiện tại', colorIndex: 0, values: radarValues },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="Độ chính xác theo mức độ câu hỏi"
            subtitle="Điểm gãy nằm ở đâu cho biết bạn nên luyện gì tiếp theo."
          />
          {stats.byDifficulty.size === 0 ? (
            <p className="text-sm text-fg-muted">Cần ít nhất một bài thi thử đã nộp để dựng biểu đồ này.</p>
          ) : (
            <>
              <BarList
                max={1}
                format={(v) => formatPercent(v, 0)}
                data={[1, 2, 3, 4, 5].map((difficulty) => {
                  const entry = stats.byDifficulty.get(difficulty);
                  return {
                    label: DIFFICULTY_LABEL[difficulty] ?? String(difficulty),
                    value: entry && entry.total > 0 ? entry.correct / entry.total : 0,
                    hint: entry ? `${entry.correct}/${entry.total} câu` : 'chưa có dữ liệu',
                  };
                })}
              />
              <p className="mt-4 text-xs text-fg-subtle">
                Đúng cao ở mức nhận biết nhưng tụt mạnh ở vận dụng là dấu hiệu học thuộc chứ chưa hiểu bản chất.
              </p>
            </>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Hiệu chuẩn mức tự tin"
          subtitle="So sánh mức tự tin bạn khai báo với kết quả thực tế. Lệch nhiều là dấu hiệu nguy hiểm."
        />
        {stats.byConfidence.size === 0 ? (
          <p className="text-sm text-fg-muted">Chọn mức tự tin khi làm bài để bật phân tích này.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { key: 'sure', label: 'Chắc chắn', expect: 'Nên đúng trên 90%' },
              { key: 'unsure', label: 'Chưa chắc', expect: 'Thường 50–70%' },
              { key: 'guess', label: 'Đoán', expect: 'Khoảng 25% nếu đoán thật' },
            ].map((row) => {
              const entry = stats.byConfidence.get(row.key);
              const ratio = entry && entry.total > 0 ? entry.correct / entry.total : null;
              const alarming = row.key === 'sure' && ratio !== null && ratio < 0.8;
              return (
                <div key={row.key} className="rounded-xl border border-line bg-surface-2 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-fg">{row.label}</p>
                    {alarming && <Badge tone="bad">Cần chú ý</Badge>}
                  </div>
                  <p className="mt-2 text-2xl font-semibold tabular-nums">
                    {ratio === null ? '—' : formatPercent(ratio, 0)}
                  </p>
                  <p className="mt-1 text-xs text-fg-subtle">
                    {entry ? `${entry.correct}/${entry.total} câu · ` : ''}
                    {row.expect}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card>
        <CardHeader
          title="Chi tiết từng chuyên đề"
          subtitle="Cột điểm ước lượng cho biết bạn sẽ được bao nhiêu nếu cả đề chỉ gồm chuyên đề đó."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Chuyên đề</th>
                <th scope="col" className="px-2 py-2">Phần</th>
                <th scope="col" className="px-2 py-2">Cấp</th>
                <th scope="col" className="px-2 py-2 text-right">Số câu</th>
                <th scope="col" className="px-2 py-2 text-right">Đúng</th>
                <th scope="col" className="px-2 py-2 text-right">Thành thạo</th>
                <th scope="col" className="px-2 py-2 text-right">Điểm ước lượng /50</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => {
                const record = state.mastery[topic.id];
                const mastery = record?.mastery ?? 0.5;
                const projected = expectedAccuracy(masteryToAbility(mastery)) * 50;
                return (
                  <tr key={topic.id} className="border-b border-line/60 last:border-0">
                    <td className="px-2 py-2 text-fg">{topic.name}</td>
                    <td className="px-2 py-2 text-fg-muted">{SECTION_BY_ID[topic.section].shortName}</td>
                    <td className="px-2 py-2 tabular-nums text-fg-muted">{trackStatus(state, topic.id).level}</td>
                    <td className="px-2 py-2 text-right tabular-nums text-fg-muted">{record?.attempts ?? 0}</td>
                    <td className="px-2 py-2 text-right tabular-nums text-fg-muted">{record?.correct ?? 0}</td>
                    <td className="px-2 py-2 text-right tabular-nums text-fg">{formatPercent(mastery, 0)}</td>
                    <td className="px-2 py-2 text-right tabular-nums font-medium text-fg">
                      {formatScore(projected)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Tóm tắt theo phần thi" />
        <DataTable
          caption="Năng lực theo từng phần thi"
          head={['Phần thi', 'Thành thạo', 'Chuyên đề đã luyện', 'Điểm ước lượng']}
          rows={sectionProgress(state).map((entry) => [
            entry.spec.name,
            formatPercent(entry.mastery, 0),
            `${entry.practiced}/${entry.topics}`,
            `${formatScore(entry.mastery * 50)}/50`,
          ])}
        />
      </Card>
    </div>
  );
}

/** Rút gọn tên chuyên đề cho nhãn quanh biểu đồ radar. */
function shortName(name: string): string {
  const first = name.split(/[,&—-]/)[0]?.trim() ?? name;
  return first.length > 18 ? `${first.slice(0, 17)}…` : first;
}
