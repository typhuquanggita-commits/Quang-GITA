/**
 * The calibration console.
 *
 * Every score this platform reports rests on item parameters that were
 * assigned by their author from a difficulty band. `docs/PSYCHOMETRICS.md`
 * says so plainly; until now nothing in the interface did, and there was no
 * way for a programme to move off them without editing source. The estimator
 * has shipped since the beginning — what was missing was response data and a
 * way in.
 *
 * The console refuses to pretend. It reports exactly how much evidence exists
 * on this device, states why that is not a calibration sample, and provides
 * the path that actually works with no server: import a matrix collected
 * across a cohort, calibrate it, read the fit and fairness screens, and export
 * the parameters that passed.
 *
 * The estimator runs in a worker. Twenty seconds of MMLE on the main thread is
 * not a slow screen; it is a browser that has stopped answering.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import {
  ACCEPTANCE,
  linkingConstants,
  summarise,
  type CalibrationResult,
  type DifResult,
  type ItemCalibration,
} from '../../engine/calibration.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Tabs } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck, IconDownload, IconSigma } from '../../components/ui/icons.tsx';
import { download } from '../../lib/util.ts';
import { assess, matrixFromAttempts, parseImport, type ParsedImport, type Readiness } from './matrix.ts';
import type { WorkerRequest, WorkerResponse } from './protocol.ts';

type Tab = 'readiness' | 'run' | 'items' | 'fairness';

interface RunState {
  phase: 'idle' | 'calibrating' | 'screening-dif' | 'done' | 'error';
  iteration: number;
  maxIterations: number;
  delta: number;
  result: CalibrationResult | null;
  dif: DifResult[];
  error: string | null;
  /** Rows the run was performed on, so the report cannot drift from its input. */
  examinees: number;
}

const IDLE: RunState = {
  phase: 'idle',
  iteration: 0,
  maxIterations: 0,
  delta: Infinity,
  result: null,
  dif: [],
  error: null,
  examinees: 0,
};

export function CalibrationConsole(): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state } = useStore();

  const [tab, setTab] = useState<Tab>('readiness');
  const [imported, setImported] = useState<ParsedImport | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [run, setRun] = useState<RunState>(IDLE);
  const workerRef = useRef<Worker | null>(null);

  /* ---- Evidence on this device ---- */
  const local = useMemo(() => matrixFromAttempts(state.attempts), [state.attempts]);
  const localReadiness = useMemo(() => assess(local, state.attempts.length > 0 ? 1 : 0), [local, state.attempts.length]);
  const importedReadiness: Readiness | null = useMemo(
    () => (imported ? assess(imported.matrix, imported.examinees) : null),
    [imported],
  );

  useEffect(
    () => () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    },
    [],
  );

  const start = useCallback(() => {
    if (!imported) return;
    workerRef.current?.terminate();

    const worker = new Worker(new URL('./calibrate.worker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;

    setRun({ ...IDLE, phase: 'calibrating', examinees: imported.examinees });

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const message = event.data;
      switch (message.kind) {
        case 'phase':
          setRun((prev) => ({ ...prev, phase: message.phase }));
          break;
        case 'progress':
          setRun((prev) => ({
            ...prev,
            iteration: message.iteration,
            maxIterations: message.maxIterations,
            delta: message.delta,
          }));
          break;
        case 'done':
          setRun((prev) => ({ ...prev, phase: 'done', result: message.result, dif: message.dif }));
          setTab('items');
          break;
        case 'error':
          setRun((prev) => ({ ...prev, phase: 'error', error: message.message }));
          break;
      }
    };
    worker.onerror = (event) => {
      setRun((prev) => ({ ...prev, phase: 'error', error: event.message || 'Worker failed.' }));
    };

    const request: WorkerRequest = { kind: 'calibrate', matrix: imported.matrix, groups: imported.groups };
    worker.postMessage(request);
  }, [imported]);

  const cancel = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setRun(IDLE);
  }, []);

  const onFile = useCallback(async (file: File) => {
    const parsed = parseImport(await file.text());
    if (parsed.ok) {
      setImported(parsed.value);
      setImportError(null);
      setRun(IDLE);
    } else {
      setImported(null);
      setImportError(parsed.error);
    }
  }, []);

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'readiness', label: vi ? 'Dữ liệu sẵn có' : 'Data readiness' },
    { id: 'run', label: vi ? 'Chạy hiệu chuẩn' : 'Run' },
    { id: 'items', label: vi ? 'Kết quả từng câu' : 'Items' },
    { id: 'fairness', label: vi ? 'Công bằng (DIF)' : 'Fairness (DIF)' },
  ];

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Hiệu chuẩn ngân hàng câu hỏi' : 'Item bank calibration'}</h1>
        <p className="page-sub">
          {vi
            ? 'Tham số IRT đang dùng là ước lượng của người soạn, chưa hiệu chuẩn trên dữ liệu thực. Đây là nơi thay thế chúng.'
            : 'The IRT parameters in use are author estimates, not calibrations. This is where they get replaced.'}
        </p>
      </header>

      <div className="escalation" data-severity="attention">
        <IconAlert size={20} />
        <div>
          <strong>{vi ? 'Điều kiện để một hiệu chuẩn có nghĩa' : 'What makes a calibration mean anything'}</strong>
          <p>
            {vi
              ? `MMLE lấy tích phân năng lực trên một quần thể; một người học không phải là quần thể. Ngưỡng chấp nhận yêu cầu ${ACCEPTANCE.minSample} lượt trả lời mỗi câu. Chạy trên dữ liệu mỏng, thuật toán vẫn trả về những con số chính xác đến hai chữ số thập phân và hoàn toàn vô nghĩa.`
              : `MMLE integrates ability out over a population; one learner is not a population. The acceptance screen wants ${ACCEPTANCE.minSample} responses per item. Run on thin data the estimator still returns numbers — precise to two decimals and meaningless.`}
          </p>
        </div>
      </div>

      <Tabs<Tab> tabs={tabs} value={tab} onChange={setTab} ariaLabel={vi ? 'Mục hiệu chuẩn' : 'Calibration sections'} />

      {tab === 'readiness' && (
        <ReadinessPanel
          local={localReadiness}
          imported={importedReadiness}
          hasGroups={Boolean(imported?.groups)}
          importError={importError}
          onFile={onFile}
          locale={locale}
        />
      )}

      {tab === 'run' && (
        <RunPanel run={run} ready={Boolean(imported)} onStart={start} onCancel={cancel} locale={locale} />
      )}

      {tab === 'items' && <ItemsPanel run={run} locale={locale} />}

      {tab === 'fairness' && <FairnessPanel run={run} locale={locale} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panels                                                              */
/*                                                                     */
/* Module scope, per the standing rule. Nested, each of these would be  */
/* a new component type on every progress message — sixty remounts a    */
/* second during a run, and the file input would lose its selection.    */
/* ------------------------------------------------------------------ */

function ReadinessPanel({
  local,
  imported,
  hasGroups,
  importError,
  onFile,
  locale,
}: {
  local: Readiness;
  imported: Readiness | null;
  hasGroups: boolean;
  importError: string | null;
  onFile(file: File): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';

  return (
    <div className="stack gap-5">
      <Card
        title={vi ? 'Trên thiết bị này' : 'On this device'}
        subtitle={
          vi
            ? 'Toàn bộ dữ liệu trả lời của người đang đăng nhập.'
            : 'Every response belonging to the signed-in learner.'
        }
      >
        <ReadinessBody readiness={local} locale={locale} />
      </Card>

      <Card
        title={vi ? 'Nhập ma trận trả lời' : 'Import a response matrix'}
        subtitle={
          vi
            ? 'Đường đi thực tế khi không có máy chủ: gom dữ liệu của cả khoá rồi nhập vào đây.'
            : 'The path that works with no server: collect a cohort’s data elsewhere and bring it here.'
        }
      >
        <div className="stack gap-4">
          <pre className="code-block">{`{
  "itemIds": ["rw_ci_001", "ma_al_001", ...],
  "rows": [[1, 0, null, ...], ...],   // one row per examinee
  "groups": [0, 1, 0, ...]            // optional; enables the DIF screen
}`}</pre>
          <label className="stack gap-2">
            <span className="text-sm semibold">{vi ? 'Tệp JSON' : 'JSON file'}</span>
            <input
              className="input"
              type="file"
              accept="application/json,.json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFile(file);
              }}
            />
          </label>
          {importError && (
            <p style={{ color: 'var(--danger)' }}>
              <IconAlert size={14} /> {importError}
            </p>
          )}
        </div>
      </Card>

      {imported && (
        <Card
          title={vi ? 'Dữ liệu đã nhập' : 'Imported data'}
          action={
            hasGroups ? (
              <Badge tone="info">{vi ? 'Có nhãn nhóm — chạy được DIF' : 'Group labels present — DIF available'}</Badge>
            ) : (
              <Badge>{vi ? 'Không có nhãn nhóm' : 'No group labels'}</Badge>
            )
          }
        >
          <ReadinessBody readiness={imported} locale={locale} />
        </Card>
      )}
    </div>
  );
}

function ReadinessBody({ readiness, locale }: { readiness: Readiness; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';
  const blockers = vi ? readiness.blockersVi : readiness.blockers;

  return (
    <div className="stack gap-4">
      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Thí sinh' : 'Examinees'}</div>
          <div className="kpi-value">{readiness.examinees}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Lượt trả lời' : 'Responses'}</div>
          <div className="kpi-value">{readiness.totalResponses}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Câu có dữ liệu' : 'Items with data'}</div>
          <div className="kpi-value">{readiness.itemsWithData}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? `Đạt ngưỡng ${ACCEPTANCE.minSample}` : `At the ${ACCEPTANCE.minSample} floor`}</div>
          <div className="kpi-value" style={readiness.itemsAtSample === 0 ? { color: 'var(--danger)' } : undefined}>
            {readiness.itemsAtSample}
          </div>
        </div>
      </div>

      {readiness.usable ? (
        <div className="escalation" data-severity="info">
          <IconCheck size={18} />
          <div>{vi ? 'Đủ điều kiện để chạy hiệu chuẩn.' : 'Sufficient to run a calibration.'}</div>
        </div>
      ) : (
        <ul className="stack gap-2" style={{ listStyle: 'none', padding: 0 }}>
          {blockers.map((blocker) => (
            <li key={blocker} className="escalation" data-severity="attention">
              <IconAlert size={18} />
              <div>{blocker}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RunPanel({
  run,
  ready,
  onStart,
  onCancel,
  locale,
}: {
  run: RunState;
  ready: boolean;
  onStart(): void;
  onCancel(): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const running = run.phase === 'calibrating' || run.phase === 'screening-dif';

  if (!ready) {
    return (
      <Empty
        icon={<IconSigma size={30} />}
        title={vi ? 'Chưa có ma trận nào được nhập' : 'No matrix imported'}
        body={vi ? 'Nhập dữ liệu ở mục “Dữ liệu sẵn có”.' : 'Import one under Data readiness.'}
      />
    );
  }

  return (
    <Card
      title={vi ? 'MMLE–EM' : 'MMLE–EM'}
      subtitle={
        vi
          ? 'Chạy trong worker, nên giao diện vẫn phản hồi suốt quá trình.'
          : 'Runs in a worker, so the interface keeps answering throughout.'
      }
      action={
        running ? (
          <Button variant="ghost" onClick={onCancel}>
            {vi ? 'Dừng' : 'Stop'}
          </Button>
        ) : (
          <Button variant="primary" onClick={onStart}>
            {vi ? 'Chạy hiệu chuẩn' : 'Calibrate'}
          </Button>
        )
      }
    >
      <div className="stack gap-4">
        {run.phase === 'idle' && (
          <p className="muted">
            {vi
              ? 'Ước lượng bắt đầu từ tiên nghiệm trung tính (a = 1, b = 0), không phải từ ước lượng của người soạn — khởi đầu từ đó sẽ kéo kết quả về chính nó và làm hỏng mục đích của việc hiệu chuẩn.'
              : 'The estimator starts from a neutral prior (a = 1, b = 0), not from the author’s own values: starting there would bias the result toward them and defeat the point.'}
          </p>
        )}

        {running && (
          <div className="stack gap-3">
            <div className="between">
              <span className="muted">
                {run.phase === 'screening-dif'
                  ? vi
                    ? 'Đang sàng lọc DIF…'
                    : 'Screening DIF…'
                  : vi
                    ? `Vòng lặp EM ${run.iteration}/${run.maxIterations}`
                    : `EM iteration ${run.iteration}/${run.maxIterations}`}
              </span>
              <span className="semibold">
                {Number.isFinite(run.delta) ? `Δ = ${run.delta.toExponential(2)}` : '—'}
              </span>
            </div>
            <div
              className="bar"
              role="progressbar"
              aria-valuenow={run.maxIterations > 0 ? Math.round((run.iteration / run.maxIterations) * 100) : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={vi ? 'Tiến độ hiệu chuẩn' : 'Calibration progress'}
            >
              <i style={{ width: `${run.maxIterations > 0 ? (run.iteration / run.maxIterations) * 100 : 0}%` }} />
            </div>
          </div>
        )}

        {run.phase === 'error' && (
          <div className="escalation" data-severity="urgent">
            <IconAlert size={18} />
            <div>{run.error}</div>
          </div>
        )}

        {run.phase === 'done' && run.result && <RunSummary run={run} locale={locale} />}
      </div>
    </Card>
  );
}

function RunSummary({ run, locale }: { run: RunState; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';
  const report = summarise(run.result!);

  return (
    <div className="stack gap-4">
      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Hội tụ' : 'Converged'}</div>
          <div className="kpi-value" style={{ color: report.converged ? 'var(--success)' : 'var(--danger)' }}>
            {report.converged ? (vi ? 'Có' : 'Yes') : vi ? 'Không' : 'No'}
          </div>
          <div className="kpi-foot">
            {report.iterations} {vi ? 'vòng lặp' : 'iterations'}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Đạt' : 'Accepted'}</div>
          <div className="kpi-value">
            {report.accepted}/{report.total}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Phân biệt trung bình' : 'Mean discrimination'}</div>
          <div className="kpi-value">{report.meanDiscrimination.toFixed(2)}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Độ khó trung bình' : 'Mean difficulty'}</div>
          <div className="kpi-value">{report.meanDifficulty.toFixed(2)}</div>
        </div>
      </div>

      {!report.converged && (
        <div className="escalation" data-severity="attention">
          <IconAlert size={18} />
          <div>
            {vi
              ? 'EM chưa hội tụ trong số vòng lặp cho phép. Không được dùng kết quả này — tham số vẫn đang di chuyển khi thuật toán dừng.'
              : 'EM did not converge within the iteration budget. Do not use this result: the parameters were still moving when it stopped.'}
          </div>
        </div>
      )}

      {Object.keys(report.reasons).length > 0 && (
        <div>
          <div className="text-sm semibold" style={{ marginBottom: 'var(--space-2)' }}>
            {vi ? 'Lý do bị loại' : 'Rejection reasons'}
          </div>
          <div className="row gap-2 wrap">
            {Object.entries(report.reasons).map(([reason, count]) => (
              <Badge key={reason} tone="warning">
                {reason} · {count}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <LinkingNote run={run} locale={locale} />
    </div>
  );
}

function LinkingNote({ run, locale }: { run: RunState; locale: 'vi' | 'en' }): React.ReactElement | null {
  const vi = locale === 'vi';

  const anchored = run.result!.items.filter((item) => QUESTION_BY_ID.has(item.itemId));
  if (anchored.length < 2) return null;

  const link = linkingConstants(
    anchored.map((item) => QUESTION_BY_ID.get(item.itemId)!.irt),
    anchored.map((item) => item.params),
  );

  return (
    <div className="escalation" data-severity="info">
      <IconSigma size={18} />
      <div>
        <strong>{vi ? 'Liên kết thang đo' : 'Scale linking'}</strong>
        <p>
          {vi
            ? `Hệ số trung bình–độ lệch trên ${anchored.length} câu neo: hệ số nhân ${link.slope.toFixed(3)}, hệ số cộng ${link.intercept.toFixed(3)}. Thang theta chỉ xác định được đến một phép biến đổi tuyến tính, nên nếu cập nhật ngân hàng mà bỏ qua bước này, mọi điểm số đã báo cáo sẽ dịch chuyển — và không ai nhìn thấy, vì cả hai bộ số đều trông hợp lý.`
            : `Mean–sigma constants over ${anchored.length} anchor items: slope ${link.slope.toFixed(3)}, intercept ${link.intercept.toFixed(3)}. The theta metric is identified only up to a linear transform, so a bank update that skips this silently shifts every reported score — invisibly, because both sets of numbers look reasonable.`}
        </p>
      </div>
    </div>
  );
}

function ItemsPanel({ run, locale }: { run: RunState; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';
  const [onlyRejected, setOnlyRejected] = useState(false);

  if (!run.result) {
    return <Empty icon={<IconSigma size={30} />} title={vi ? 'Chưa chạy hiệu chuẩn nào' : 'No calibration has been run'} />;
  }

  const items = onlyRejected ? run.result.items.filter((i) => !i.accepted) : run.result.items;

  const exportAccepted = () => {
    const accepted = run.result!.items.filter((i) => i.accepted);
    download(
      'sat365-calibration.json',
      JSON.stringify(
        {
          calibratedAt: new Date().toISOString(),
          examinees: run.examinees,
          converged: run.result!.converged,
          iterations: run.result!.iterations,
          items: accepted.map((i) => ({ id: i.itemId, a: i.params.a, b: i.params.b, n: i.n })),
        },
        null,
        2,
      ),
    );
  };

  return (
    <Card
      title={vi ? 'Từng câu' : 'Per item'}
      subtitle={
        vi
          ? 'Chỉ những câu đạt toàn bộ ngưỡng mới được xuất ra.'
          : 'Only items that clear every threshold are exported.'
      }
      action={
        <div className="row gap-2">
          <Button variant="ghost" onClick={() => setOnlyRejected((v) => !v)}>
            {onlyRejected ? (vi ? 'Hiện tất cả' : 'Show all') : vi ? 'Chỉ câu bị loại' : 'Rejected only'}
          </Button>
          <Button onClick={exportAccepted}>
            <IconDownload size={16} /> {vi ? 'Xuất câu đạt' : 'Export accepted'}
          </Button>
        </div>
      }
    >
      <div className="scroll-x">
        <table className="table">
          <thead>
            <tr>
              <th>{vi ? 'Câu' : 'Item'}</th>
              <th>a</th>
              <th>b</th>
              <th>n</th>
              <th>p</th>
              <th>r<sub>pb</sub></th>
              <th>{vi ? 'Infit' : 'Infit'}</th>
              <th>{vi ? 'Outfit' : 'Outfit'}</th>
              <th>{vi ? 'Kết luận' : 'Verdict'}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ItemRow key={item.itemId} item={item} locale={locale} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ItemRow({ item, locale }: { item: ItemCalibration; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';
  return (
    <tr>
      <td className="semibold">{item.itemId}</td>
      <td>{item.params.a.toFixed(2)}</td>
      <td>{item.params.b.toFixed(2)}</td>
      <td>{item.n}</td>
      <td>{item.pValue.toFixed(2)}</td>
      <td>{item.pointBiserial.toFixed(2)}</td>
      <td>{item.infit.toFixed(2)}</td>
      <td>{item.outfit.toFixed(2)}</td>
      <td>
        {item.accepted ? (
          <span style={{ color: 'var(--success)' }}>
            <IconCheck size={14} /> {vi ? 'Đạt' : 'Accepted'}
          </span>
        ) : (
          <span style={{ color: 'var(--danger)' }} title={item.rejectReasons.join('; ')}>
            {item.rejectReasons.join('; ')}
          </span>
        )}
      </td>
    </tr>
  );
}

function FairnessPanel({ run, locale }: { run: RunState; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';

  if (run.dif.length === 0) {
    return (
      <Empty
        icon={<IconAlert size={30} />}
        title={vi ? 'Chưa sàng lọc DIF' : 'No DIF screen'}
        body={
          vi
            ? 'Cần nhãn nhóm trong tệp nhập. Tự bịa ra một cách chia nhóm sẽ tạo ra một báo cáo công bằng về một ranh giới không ai đặt ra — tệ hơn là không có báo cáo nào.'
            : 'Group labels are needed in the import. Inventing a split would produce a fairness report about a distinction nobody drew, which is worse than none.'
        }
      />
    );
  }

  const flagged = run.dif.filter((d) => d.classification !== 'A').sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  return (
    <Card
      title={vi ? 'Mantel–Haenszel DIF' : 'Mantel–Haenszel DIF'}
      subtitle={
        vi
          ? 'So sánh giữa hai nhóm đã được ghép theo tổng điểm: một câu không bất công vì một nhóm làm bài kém hơn, mà vì hai người ngang năng lực lại trả lời khác nhau.'
          : 'Compared between groups matched on total score: an item is not unfair because one group scores lower, only because equally able members answer it differently.'
      }
    >
      {flagged.length === 0 ? (
        <p className="muted">
          {vi ? 'Mọi câu đều ở mức A (không đáng kể).' : 'Every item is category A (negligible).'}
        </p>
      ) : (
        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>{vi ? 'Câu' : 'Item'}</th>
                <th>α</th>
                <th>Δ</th>
                <th>n</th>
                <th>{vi ? 'Phân loại ETS' : 'ETS class'}</th>
              </tr>
            </thead>
            <tbody>
              {flagged.map((d) => (
                <tr key={d.itemId}>
                  <td className="semibold">{d.itemId}</td>
                  <td>{d.alpha.toFixed(3)}</td>
                  <td>{d.delta.toFixed(2)}</td>
                  <td>{d.n}</td>
                  <td>
                    <Badge tone={d.classification === 'C' ? 'danger' : 'warning'}>{d.classification}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-sm muted" style={{ marginTop: 'var(--space-4)', maxWidth: '64ch' }}>
        {vi
          ? 'Mantel–Haenszel gắn cờ quá tay khi hai nhóm chênh nhau nhiều về năng lực trung bình; xem docs/PSYCHOMETRICS.md về giới hạn đã đo được. Câu hạng C cần người xem lại, không phải xoá tự động.'
          : 'Mantel–Haenszel over-flags when the two groups differ substantially in mean ability; docs/PSYCHOMETRICS.md documents the measured limit. A category C item needs a human review, not an automatic deletion.'}
      </p>
    </Card>
  );
}
