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
        heading="h1"
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
          <Badge tone="brand">
            {source.kindLabel}
            {source.code ? ` · ${source.code}` : ''}
          </Badge>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{source.title}</h1>
          <p className="mt-1 text-sm text-fg-muted">
            {source.attempted && source.submittedAt !== null
              ? `${formatDateTime(source.submittedAt)} · ${analysis.correct}/${analysis.total} câu · ${formatPercent(analysis.ratio, 1)}`
              : `${entries.length} câu · tài liệu lời giải đi kèm phiếu luyện`}
            {source.subtitle ? ` · ${source.subtitle}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {source.attempted && (
            <Segmented
              label="Chế độ xem"
              value={tab}
              onChange={setTab}
              options={[
                { value: 'analysis', label: 'Bảng phân tích' },
                { value: 'solutions', label: 'Xem đáp án' },
              ]}
            />
          )}
          <Button onClick={() => navigate('/profile')}>Hồ sơ học viên</Button>
        </div>
      </header>

      {!source.attempted && (
        <Card className="border-warn/40 bg-warn-soft">
          <h2 className="text-base font-semibold text-warn">Bạn chưa làm phiếu này</h2>
          <p className="mt-2 text-sm leading-relaxed text-fg">
            Đây là phiếu lời giải đi kèm, mở được như một tài liệu độc lập. Nhưng đọc lời giải trước khi làm sẽ
            xóa mất giá trị chẩn đoán: hệ thống không thể biết bạn sai vì kiến thức, vì kỹ năng hay vì chiến
            thuật. Bảng phân tích chuyên sâu vì vậy chỉ mở sau khi bạn nộp bài lần đầu.
          </p>
          <p className="mt-3">
            <Button
              variant="primary"
              onClick={() => navigate(`/worksheet?id=${encodeURIComponent(route.params.get('worksheet') ?? '')}`)}
            >
              Làm phiếu trước
            </Button>
          </p>
        </Card>
      )}

      {source.attempted && tab === 'analysis' ? (
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
  /** Ma cua phieu loi giai, vi du LG-TOA-ARI-L1-001. */
  code: string | null;
  submittedAt: number | null;
  /** false = mo phieu loi giai nhu mot tai lieu, chua tung lam bai. */
  attempted: boolean;
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
      code: null,
      attempted: true,
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

  if (run) {
    const sheet = worksheetById(run.worksheetId);
    const mission = missionForWorksheet(run.worksheetId);
    return {
      title: sheet?.title ?? run.worksheetId,
      subtitle: [sheet?.code, mission?.code].filter(Boolean).join(' · '),
      kindLabel: 'Phiếu luyện',
      code: sheet?.solutionCode ?? null,
      attempted: true,
      submittedAt: run.submittedAt,
      questionIds: sheet
        ? sheet.parts.flatMap((p) => p.questionIds)
        : Object.keys(run.responses).filter((id) => findQuestion(id)),
      responses: run.responses,
    };
  }

  // Chua tung lam phieu nay: van mo duoc phieu loi giai nhu mot TAI LIEU rieng,
  // nhung khong co du lieu ca nhan nen bang phan tich bi tat.
  if (worksheetParam) {
    const sheet = worksheetById(worksheetParam);
    if (!sheet) return null;
    return {
      title: sheet.title,
      subtitle: [sheet.code, missionForWorksheet(sheet.id)?.code].filter(Boolean).join(' · '),
      kindLabel: 'Phiếu lời giải',
      code: sheet.solutionCode,
      attempted: false,
      submittedAt: null,
      questionIds: sheet.parts.flatMap((p) => p.questionIds),
      responses: {},
    };
  }

  return null;
}
