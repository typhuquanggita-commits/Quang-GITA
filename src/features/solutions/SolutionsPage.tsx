import { useMemo, useState } from 'react';
import { SECTION_BY_ID } from '../../config';
import { findQuestion } from '../../data/questions';
import { worksheetById } from '../../data/worksheets';
import { missionForWorksheet } from '../../data/missions';
import { formatDateTime, formatPercent } from '../../lib/format';
import { analyze, buildSolutionSheet, type SolutionEntry } from '../../lib/solutions';
import { navigate, useRoute } from '../../lib/router';
import { useAppState } from '../../store/AppStore';
import type { Response } from '../../types';
import { Badge, Button, Card, CardHeader, EmptyState, Segmented } from '../../components/ui/primitives';
import { AnalysisPanel } from './AnalysisTable';
import { SolutionSheet } from './SolutionSheet';

/**
 * MAN HINH DAP AN & PHAN TICH
 *
 * Mo duoc tu ba noi: ngay sau khi nop bai, tu lich su thi thu, va tu ho so hoc
 * vien. Vi lich su tung luot lam duoc luu lai day du, nguoi hoc mo lai bo giai
 * de cua mot phieu da lam ba thang truoc va van thay dung bo cau, dung dap an
 * minh da chon luc do.
 *
 * Duong dan chap nhan ba dang tham so:
 *   ?run=<runId>            mot luot lam phieu cu the
 *   ?worksheet=<sheetId>    luot gan nhat cua phieu do
 *   ?attempt=<attemptId>    mot bai thi thu
 */
export function SolutionsPage() {
  const route = useRoute();
  const state = useAppState();
  const [tab, setTab] = useState<'analysis' | 'solutions'>('analysis');

  const source = useMemo(() => resolveSource(state, route.params), [state, route.params]);

  const entries: SolutionEntry[] = useMemo(
    () => (source ? buildSolutionSheet(source.questionIds, source.responses) : []),
    [source],
  );
  const analysis = useMemo(() => analyze(entries), [entries]);

  if (!source || entries.length === 0) {
    return (
      <EmptyState
        icon="📄"
        title="Không tìm thấy bài làm"
        description="Đường dẫn không trỏ tới lượt làm nào, hoặc dữ liệu của lượt đó đã bị xóa. Mở hồ sơ học viên để chọn lại một bài đã làm."
        action={
          <Button variant="primary" onClick={() => navigate('/profile')}>
            Mở hồ sơ học viên
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Badge tone="brand">{source.kindLabel}</Badge>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{source.title}</h1>
          <p className="mt-1 text-sm text-fg-muted">
            {formatDateTime(source.submittedAt)} · {analysis.correct}/{analysis.total} câu ·{' '}
            {formatPercent(analysis.ratio, 1)}
            {source.subtitle ? ` · ${source.subtitle}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Segmented
            label="Chế độ xem"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'analysis', label: 'Bảng phân tích' },
              { value: 'solutions', label: 'Xem đáp án' },
            ]}
          />
          <Button onClick={() => navigate('/profile')}>Hồ sơ học viên</Button>
        </div>
      </header>

      {tab === 'analysis' ? (
        <>
          <AnalysisPanel analysis={analysis} entries={entries} />
          <Card className="border-brand-line bg-brand-soft">
            <CardHeader
              title="Đọc lời giải là bước tạo ra tiến bộ"
              subtitle="Bảng phân tích cho biết vấn đề nằm ở đâu; bộ giải đề cho biết phải sửa như thế nào."
              action={
                <Button variant="primary" onClick={() => setTab('solutions')}>
                  Xem đáp án &amp; kiến thức liên quan
                </Button>
              }
            />
          </Card>
        </>
      ) : (
        <SolutionSheet entries={entries} apiKey={state.settings.aiApiKey} />
      )}
    </div>
  );
}

interface SolutionSource {
  title: string;
  subtitle?: string;
  kindLabel: string;
  submittedAt: number;
  questionIds: string[];
  responses: Record<string, Response>;
}

function resolveSource(
  state: ReturnType<typeof useAppState>,
  params: URLSearchParams,
): SolutionSource | null {
  const runId = params.get('run');
  const worksheetParam = params.get('worksheet');
  const attemptId = params.get('attempt');

  if (attemptId) {
    const attempt = state.attempts.find((a) => a.id === attemptId);
    if (!attempt) return null;
    const result = state.results.find((r) => r.attemptId === attemptId);
    return {
      title: attempt.label,
      subtitle: attempt.sections
        .map((s) => SECTION_BY_ID[s.section].shortName)
        .join(' · '),
      kindLabel: 'Bài thi thử',
      submittedAt: result?.submittedAt ?? attempt.submittedAt ?? attempt.createdAt,
      questionIds: attempt.sections.flatMap((s) => s.questionIds),
      responses: attempt.responses,
    };
  }

  const run =
    (runId ? state.worksheetRuns.find((r) => r.id === runId) : undefined) ??
    (worksheetParam
      ? [...state.worksheetRuns].reverse().find((r) => r.worksheetId === worksheetParam)
      : undefined);

  if (!run) return null;
  const sheet = worksheetById(run.worksheetId);
  const mission = missionForWorksheet(run.worksheetId);

  return {
    title: sheet?.title ?? run.worksheetId,
    subtitle: [sheet?.code, mission?.code].filter(Boolean).join(' · '),
    kindLabel: 'Phiếu luyện',
    submittedAt: run.submittedAt,
    questionIds: sheet
      ? sheet.parts.flatMap((p) => p.questionIds)
      : Object.keys(run.responses).filter((id) => findQuestion(id)),
    responses: run.responses,
  };
}
