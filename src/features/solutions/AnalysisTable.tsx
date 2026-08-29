import { cn } from '../../lib/cn';
import { formatClock, formatPercent } from '../../lib/format';
import { ERROR_LABEL, type Analysis, type SolutionEntry } from '../../lib/solutions';
import type { ErrorType } from '../../types';
import { BarList, DataTable } from '../../components/charts';
import { Badge, Card, CardHeader, Progress, Stat, type Tone } from '../../components/ui/primitives';

/**
 * BANG PHAN TICH CHI TIET
 *
 * Ba lat cat tra loi ba cau hoi khac nhau:
 *   loai loi  → phai chua bang cach nao
 *   chuyen de → on lai chuong nao
 *   ky nang   → luyen dung ky thuat nao
 *   do kho    → tran nang luc dang o dau
 *
 * Mau o day dung bang trang thai (dat/canh bao/loi), khong dung bang phan loai:
 * loai loi la TRANG THAI chu khong phai cac chuoi du lieu ngang hang nhau. Va
 * mau khong bao gio la kenh thong tin duy nhat — moi hang deu co nhan chu.
 */

const ERROR_TONE: Record<ErrorType, Tone> = {
  knowledge: 'bad',
  skill: 'warn',
  tactic: 'warn',
  lucky: 'warn',
  clean: 'ok',
};

const ERROR_ORDER: ErrorType[] = ['knowledge', 'skill', 'tactic', 'lucky', 'clean'];

export function AnalysisPanel({
  analysis,
  entries,
}: {
  analysis: Analysis;
  entries: readonly SolutionEntry[];
}) {
  const overTime = analysis.targetSeconds > 0 && analysis.seconds > analysis.targetSeconds;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          title="Bảng phân tích chi tiết"
          subtitle="Điểm số nói bạn được bao nhiêu. Bảng này nói vì sao, và phải làm gì tiếp."
        />

        <div className="grid gap-4 sm:grid-cols-4">
          <Stat
            label="Độ chính xác"
            value={`${analysis.correct}/${analysis.total}`}
            tone={analysis.ratio >= 0.85 ? 'ok' : analysis.ratio >= 0.7 ? 'brand' : 'bad'}
            hint={formatPercent(analysis.ratio, 1)}
          />
          <Stat
            label="Thời gian"
            value={formatClock(analysis.seconds)}
            tone={overTime ? 'warn' : 'ok'}
            hint={`ngân sách ${formatClock(analysis.targetSeconds)}`}
          />
          <Stat
            label="Câu sa lầy"
            value={String(analysis.sunkQuestions)}
            tone={analysis.sunkQuestions >= 3 ? 'bad' : analysis.sunkQuestions > 0 ? 'warn' : 'ok'}
            hint="vượt gấp đôi thời gian mục tiêu"
          />
          <Stat
            label="Loại lỗi chính"
            value={analysis.dominantError ? ERROR_LABEL[analysis.dominantError] : 'Không có'}
            tone={analysis.dominantError ? ERROR_TONE[analysis.dominantError] : 'ok'}
          />
        </div>

        <p className="mt-5 rounded-xl border-l-4 border-l-brand bg-surface-2 p-4 text-sm leading-relaxed text-fg">
          {analysis.verdict}
        </p>
      </Card>

      <Card>
        <CardHeader
          title="Phân bố theo loại lỗi"
          subtitle="Ba loại lỗi cần ba cách chữa khác hẳn nhau. Chữa nhầm loại là lý do phổ biến khiến việc học thêm không có tác dụng."
        />
        <ul className="space-y-3">
          {ERROR_ORDER.map((type) => {
            const count = analysis.errorCounts[type];
            const ratio = analysis.total > 0 ? count / analysis.total : 0;
            return (
              <li key={type}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-fg">
                    <Badge tone={ERROR_TONE[type]}>{ERROR_LABEL[type]}</Badge>
                  </span>
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

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Theo chuyên đề" subtitle="Xếp từ yếu nhất — đây là thứ tự nên ôn lại." />
          <BarList
            max={1}
            format={(v) => formatPercent(v, 0)}
            data={analysis.byTopic.map((stat) => ({
              label: stat.label,
              value: stat.ratio,
              hint: `${stat.correct}/${stat.total} câu · ${formatClock(stat.seconds)}`,
            }))}
          />
          <DataTable
            caption="Kết quả theo chuyên đề"
            head={['Chuyên đề', 'Đúng', 'Tỉ lệ', 'Thời gian']}
            rows={analysis.byTopic.map((s) => [
              s.label,
              `${s.correct}/${s.total}`,
              formatPercent(s.ratio, 0),
              formatClock(s.seconds),
            ])}
          />
        </Card>

        <Card>
          <CardHeader title="Theo mức độ câu hỏi" subtitle="Điểm gãy nằm ở đâu cho biết trần năng lực hiện tại." />
          <BarList
            max={1}
            format={(v) => formatPercent(v, 0)}
            data={analysis.byDifficulty.map((stat) => ({
              label: stat.label,
              value: stat.ratio,
              hint: `${stat.correct}/${stat.total} câu`,
            }))}
          />
          <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
            Đúng cao ở mức nhận biết nhưng tụt mạnh ở vận dụng là dấu hiệu học thuộc chứ chưa hiểu bản chất.
          </p>
        </Card>
      </div>

      {analysis.bySkill.length > 0 && (
        <Card>
          <CardHeader
            title="Theo kỹ năng cụ thể"
            subtitle="Chi tiết hơn chuyên đề: kỹ năng nào đang hỏng chính xác ở đâu."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                  <th scope="col" className="px-2 py-2">Kỹ năng</th>
                  <th scope="col" className="px-2 py-2 text-right">Đúng</th>
                  <th scope="col" className="px-2 py-2 text-right">Tỉ lệ</th>
                  <th scope="col" className="px-2 py-2 text-right">Thời gian / mục tiêu</th>
                </tr>
              </thead>
              <tbody>
                {analysis.bySkill.slice(0, 15).map((stat) => (
                  <tr key={stat.key} className="border-b border-line/60 last:border-0">
                    <th scope="row" className="px-2 py-2 font-normal text-fg">{stat.label}</th>
                    <td className="px-2 py-2 text-right tabular-nums text-fg-muted">
                      {stat.correct}/{stat.total}
                    </td>
                    <td
                      className={cn(
                        'px-2 py-2 text-right tabular-nums font-medium',
                        stat.ratio >= 0.85 ? 'text-ok' : stat.ratio >= 0.5 ? 'text-fg' : 'text-bad',
                      )}
                    >
                      {formatPercent(stat.ratio, 0)}
                    </td>
                    <td className="px-2 py-2 text-right tabular-nums text-fg-muted">
                      {formatClock(stat.seconds)} / {formatClock(stat.targetSeconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card>
        <CardHeader
          title="Chi tiết từng câu"
          subtitle="Toàn bộ dữ liệu của lượt làm này, đủ để đối chiếu lại bất cứ lúc nào."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Câu</th>
                <th scope="col" className="px-2 py-2">Chuyên đề</th>
                <th scope="col" className="px-2 py-2">Mức độ</th>
                <th scope="col" className="px-2 py-2">Bạn chọn</th>
                <th scope="col" className="px-2 py-2">Đáp án</th>
                <th scope="col" className="px-2 py-2">Tự tin</th>
                <th scope="col" className="px-2 py-2 text-right">Thời gian</th>
                <th scope="col" className="px-2 py-2">Kết quả</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.question.id} className="border-b border-line/60 last:border-0">
                  <th scope="row" className="px-2 py-2 font-normal tabular-nums text-fg">
                    {entry.index + 1}
                  </th>
                  <td className="px-2 py-2 text-fg-muted">{entry.topicLabel}</td>
                  <td className="px-2 py-2 text-fg-muted">{entry.difficultyLabel}</td>
                  <td className="px-2 py-2 text-fg-muted">
                    {entry.blank ? <span className="text-bad">bỏ trống</span> : entry.given}
                  </td>
                  <td className="px-2 py-2 text-fg">{entry.question.answer}</td>
                  <td className="px-2 py-2 text-fg-muted">
                    {entry.response?.confidence === 'sure'
                      ? 'chắc chắn'
                      : entry.response?.confidence === 'unsure'
                        ? 'chưa chắc'
                        : entry.response?.confidence === 'guess'
                          ? 'đoán'
                          : '—'}
                  </td>
                  <td
                    className={cn(
                      'px-2 py-2 text-right tabular-nums',
                      entry.timeRatio > 2 ? 'text-bad' : entry.timeRatio > 1.25 ? 'text-warn' : 'text-fg-muted',
                    )}
                  >
                    {formatClock(entry.timeSeconds)}
                  </td>
                  <td className="px-2 py-2">
                    <Badge tone={ERROR_TONE[entry.errorType]}>{ERROR_LABEL[entry.errorType]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
