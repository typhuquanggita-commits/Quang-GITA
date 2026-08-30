import { useMemo, useRef, useState } from 'react';
import { MAX_TOTAL_SCORE, SECTIONS } from '../../config';
import { LEVELS } from '../../data/curriculum';
import { topicName } from '../../data/topics';
import { formatNumber, formatPercent } from '../../lib/format';
import {
  ITEMS_PER_SECTION,
  MAX_PLACEMENT_LEVEL,
  PLACEMENT_TOTAL,
  nextQuestion,
  sectionAt,
  type PlacementAnswer,
} from '../../lib/placement';
import { navigate } from '../../lib/router';
import { isCorrect } from '../../lib/scoring';
import { useAppState, useDispatch } from '../../store/AppStore';
import type { Confidence, PlacementRecord, Response, Section3Choice } from '../../types';
import { Badge, Button, Card, CardHeader, Progress, Stat } from '../../components/ui/primitives';
import { Section3Picker, isSection3Complete } from '../../components/Section3Picker';
import { QuestionView } from '../exam/QuestionView';

/**
 * BAI KIEM TRA DINH VI DAU VAO
 *
 * Man hinh nay la CUA VAO cua ca he thong. Truoc no, moi nguoi hoc bat dau tu
 * cung mot diem mac dinh va lo trinh "ca nhan hoa" chi ca nhan hoa duoc sau
 * rat nhieu phieu — nghia la nguoi moi, nguoi can giup nhat, lai nhan duoc it
 * huong dan nhat.
 *
 * Ba dieu man hinh phai noi THANG truoc khi bat dau, vi neu de nguoi hoc phat
 * hien sau thi ho se thay bi lua: bai dai bao nhieu, khong quay lai duoc, va
 * ket qua nay dung de lam gi.
 */

type Phase = 'intro' | 'running' | 'done';

export function PlacementPage() {
  const state = useAppState();
  const dispatch = useDispatch();

  const [phase, setPhase] = useState<Phase>(state.placement ? 'done' : 'intro');
  const [section3, setSection3] = useState<Section3Choice>(state.settings.section3);
  const [answers, setAnswers] = useState<PlacementAnswer[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const questionStartedAt = useRef(Date.now());

  const question = useMemo(
    () => (phase === 'running' ? nextQuestion(answers, section3) : null),
    [phase, answers, section3],
  );

  function begin() {
    setAnswers([]);
    setValue(null);
    startedAt.current = Date.now();
    questionStartedAt.current = Date.now();
    setPhase('running');
  }

  function commit(confidence: Confidence) {
    if (!question) return;
    const answer: PlacementAnswer = {
      questionId: question.id,
      value,
      correct: isCorrect(question, value),
      timeSpentMs: Date.now() - questionStartedAt.current,
      confidence,
    };
    const next = [...answers, answer];
    setAnswers(next);
    setValue(null);
    questionStartedAt.current = Date.now();

    if (next.length >= PLACEMENT_TOTAL) {
      dispatch({
        type: 'placement/complete',
        answers: next,
        section3,
        durationMs: Date.now() - startedAt.current,
      });
      setPhase('done');
    }
  }

  if (phase === 'intro') return <Intro section3={section3} onSection3={setSection3} onStart={begin} />;

  if (phase === 'running' && question) {
    const index = answers.length;
    const section = SECTIONS.find((s) => s.id === sectionAt(index));
    const response: Response = {
      questionId: question.id,
      value,
      flagged: false,
      timeSpentMs: 0,
      visits: 1,
      changes: 0,
    };

    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge tone="brand">Định vị · {section?.name ?? ''}</Badge>
              <h1 className="mt-2 text-xl font-semibold tracking-tight">
                Câu {index + 1} / {PLACEMENT_TOTAL}
              </h1>
            </div>
            <p className="text-sm text-fg-muted">
              Còn {PLACEMENT_TOTAL - index} câu · phần này còn{' '}
              {ITEMS_PER_SECTION - (index % ITEMS_PER_SECTION)} câu
            </p>
          </div>
          <Progress value={index} max={PLACEMENT_TOTAL} label="Tiến độ bài định vị" />
        </header>

        <QuestionView
          question={question}
          response={response}
          index={index}
          total={PLACEMENT_TOTAL}
          onAnswer={setValue}
          onConfidence={commit}
          onToggleFlag={() => {}}
          reveal={false}
          locked={false}
          apiKey=""
        />

        <Card className="border-dashed">
          <p className="text-sm text-fg-muted">
            Chọn phương án, rồi bấm mức độ chắc chắn để sang câu tiếp theo. Nếu chưa biết, cứ bấm{' '}
            <strong className="text-fg">Đoán</strong> — mức độ chắc chắn cũng là dữ liệu, và một câu đúng do đoán
            nói lên điều khác hẳn một câu đúng do hiểu.
          </p>
          {value === null && (
            <p className="mt-2 text-xs text-warn">
              Bỏ trống cũng được tính là một câu và sẽ vào sổ tay lỗi sai.
            </p>
          )}
        </Card>
      </div>
    );
  }

  if (state.placement) return <ResultView record={state.placement} onRedo={begin} />;

  return (
    <Card>
      <CardHeader title="Không dựng được bài định vị" subtitle="Ngân hàng câu hỏi chưa đủ cho môn đã chọn." />
      <Button variant="primary" onClick={() => setPhase('intro')}>
        Chọn lại môn
      </Button>
    </Card>
  );
}

function Intro({
  section3,
  onSection3,
  onStart,
}: {
  section3: Section3Choice;
  onSection3: (value: Section3Choice) => void;
  onStart: () => void;
}) {
  // Bai dinh vi lay cau tu dung cac chu de nguoi hoc se thi, nen chua chon du
  // ba chu de thi chua the bat dau — khoa nut la cach noi that ro nhat.
  const ready = isSection3Complete(section3);
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <Badge tone="brand">Bước đầu tiên</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Bài kiểm tra định vị</h1>
        <p className="mt-2 text-sm text-fg-muted">
          {PLACEMENT_TOTAL} câu, {ITEMS_PER_SECTION} câu mỗi phần thi, khoảng 30 phút. Kết quả quyết định cấp độ
          khởi điểm của từng tuyến chuyên đề, điểm dự báo ban đầu và những gì hệ thống giao cho bạn trong tuần
          đầu tiên.
        </p>
      </header>

      <Card>
        <CardHeader title="Ba điều cần biết trước khi bắt đầu" />
        <ol className="space-y-4 text-sm">
          <li>
            <strong className="text-fg">Đề chọn thích ứng theo bạn.</strong>
            <p className="mt-1 text-fg-muted">
              Sau mỗi câu, hệ thống ước lượng lại năng lực rồi chọn câu tiếp theo có độ khó gần năng lực đó nhất.
              Một câu quá dễ hay quá khó gần như không mang thông tin gì — ai cũng đúng, hoặc ai cũng sai. Nhờ vậy{' '}
              {ITEMS_PER_SECTION} câu cho ra sai số tương đương một đề cố định dài gấp đôi.
            </p>
          </li>
          <li>
            <strong className="text-fg">Không quay lại câu trước được.</strong>
            <p className="mt-1 text-fg-muted">
              Đây không phải sự khắt khe: câu tiếp theo được chọn dựa trên câu vừa rồi, nên sửa lại câu cũ sẽ làm
              hỏng chính logic chọn câu.
            </p>
          </li>
          <li>
            <strong className="text-fg">Bài này định vị theo phần thi, không theo từng chuyên đề.</strong>
            <p className="mt-1 text-fg-muted">
              {ITEMS_PER_SECTION} câu đủ để định vị một phần với sai số dùng được, nhưng không đủ để định vị riêng
              từng chuyên đề — và hệ thống sẽ không giả vờ là đủ. Mức chuyên đề sắc dần khi bạn làm phiếu thật.
              Định vị cũng chỉ xếp bạn tới tối đa <strong className="text-fg">cấp {MAX_PLACEMENT_LEVEL}</strong>;
              cấp cao hơn phải chứng minh bằng phiếu.
            </p>
          </li>
        </ol>
      </Card>

      <Card>
        <CardHeader
          title="Phần 3 — bạn thi đường nào"
          subtitle="Chọn đúng những gì bạn sẽ thi. Đổi lựa chọn về sau nghĩa là phần 3 phải định vị lại."
        />
        <Section3Picker value={section3} onChange={onSection3} />
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" size="lg" onClick={onStart} disabled={!ready}>
          Bắt đầu định vị
        </Button>
        <Button size="lg" onClick={() => navigate('/')}>
          Để sau
        </Button>
      </div>
    </div>
  );
}

function ResultView({ record, onRedo }: { record: PlacementRecord; onRedo: () => void }) {
  const levels = Object.entries(record.startingLevels).sort((a, b) => a[1] - b[1]);
  const weakest = levels.slice(0, 5);

  return (
    <div className="space-y-8">
      <header>
        <Badge tone="ok">Đã định vị</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Điểm xuất phát của bạn</h1>
        <p className="mt-2 max-w-3xl text-sm text-fg-muted">
          Con số dưới đây là ước lượng từ {record.sections.reduce((n, s) => n + s.answered, 0)} câu, không phải
          một lời hứa. Sai số còn lớn ở giai đoạn này và sẽ thu hẹp dần theo từng phiếu bạn làm.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Điểm dự báo"
          value={`${formatNumber(Math.round(record.projected))}/${MAX_TOTAL_SCORE}`}
          tone="brand"
          hint="Nếu thi ngay hôm nay với đề chuẩn"
        />
        <Stat
          label="Số câu đúng"
          value={`${record.sections.reduce((n, s) => n + s.correct, 0)}/${record.sections.reduce(
            (n, s) => n + s.answered,
            0,
          )}`}
        />
        <Stat
          label="Thời gian làm"
          value={`${Math.round(record.durationMs / 60000)} phút`}
          hint={`Trung bình ${Math.round(record.durationMs / 1000 / Math.max(1, record.sections.reduce((n, s) => n + s.answered, 0)))} giây/câu`}
        />
      </div>

      <Card>
        <CardHeader
          title="Từng phần thi"
          subtitle="Sai số chuẩn càng nhỏ thì ước lượng càng đáng tin. Trên 0,6 nghĩa là còn phải làm thêm mới chắc."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Phần thi</th>
                <th scope="col" className="px-2 py-2 text-right">Đúng</th>
                <th scope="col" className="px-2 py-2 text-right">Điểm dự báo</th>
                <th scope="col" className="px-2 py-2 text-right">Sai số chuẩn</th>
              </tr>
            </thead>
            <tbody>
              {record.sections.map((row) => {
                const spec = SECTIONS.find((s) => s.id === row.section);
                return (
                  <tr key={row.section} className="border-b border-line/60">
                    <th scope="row" className="px-2 py-2 font-normal text-fg">
                      {spec?.name ?? row.section}
                    </th>
                    <td className="px-2 py-2 text-right tabular-nums">
                      {row.correct}/{row.answered}
                    </td>
                    <td className="px-2 py-2 text-right tabular-nums">
                      {formatNumber(Math.round(row.projected))}/{spec?.questionCount ?? 50}
                    </td>
                    <td className="px-2 py-2 text-right tabular-nums text-fg-muted">
                      ±{row.standardError.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Năm tuyến cần bắt đầu sớm nhất"
          subtitle="Xếp theo cấp độ khởi điểm thấp nhất — đây là nơi 20% công sức đầu tiên nên đổ vào."
        />
        <ol className="space-y-2">
          {weakest.map(([topicId, level]) => (
            <li
              key={topicId}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 p-3"
            >
              <span className="text-sm font-medium text-fg">{topicName(topicId)}</span>
              <Badge tone={level <= 1 ? 'warn' : 'neutral'}>
                Cấp {level} — {LEVELS[level - 1]?.name ?? ''}
              </Badge>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-fg-subtle">
          Toàn bộ {Object.keys(record.startingLevels).length} tuyến đã được gán cấp khởi điểm. Thang này cố ý thận
          trọng: xếp thấp hơn thực lực một cấp thì bạn mất vài buổi để vượt qua, còn xếp cao hơn thực lực một cấp
          thì bạn gặp đề chưa đủ nền để làm và rất dễ bỏ cuộc. Hai sai lầm này không hề đối xứng.
        </p>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={() => navigate('/roadmap')}>
          Xem lộ trình đã dựng
        </Button>
        <Button onClick={() => navigate('/practice')}>Vào phiếu luyện đầu tiên</Button>
        <Button variant="ghost" onClick={onRedo}>
          Định vị lại
        </Button>
      </div>
      <p className="text-xs text-fg-subtle">
        Định vị lại chỉ đặt lại cấp độ và mức thành thạo. Phiếu đã làm, sổ tay lỗi sai và lịch ôn tập giữ nguyên —{' '}
        {formatPercent(1, 0)} tiến độ của bạn vẫn còn.
      </p>
    </div>
  );
}
