import { useMemo, useState } from 'react';
import { cn } from '../../lib/cn';
import { formatClock, formatPercent } from '../../lib/format';
import { ERROR_LABEL, ERROR_MEANING, type SolutionEntry } from '../../lib/solutions';
import { findQuestion } from '../../data/questions';
import type { ErrorType } from '../../types';
import { Badge, Card, CardHeader, Segmented, type Tone } from '../../components/ui/primitives';
import { IconClock } from '../../components/layout/icons';
import { QuestionView } from '../exam/QuestionView';

/**
 * BO GIAI DE
 *
 * Moi cau duoc trinh bay day du: de bai, phuong an da chon, dap an dung, loi
 * giai chinh thuc, ly do phuong an da chon lai sai, phieu kien thuc lien quan,
 * va cau tuong tu de luyen lai ngay.
 *
 * Bo loc mac dinh la "chi cau chua dat" — vi doc lai cau da lam dung khong tao
 * ra tien bo, con doc ky cau sai thi co.
 */

const ERROR_TONE: Record<ErrorType, Tone> = {
  knowledge: 'bad',
  skill: 'warn',
  tactic: 'warn',
  lucky: 'warn',
  clean: 'ok',
};

type Filter = 'problems' | 'all' | 'flagged';

export function SolutionSheet({
  entries,
  apiKey,
  title = 'Bộ giải đề chi tiết',
}: {
  entries: readonly SolutionEntry[];
  apiKey: string;
  title?: string;
}) {
  const [filter, setFilter] = useState<Filter>('problems');

  const shown = useMemo(() => {
    if (filter === 'all') return entries;
    if (filter === 'flagged') return entries.filter((e) => e.response?.flagged);
    return entries.filter((e) => e.errorType !== 'clean');
  }, [entries, filter]);

  const problems = entries.filter((e) => e.errorType !== 'clean').length;
  const flagged = entries.filter((e) => e.response?.flagged).length;

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle="Đọc kỹ phần này quan trọng hơn con số điểm. Mỗi câu đều kèm lý do vì sao phương án bạn chọn lại sai, và kiến thức cần ôn lại."
        action={
          <Segmented
            label="Lọc câu hiển thị"
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'problems', label: `Cần xem lại (${problems})` },
              { value: 'flagged', label: `Đã đánh dấu (${flagged})` },
              { value: 'all', label: `Tất cả (${entries.length})` },
            ]}
          />
        }
      />

      {shown.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line px-6 py-10 text-center text-sm text-fg-muted">
          {filter === 'problems'
            ? 'Không có câu nào cần xem lại — bạn làm đúng, tự tin và kịp giờ ở tất cả các câu.'
            : 'Không có câu nào trong nhóm này.'}
        </p>
      ) : (
        <ol className="space-y-8">
          {shown.map((entry) => (
            <li key={entry.question.id}>
              <SolutionCard entry={entry} total={entries.length} apiKey={apiKey} />
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

function SolutionCard({
  entry,
  total,
  apiKey,
}: {
  entry: SolutionEntry;
  total: number;
  apiKey: string;
}) {
  const [showKnowledge, setShowKnowledge] = useState(false);
  const slow = entry.timeRatio > 1.25;

  return (
    <article className="rounded-xl border border-line bg-surface-2 p-5">
      <header className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone={ERROR_TONE[entry.errorType]}>{ERROR_LABEL[entry.errorType]}</Badge>
        <Badge tone="neutral">{entry.topicLabel}</Badge>
        <Badge tone="neutral">{entry.difficultyLabel}</Badge>
        {entry.response?.confidence && (
          <Badge tone="neutral">
            Bạn tự đánh giá:{' '}
            {entry.response.confidence === 'sure'
              ? 'chắc chắn'
              : entry.response.confidence === 'unsure'
                ? 'chưa chắc'
                : 'đoán'}
          </Badge>
        )}
        <span
          className={cn(
            'ml-auto inline-flex items-center gap-1.5 text-xs tabular-nums',
            slow ? 'text-warn' : 'text-fg-subtle',
          )}
        >
          <IconClock className="size-3.5" />
          {formatClock(entry.timeSeconds)} / mục tiêu {formatClock(entry.targetSeconds)}
          {entry.timeRatio > 0 && ` (${formatPercent(entry.timeRatio, 0)})`}
        </span>
      </header>

      <p className="mb-4 rounded-lg bg-surface p-3 text-sm leading-relaxed text-fg-muted">
        {ERROR_MEANING[entry.errorType]}
      </p>

      <QuestionView
        question={entry.question}
        response={entry.response}
        index={entry.index}
        total={total}
        onAnswer={() => undefined}
        onConfidence={() => undefined}
        onToggleFlag={() => undefined}
        reveal
        locked
        showConfidence={false}
        apiKey={apiKey}
      />

      {entry.knowledge && (
        <div className="mt-5 rounded-xl border border-line bg-surface">
          <button
            type="button"
            onClick={() => setShowKnowledge((v) => !v)}
            aria-expanded={showKnowledge}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <span className="text-sm font-semibold text-fg">
              Kiến thức liên quan — {entry.topicLabel}
            </span>
            <span className="text-sm text-fg-subtle">{showKnowledge ? 'Thu gọn' : 'Mở rộng'}</span>
          </button>

          {showKnowledge && (
            <div className="space-y-4 border-t border-line px-4 py-4">
              <KnowledgeBlock title="Ý lõi phải hiểu" items={entry.knowledge.coreIdeas} />
              <KnowledgeBlock title="Công thức phải thuộc" items={entry.knowledge.formulas} mono />

              <div>
                <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
                  Dạng bài thường gặp
                </h4>
                <ul className="mt-1.5 space-y-1 text-sm">
                  {entry.knowledge.patterns.map((pattern) => (
                    <li key={pattern.name} className="text-fg-muted">
                      <strong className="text-fg">{pattern.name}</strong> — dấu hiệu: {pattern.cue}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium uppercase tracking-wide text-bad">Bẫy hay mắc</h4>
                <ul className="mt-1.5 space-y-1.5 text-sm">
                  {entry.knowledge.traps.map((trap) => (
                    <li key={trap.trap} className="text-fg-muted">
                      <span className="text-fg">{trap.trap}</span> → <span className="text-ok">{trap.fix}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="rounded-lg bg-surface-2 p-3 text-sm leading-relaxed text-fg-muted">
                <strong className="text-fg">Chiến thuật thời gian:</strong> {entry.knowledge.timing}
              </p>
            </div>
          )}
        </div>
      )}

      {entry.similarIds.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
            Luyện lại ngay — câu cùng dạng
          </h4>
          <ul className="mt-2 space-y-1.5">
            {entry.similarIds.map((id) => {
              const q = findQuestion(id);
              if (!q) return null;
              return (
                <li key={id} className="truncate text-sm text-fg-muted" title={q.stem}>
                  · {q.stem}
                </li>
              );
            })}
          </ul>
          <a
            href={`#/practice?topic=${encodeURIComponent(entry.question.topicId)}`}
            className="mt-2 inline-block text-sm font-medium text-brand underline underline-offset-2"
          >
            Mở phiếu luyện chuyên đề này
          </a>
        </div>
      )}
    </article>
  );
}

function KnowledgeBlock({
  title,
  items,
  mono = false,
}: {
  title: string;
  items: readonly string[];
  mono?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">{title}</h4>
      <ul className="mt-1.5 space-y-1 text-sm">
        {items.map((item) => (
          <li key={item} className={cn('text-fg-muted', mono && 'font-mono text-[0.8125rem]')}>
            · {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
