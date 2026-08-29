import { useMemo, useState } from 'react';
import { SECTIONS, SECTION_BY_ID, SUBJECT_NAME } from '../../config';
import { KINDS, KIND_BY_ID, LEVELS, LEVEL_BY_ID, MAX_LEVEL, STAGES } from '../../data/curriculum';
import { missionForWorksheet } from '../../data/missions';
import { TOPICS, topicName } from '../../data/topics';
import { TOTAL_WORKSHEETS, activeWorksheets, bankCoverage } from '../../data/worksheets';
import { TOTAL_MISSIONS } from '../../data/missions';
import { cn } from '../../lib/cn';
import { formatNumber, formatPercent } from '../../lib/format';
import { isUnlocked, recommendedWorksheets, stageKpi, trackStatus, worksheetRequirementLabel } from '../../lib/progression';
import { navigate, useRoute } from '../../lib/router';
import { useAppState, useDispatch } from '../../store/AppStore';
import type { SectionId, Worksheet, WorksheetKind } from '../../types';
import { Badge, Button, Card, CardHeader, Progress, Segmented, Select, Stat } from '../../components/ui/primitives';
import { PermissionGate } from '../../components/PermissionGate';
import { STAGE_PROMOTION_KPI } from '../../data/curriculum';

/**
 * THU VIEN PHIEU LUYEN
 *
 * 2000 phieu la mot con so lon den muc de gay te liet lua chon. Man hinh nay
 * giai quyet dieu do bang cach dat "viec nen lam tiep theo" len dau, roi moi
 * den bo loc cho nguoi muon tu chon.
 */
export function PracticePage() {
  return (
    <PermissionGate permission="learn.worksheet" title="Chưa mở quyền làm phiếu luyện">
      <PracticeContent />
    </PermissionGate>
  );
}

function PracticeContent() {
  const state = useAppState();
  const route = useRoute();
  const subject = state.settings.scienceSubject;

  const [section, setSection] = useState<SectionId | 'all'>(
    (route.params.get('section') as SectionId | null) ?? 'all',
  );
  const [topicId, setTopicId] = useState<string>(route.params.get('topic') ?? 'all');
  const [level, setLevel] = useState<number | 'all'>('all');
  const [kind, setKind] = useState<WorksheetKind | 'all'>('all');
  const [onlyUnlocked, setOnlyUnlocked] = useState(true);

  const sheets = useMemo(() => activeWorksheets(subject), [subject]);

  const filtered = useMemo(
    () =>
      sheets.filter((sheet) => {
        if (section !== 'all' && sheet.section !== section) return false;
        if (topicId !== 'all' && sheet.topicId !== topicId) return false;
        if (level !== 'all' && sheet.level !== level) return false;
        if (kind !== 'all' && sheet.kind !== kind) return false;
        if (onlyUnlocked && !isUnlocked(state, sheet)) return false;
        return true;
      }),
    [sheets, section, topicId, level, kind, onlyUnlocked, state],
  );

  const recommended = useMemo(() => recommendedWorksheets(state, subject), [state, subject]);
  const passed = sheets.filter((s) => state.worksheets[s.id]?.passed).length;
  const mastered = sheets.filter((s) => state.worksheets[s.id]?.mastered).length;

  const topics = TOPICS.filter((t) => t.section !== 'science' || t.subject === subject);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Thư viện phiếu luyện</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-fg-muted">
          {formatNumber(TOTAL_WORKSHEETS)} phiếu luyện và {formatNumber(TOTAL_MISSIONS)} nhiệm vụ, chia đều cho ba
          phần thi theo đúng tỉ trọng của đề thật. Mỗi chuyên đề có đủ sáu loại phiếu theo thứ tự sư phạm —{' '}
          <strong className="text-fg">lý thuyết → dạng bài &amp; đọc vị → kỹ năng &amp; phương pháp → luyện nâng
          cao → ôn thi → phiếu thi</strong> — mỗi phiếu kèm một phiếu lời giải và bảng phân tích chuyên sâu riêng,
          cộng một phiếu hướng dẫn ôn chắc cho cả chuyên đề. Chương trình của bạn gồm{' '}
          {formatNumber(sheets.length)} phiếu (đã lọc theo môn tự chọn {SUBJECT_NAME[subject]}).
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Đã hoàn thành" value={formatNumber(passed)} hint={`trên ${formatNumber(sheets.length)} phiếu`} />
        <Stat label="Đã thành thạo" value={formatNumber(mastered)} tone="ok" hint="đạt từ 85% và kịp giờ" />
        <Stat label="Kinh nghiệm" value={formatNumber(state.xp)} tone="brand" hint="cộng dồn từ các lần tiến bộ" />
        <Stat
          label="Giai đoạn"
          value={`${state.stage}/3`}
          hint={STAGES.find((s) => s.stage === state.stage)?.name ?? ''}
        />
      </div>

      <StageProgress />

      {recommended.length > 0 && (
        <Card>
          <CardHeader
            title="Nên làm tiếp theo"
            subtitle="Ưu tiên các tuyến đang kéo điểm tổng xuống nhiều nhất, mỗi tuyến một phiếu."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((sheet) => (
              <WorksheetCard key={sheet.id} sheet={sheet} highlight />
            ))}
          </div>
        </Card>
      )}

      <Card>
        <CardHeader title="Tuyến chuyên đề" subtitle="Mỗi chuyên đề là một tuyến riêng, lên cấp độc lập với nhau." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TrackCard key={topic.id} topicId={topic.id} onPick={() => setTopicId(topic.id)} />
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title={`Tất cả phiếu (${formatNumber(filtered.length)})`}
          subtitle="Lọc theo phần thi, chuyên đề, cấp độ và dạng phiếu."
        />

        <div className="mb-5 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Phần thi</span>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value as SectionId | 'all')}
              className="w-52"
            >
              <option value="all">Tất cả</option>
              {SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shortName}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Chuyên đề</span>
            <Select value={topicId} onChange={(e) => setTopicId(e.target.value)} className="w-64">
              <option value="all">Tất cả</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Cấp độ</span>
            <Select
              value={String(level)}
              onChange={(e) => setLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-44"
            >
              <option value="all">Tất cả</option>
              {LEVELS.map((l) => (
                <option key={l.level} value={l.level}>
                  Cấp {l.level} — {l.name}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Dạng phiếu</span>
            <Select
              value={kind}
              onChange={(e) => setKind(e.target.value as WorksheetKind | 'all')}
              className="w-44"
            >
              <option value="all">Tất cả</option>
              {KINDS.map((k) => (
                <option key={k.kind} value={k.kind}>
                  {k.name}
                </option>
              ))}
            </Select>
          </label>

          <Segmented
            label="Phạm vi hiển thị"
            value={onlyUnlocked ? 'unlocked' : 'all'}
            onChange={(value) => setOnlyUnlocked(value === 'unlocked')}
            options={[
              { value: 'unlocked', label: 'Đã mở khóa' },
              { value: 'all', label: 'Toàn bộ' },
            ]}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 60).map((sheet) => (
            <WorksheetCard key={sheet.id} sheet={sheet} />
          ))}
        </div>
        {filtered.length > 60 && (
          <p className="mt-4 text-sm text-fg-muted">
            Đang hiển thị 60 phiếu đầu tiên. Thu hẹp bộ lọc theo chuyên đề hoặc cấp độ để tìm nhanh hơn.
          </p>
        )}
      </Card>

      <BankCoverageNote />
    </div>
  );
}

/* ── Tiến độ giai đoạn & KPI ───────────────────────────────────────────── */

function StageProgress() {
  const state = useAppState();
  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader
        title="KPI theo giai đoạn"
        subtitle={`Đạt KPI từ ${Math.round(STAGE_PROMOTION_KPI * 100)}% và hoàn thành ít nhất 60% số phiếu của giai đoạn thì được xét lên giai đoạn mới.`}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {STAGES.map((stage) => {
          const kpi = stageKpi(state, stage.stage);
          const current = state.stage === stage.stage;
          return (
            <div
              key={stage.stage}
              className={cn(
                'rounded-xl border p-4',
                current ? 'border-brand-line bg-brand-soft' : 'border-line bg-surface-2',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-fg">{stage.name}</p>
                {current && <Badge tone="brand">Hiện tại</Badge>}
              </div>
              <p className="mt-1 text-xs text-fg-muted">{stage.purpose}</p>

              <dl className="mt-3 space-y-2">
                <div>
                  <div className="flex justify-between text-xs">
                    <dt className="text-fg-muted">KPI (độ chính xác trên phiếu đã làm)</dt>
                    <dd className="font-medium tabular-nums text-fg">{formatPercent(kpi.kpi, 1)}</dd>
                  </div>
                  <Progress
                    value={kpi.kpi * 100}
                    tone={kpi.kpi >= STAGE_PROMOTION_KPI ? 'ok' : 'brand'}
                    className="mt-1"
                    label={`KPI ${stage.name}`}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs">
                    <dt className="text-fg-muted">Độ phủ phiếu</dt>
                    <dd className="font-medium tabular-nums text-fg">{formatPercent(kpi.coverage, 0)}</dd>
                  </div>
                  <Progress value={kpi.coverage * 100} tone="neutral" className="mt-1" label="Độ phủ phiếu" />
                </div>
              </dl>

              <p className="mt-3 text-xs text-fg-subtle tabular-nums">
                Đã làm {formatNumber(kpi.attempted)}/{formatNumber(kpi.total)} phiếu
              </p>

              {kpi.eligible && state.stage === stage.stage && stage.stage < 3 && (
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => dispatch({ type: 'stage/promote' })}
                >
                  Xét lên {STAGES[stage.stage]?.name ?? 'giai đoạn sau'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ── Thẻ tuyến chuyên đề ───────────────────────────────────────────────── */

function TrackCard({ topicId, onPick }: { topicId: string; onPick: () => void }) {
  const state = useAppState();
  const dispatch = useDispatch();
  const status = trackStatus(state, topicId);
  const level = LEVEL_BY_ID.get(status.level);

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <div className="flex items-start justify-between gap-2">
        <button type="button" onClick={onPick} className="min-w-0 text-left">
          <p className="truncate text-sm font-medium text-fg hover:text-brand">{topicName(topicId)}</p>
        </button>
        <Badge tone={status.level >= MAX_LEVEL ? 'ok' : 'brand'}>Cấp {status.level}</Badge>
      </div>
      <p className="mt-1 text-xs text-fg-subtle">{level?.name}</p>

      <Progress value={status.progress * 100} className="mt-3" label={`Tiến độ ${topicName(topicId)}`} />
      <p className="mt-1.5 text-xs text-fg-muted tabular-nums">
        Thành thạo {status.masteredAtLevel}/{status.required} phiếu bắt buộc
        {status.bossMastered ? ' · đã vượt ải' : ' · chưa vượt ải'}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Button size="sm" onClick={() => navigate(`/topic?id=${encodeURIComponent(topicId)}`)}>
          Phiếu ôn chắc
        </Button>
        {status.canLevelUp && (
          <Button
            variant="success"
            size="sm"
            onClick={() => dispatch({ type: 'track/levelUp', topicId })}
          >
            Lên cấp {status.level + 1}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ── Thẻ phiếu luyện ───────────────────────────────────────────────────── */

function WorksheetCard({ sheet, highlight = false }: { sheet: Worksheet; highlight?: boolean }) {
  const state = useAppState();
  const progress = state.worksheets[sheet.id];
  const unlocked = isUnlocked(state, sheet);
  const kind = KIND_BY_ID.get(sheet.kind);
  const mission = missionForWorksheet(sheet.id);
  const spec = SECTION_BY_ID[sheet.section];

  return (
    <article
      className={cn(
        'flex flex-col rounded-xl border p-4 transition',
        highlight ? 'border-brand-line bg-brand-soft' : 'border-line bg-surface-2',
        !unlocked && 'opacity-60',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium tabular-nums text-fg-subtle">{sheet.code}</p>
          <h3 className="mt-0.5 text-sm font-semibold text-fg">
            <span className="mr-1.5 rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold text-brand">
              {sheet.kindCode}
            </span>
            {kind?.name}
          </h3>
        </div>
        <span
          className="mt-1 size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: `var(--c-${spec.accent})` }}
          aria-hidden="true"
        />
      </div>

      <p className="mt-1 truncate text-xs text-fg-muted" title={topicName(sheet.topicId)}>
        {topicName(sheet.topicId)} · Cấp {sheet.level}
      </p>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-fg-muted">{mission?.constraint}</p>

      <dl className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-fg-subtle tabular-nums">
        <span>{sheet.questionCount} câu</span>
        <span>·</span>
        <span>{Math.max(1, Math.round(sheet.seconds / 60))} phút</span>
        <span>·</span>
        <span>+{sheet.xp} XP</span>
      </dl>

      {progress && (
        <p className="mt-2 text-xs text-fg-muted tabular-nums">
          Tốt nhất {formatPercent(progress.bestRatio, 0)} · {progress.attempts} lượt
        </p>
      )}

      <div className="mt-3 flex items-center gap-2">
        {progress?.mastered && <Badge tone="ok">Thành thạo</Badge>}
        {progress && !progress.mastered && progress.passed && <Badge tone="brand">Hoàn thành</Badge>}
        {!unlocked && <Badge tone="neutral">Chưa mở khóa</Badge>}
      </div>

      <div className="mt-3 flex-1" />
      <div className="flex flex-wrap gap-1.5">
        <Button
          variant={highlight ? 'primary' : 'secondary'}
          size="sm"
          disabled={!unlocked}
          title={unlocked ? undefined : (worksheetRequirementLabel(sheet) ?? undefined)}
          onClick={() => navigate(`/worksheet?id=${encodeURIComponent(sheet.id)}`)}
        >
          {progress ? 'Làm lại' : 'Bắt đầu'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title={`Phiếu lời giải ${sheet.solutionCode}`}
          onClick={() => navigate(`/solutions?worksheet=${encodeURIComponent(sheet.id)}`)}
        >
          Lời giải
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title={`Phiếu hướng dẫn ôn chắc ${sheet.guideCode}`}
          onClick={() => navigate(`/topic?id=${encodeURIComponent(sheet.topicId)}`)}
        >
          Ôn chắc
        </Button>
      </div>
      {!unlocked && (
        <p className="mt-1.5 text-xs text-fg-subtle">{worksheetRequirementLabel(sheet)}</p>
      )}
    </article>
  );
}

/* ── Độ phủ ngân hàng câu hỏi ──────────────────────────────────────────── */

function BankCoverageNote() {
  const coverage = useMemo(() => bankCoverage(), []);
  const weakest = [...coverage].sort((a, b) => a.ratio - b.ratio).slice(0, 4);
  const average = coverage.reduce((sum, c) => sum + c.ratio, 0) / Math.max(1, coverage.length);

  return (
    <Card>
      <CardHeader
        title="Độ phủ ngân hàng câu hỏi"
        subtitle="Khung 2000 phiếu đã hoàn chỉnh. Ngân hàng câu hỏi lớn dần theo thời gian; chỉ số này nói thật chuyên đề nào đang phải dùng lại câu cũ."
      />
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums">{formatPercent(average, 0)}</span>
        <span className="text-sm text-fg-muted">độ phủ trung bình</span>
      </div>
      <ul className="mt-4 space-y-2">
        {weakest.map((item) => (
          <li key={item.topicId} className="flex items-center justify-between gap-4 text-sm">
            <span className="truncate text-fg-muted">{topicName(item.topicId)}</span>
            <span className="shrink-0 tabular-nums text-fg">
              {item.available}/{item.needed} câu
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-fg-subtle">
        Khi bổ sung câu hỏi vào <code className="rounded bg-surface-2 px-1">src/data/questions/</code>, các phiếu tự
        động lấy câu mới mà không phải sửa lại khung chương trình.
      </p>
    </Card>
  );
}
