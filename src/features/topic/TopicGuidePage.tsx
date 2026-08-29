import { useMemo } from 'react';
import { KINDS } from '../../data/curriculum';
import { TOPICS } from '../../data/topics';
import { cn } from '../../lib/cn';
import { formatPercent } from '../../lib/format';
import { ERROR_LABEL } from '../../lib/solutions';
import { buildTopicGuide, type GuideSheetRow } from '../../lib/topicGuide';
import { navigate, useRoute } from '../../lib/router';
import { useAppState } from '../../store/AppStore';
import type { ErrorType } from '../../types';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  Progress,
  Select,
  Stat,
  type Tone,
} from '../../components/ui/primitives';
import { IconCheck } from '../../components/layout/icons';

/**
 * PHIEU HUONG DAN ON CHAC CHUYEN DE
 *
 * Mot phieu cho moi chuyen de. No tra loi cau hoi ma bo giai de khong tra loi
 * duoc: "the nao thi coi la toi da on chac chuyen de nay, va tu day toi phai
 * di qua nhung phieu nao".
 */
export function TopicGuidePage() {
  const route = useRoute();
  const state = useAppState();
  const topicId = route.params.get('id') ?? '';
  const guide = useMemo(() => buildTopicGuide(state, topicId), [state, topicId]);

  const topics = TOPICS.filter(
    (t) => t.section !== 'science' || t.subject === state.settings.scienceSubject,
  );

  if (!guide) {
    return (
      <EmptyState
        icon="📘"
        title="Chọn một chuyên đề"
        description="Mỗi chuyên đề có một phiếu hướng dẫn ôn chắc riêng: kiến thức phải nắm, lộ trình sáu loại phiếu, danh sách kiểm và kế hoạch bảy ngày."
        action={
          <Select
            aria-label="Chọn chuyên đề"
            value=""
            onChange={(e) => navigate(`/topic?id=${encodeURIComponent(e.target.value)}`)}
            className="max-w-sm"
          >
            <option value="">— Chọn chuyên đề —</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
        }
      />
    );
  }

  const metCount = guide.criteria.filter((c) => c.met).length;
  const totalMinutes = guide.plan.reduce((n, d) => n + d.minutes, 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Badge tone="brand">Phiếu hướng dẫn ôn chắc · {guide.guideCode}</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-1.5 text-sm text-fg-muted">
            {guide.sectionName}
            {guide.subjectName ? ` · ${guide.subjectName}` : ''} · tỉ trọng {formatPercent(guide.weight, 0)} trong
            phần thi · {guide.questionCount} câu trong ngân hàng
          </p>
        </div>
        <Select
          aria-label="Đổi chuyên đề"
          value={guide.topicId}
          onChange={(e) => navigate(`/topic?id=${encodeURIComponent(e.target.value)}`)}
          className="w-72"
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
      </header>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat
          label="Đã ôn chắc"
          value={`${metCount}/${guide.criteria.length}`}
          tone={metCount === guide.criteria.length ? 'ok' : metCount >= 5 ? 'brand' : 'warn'}
          hint="tiêu chí đo được, không cảm tính"
        />
        <Stat label="Cấp hiện tại" value={`Cấp ${guide.status.level}`} hint={`của tuyến ${guide.name}`} />
        <Stat
          label="Độ thành thạo"
          value={formatPercent(guide.mastery, 0)}
          tone={guide.mastery >= 0.8 ? 'ok' : guide.mastery >= 0.6 ? 'brand' : 'warn'}
        />
        <Stat
          label="Đã làm"
          value={`${guide.correct}/${guide.attempted}`}
          hint={guide.overdueCards > 0 ? `${guide.overdueCards} câu quá hạn ôn` : 'không có câu quá hạn'}
          tone={guide.overdueCards > 0 ? 'warn' : 'neutral'}
        />
      </div>

      {/* Danh sách kiểm */}
      <Card>
        <CardHeader
          title="Thế nào là đã ôn chắc chuyên đề này"
          subtitle="Tám tiêu chí đo được. Sáu tiêu chí đầu bám theo đúng sáu loại phiếu; hai tiêu chí cuối kiểm độ bền của kiến thức."
        />
        <ol className="space-y-3">
          {guide.criteria.map((criterion, index) => (
            <li
              key={criterion.id}
              className={cn(
                'rounded-xl border p-4',
                criterion.met ? 'border-ok/40 bg-ok-soft' : 'border-line bg-surface-2',
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-lg text-sm font-semibold',
                    criterion.met ? 'bg-ok text-white' : 'bg-canvas-2 text-fg-subtle',
                  )}
                >
                  {criterion.met ? <IconCheck className="size-4" /> : index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">{criterion.label}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{criterion.detail}</p>
                  {!criterion.met && (
                    <Progress
                      value={criterion.progress * 100}
                      tone="brand"
                      className="mt-2"
                      label={criterion.label}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* Kế hoạch 7 ngày */}
      <Card className="border-brand-line bg-brand-soft">
        <CardHeader
          title="Kế hoạch ôn chắc trong 7 ngày"
          subtitle="Sinh từ chính các tiêu chí bạn chưa đạt, theo đúng thứ tự sư phạm — không phải một lịch học chung chung."
          action={<Badge tone="brand">{totalMinutes} phút</Badge>}
        />
        <ol className="space-y-2">
          {guide.plan.map((day) => (
            <li key={day.day} className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-3.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-sm font-semibold text-white">
                {day.day}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-fg">{day.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{day.detail}</p>
              </div>
              {day.minutes > 0 && (
                <span className="shrink-0 text-xs tabular-nums text-fg-subtle">{day.minutes}′</span>
              )}
              {day.href && (
                <Button size="sm" onClick={() => navigate(day.href!.replace(/^#/, ''))}>
                  Mở
                </Button>
              )}
            </li>
          ))}
        </ol>
      </Card>

      {/* Phiếu kiến thức */}
      {guide.knowledge && (
        <Card>
          <CardHeader
            title="Kiến thức phải nắm"
            subtitle="Đây là phần lõi của chuyên đề. Đọc lại phần này trước mỗi phiếu lý thuyết và sau mỗi phiếu thi."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <section>
              <h3 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Ý lõi phải hiểu</h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-fg-muted">
                {guide.knowledge.coreIdeas.map((idea) => (
                  <li key={idea}>· {idea}</li>
                ))}
              </ul>

              <h3 className="mt-5 text-xs font-medium uppercase tracking-wide text-fg-subtle">
                Công thức phải thuộc
              </h3>
              <ul className="mt-2 space-y-1.5 font-mono text-[0.8125rem] text-fg">
                {guide.knowledge.formulas.map((formula) => (
                  <li key={formula} className="rounded bg-surface-2 px-2 py-1">
                    {formula}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
                Dạng bài & dấu hiệu đọc vị
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
                {guide.knowledge.patterns.map((pattern) => (
                  <li key={pattern.name}>
                    <strong className="text-fg">{pattern.name}</strong> — {pattern.cue}
                  </li>
                ))}
              </ul>

              <h3 className="mt-5 text-xs font-medium uppercase tracking-wide text-bad">Bẫy hay mắc</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
                {guide.knowledge.traps.map((trap) => (
                  <li key={trap.trap}>
                    <span className="text-fg">{trap.trap}</span> → <span className="text-ok">{trap.fix}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <p className="mt-5 rounded-lg border-l-4 border-l-brand bg-surface-2 p-3.5 text-sm leading-relaxed text-fg">
            <strong>Chiến thuật thời gian:</strong> {guide.knowledge.timing}
          </p>
        </Card>
      )}

      {/* Lộ trình sáu loại phiếu */}
      <Card>
        <CardHeader
          title="Lộ trình sáu loại phiếu qua sáu cấp độ"
          subtitle="Mỗi phiếu đều đi kèm một phiếu lời giải và bảng phân tích chuyên sâu riêng, mở được sau khi nộp bài."
        />

        <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {KINDS.map((kind) => (
            <div key={kind.kind} className="rounded-lg border border-line bg-surface-2 p-3">
              <p className="text-sm font-medium text-fg">
                <span className="mr-1.5 rounded bg-brand-soft px-1.5 py-0.5 text-xs font-semibold text-brand">
                  {kind.code}
                </span>
                {kind.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-fg-muted">{kind.goal}</p>
              <p className="mt-1.5 text-xs text-fg-subtle">
                <strong>Đạt khi:</strong> {kind.masteryCue}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {guide.ladder.map((row) => (
            <section
              key={row.level}
              className={cn(
                'rounded-xl border p-4',
                row.level === guide.status.level ? 'border-brand-line bg-brand-soft' : 'border-line bg-surface-2',
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-fg">
                  Cấp {row.level} — {row.levelName}
                </h3>
                <span className="text-xs tabular-nums text-fg-muted">
                  hoàn thành {row.passed}/{row.sheets.length} · thành thạo {row.mastered}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-fg-subtle">{row.motto}</p>

              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {row.sheets.map((item) => (
                  <SheetRow key={item.sheet.id} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Card>

      {/* Số liệu cá nhân */}
      {guide.attempted > 0 && (
        <Card>
          <CardHeader
            title="Số liệu của riêng bạn trên chuyên đề này"
            subtitle="Gộp từ mọi phiếu luyện và bài thi thử đã nộp."
          />
          <ul className="grid gap-3 sm:grid-cols-5">
            {(['knowledge', 'skill', 'tactic', 'lucky', 'clean'] as ErrorType[]).map((type) => (
              <li key={type} className="rounded-lg border border-line bg-surface-2 p-3 text-center">
                <p className="text-2xl font-semibold tabular-nums text-fg">{guide.errorCounts[type]}</p>
                <p className="mt-1 text-xs text-fg-muted">{ERROR_LABEL[type]}</p>
              </li>
            ))}
          </ul>

          {guide.trapsHit.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xs font-medium uppercase tracking-wide text-bad">Bẫy bạn đã thực sự mắc</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
                {guide.trapsHit.slice(0, 5).map((trap) => (
                  <li key={trap}>· {trap}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

function SheetRow({ item }: { item: GuideSheetRow }) {
  const progress = item.progress;
  const tone: Tone = progress?.mastered ? 'ok' : progress?.passed ? 'brand' : 'neutral';

  return (
    <li
      className={cn(
        'rounded-lg border p-3',
        progress?.mastered ? 'border-ok/40 bg-ok-soft' : 'border-line bg-surface',
        !item.unlocked && 'opacity-60',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs tabular-nums text-fg-subtle">{item.sheet.code}</p>
          <p className="mt-0.5 truncate text-sm font-medium text-fg">
            <span className="mr-1 rounded bg-surface-2 px-1 py-0.5 text-[10px] font-semibold text-fg-muted">
              {item.sheet.kindCode}
            </span>
            {item.sheet.title.split('·')[0]?.trim()}
          </p>
        </div>
        {progress && <Badge tone={tone}>{formatPercent(progress.bestRatio, 0)}</Badge>}
      </div>

      <p className="mt-2 text-xs text-fg-subtle tabular-nums">
        {item.sheet.questionCount} câu · {Math.max(1, Math.round(item.sheet.seconds / 60))} phút · đạt từ{' '}
        {formatPercent(item.sheet.masteryRatio, 0)}
      </p>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant={item.unlocked ? 'secondary' : 'ghost'}
          disabled={!item.unlocked}
          onClick={() => navigate(`/worksheet?id=${encodeURIComponent(item.sheet.id)}`)}
        >
          {progress ? 'Làm lại' : 'Làm phiếu'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          title={`Phiếu lời giải ${item.sheet.solutionCode}`}
          onClick={() => navigate(`/solutions?worksheet=${encodeURIComponent(item.sheet.id)}`)}
        >
          Lời giải
        </Button>
      </div>
    </li>
  );
}
