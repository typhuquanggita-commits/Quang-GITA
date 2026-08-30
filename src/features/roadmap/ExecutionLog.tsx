import { useState } from 'react';
import { SECTIONS, SECTION_BY_ID } from '../../config';
import { ERROR_CLASSES } from '../../data/perfect';
import { formatNumber, formatPercent } from '../../lib/format';
import { PAPERS_FOR_KPI, QUESTIONS_FOR_KPI, executionStatsOf } from '../../lib/executionLog';
import { useAppState, useDispatch } from '../../store/AppStore';
import { Badge, Button, Card, CardHeader, Progress, Select, Stat } from '../../components/ui/primitives';
import type { SectionId } from '../../types';

/**
 * SO LOI THUC THI
 *
 * Giao thuc diem tuyet doi yeu cau nguoi hoc lap mot cuon so RIENG cho loi
 * thuc thi. Truoc man hinh nay, he thong dua ra yeu cau do roi de nguoi hoc
 * tu xoay xo — tuc la doi mot thu chinh no khong cung cap.
 *
 * Ba quyet dinh ve cach lam:
 *
 *  1. BAT BUOC PHAN NHOM. Khong cho ghi mot loi ma khong chon nhom. Mot cuon
 *     so ghi "hom nay sai 3 cau" khong dan toi hanh dong nao; mot cuon so ghi
 *     "3 cau deu do doc nham tu phu dinh" dan thang toi mot thao tac cu the.
 *  2. GHI CHU HOI DUNG BA VIEC. De hoi gi, minh da lam gi, va doc luot cho
 *     nao — ba cau nay bien mot cam giac tiec nuoi thanh mot du kien.
 *  3. CHI SO CHI HIEN KHI DU DU LIEU. Duoi 150 cau thi ti le dao dong qua
 *     manh, nen he thong noi "chua do duoc" thay vi bia mot con so.
 */
export function ExecutionLog() {
  const state = useAppState();
  const dispatch = useDispatch();
  const stats = executionStatsOf(state);

  const [classId, setClassId] = useState<string>(ERROR_CLASSES[0]?.id ?? 'misread');
  const [section, setSection] = useState<SectionId>('quantitative');
  const [note, setNote] = useState('');

  const guard = ERROR_CLASSES.find((c) => c.id === classId)?.guard ?? '';
  const recent = [...state.executionErrors].reverse().slice(0, 8);

  function submit() {
    if (!note.trim()) return;
    dispatch({ type: 'execError/log', classId, section, note });
    setNote('');
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Sổ lỗi thực thi"
          subtitle="Tách hẳn khỏi sổ tay lỗi sai kiến thức. Hai loại lỗi này cần hai cách chữa khác nhau, nên gộp chung một sổ thì cả hai chỉ số đều mất ý nghĩa."
          action={<Badge tone="brand">28 ngày gần nhất</Badge>}
        />

        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Lỗi đã ghi" value={formatNumber(stats.total)} hint="trong 28 ngày" />
          <Stat
            label="Số câu đã làm"
            value={formatNumber(stats.questions)}
            hint={`cần ≥ 150 để đo được`}
          />
          <Stat
            label="Tỉ lệ sai bất cẩn"
            value={stats.rate === null ? 'chưa đo được' : formatPercent(stats.rate, 2)}
            tone={stats.withinBudget === null ? 'neutral' : stats.withinBudget ? 'ok' : 'bad'}
            hint={stats.oneErrorPer === null ? '—' : `1 lỗi / ${formatNumber(stats.oneErrorPer)} câu`}
          />
          <Stat
            label="Cơ hội đạt 150"
            value={stats.chance === null ? '—' : formatPercent(stats.chance, 1)}
            tone={stats.chance !== null && stats.chance >= 0.5 ? 'ok' : 'warn'}
            hint="với tỉ lệ sai này"
          />
        </div>

        <p
          className={
            'mt-5 rounded-xl border p-4 text-sm leading-relaxed ' +
            (stats.withinBudget === null
              ? 'border-line bg-surface-2 text-fg-muted'
              : stats.withinBudget
                ? 'border-ok bg-ok-soft text-fg'
                : 'border-bad bg-bad-soft text-fg')
          }
        >
          {stats.rate === null ? (
            <>
              Cần ít nhất 150 câu đã làm trong 28 ngày để tỉ lệ có ý nghĩa. Một tỉ lệ tính trên vài chục câu dao
              động quá mạnh để kết luận điều gì, nên hệ thống nói chưa đo được thay vì đưa ra một con số.
            </>
          ) : stats.withinBudget ? (
            <>
              <strong>Đang trong ngưỡng.</strong> Biên lỗi cho mốc 50% cơ hội là{' '}
              {formatPercent(stats.budget, 2)}, tức nhiều nhất{' '}
              <strong>
                {stats.budgetPerTenPapers} lỗi trong {PAPERS_FOR_KPI} đề ({formatNumber(QUESTIONS_FOR_KPI)} câu)
              </strong>
              . Giữ nhịp này và tiếp tục ghi đều.
            </>
          ) : (
            <>
              <strong>Đã vượt ngưỡng.</strong> Biên lỗi cho mốc 50% cơ hội là{' '}
              {formatPercent(stats.budget, 2)} — nhiều nhất {stats.budgetPerTenPapers} lỗi trên{' '}
              {formatNumber(QUESTIONS_FOR_KPI)} câu. Đây là điểm nghẽn hiện tại của bạn, và thêm giờ học kiến
              thức sẽ không chữa được nó.
            </>
          )}
        </p>

        {stats.dominant ? (
          <p className="mt-3 text-sm text-fg-muted">
            Nhóm chiếm nhiều nhất là <strong className="text-fg">{stats.dominant.name}</strong> với{' '}
            {stats.dominant.count} lỗi ({formatPercent(stats.dominant.share, 0)}). Tuần tới đặt một quy tắc
            chống riêng cho nhóm này:{' '}
            <strong className="text-fg">
              {ERROR_CLASSES.find((c) => c.id === stats.dominant?.classId)?.guard}
            </strong>
          </p>
        ) : null}
      </Card>

      <Card>
        <CardHeader
          title="Ghi một lỗi"
          subtitle="Ghi ngay sau khi chữa bài, khi còn nhớ mình đã nghĩ gì. Để tới hôm sau thì chỉ còn nhớ là mình đã sai, không còn nhớ vì sao."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Nhóm lỗi</span>
            <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
              {ERROR_CLASSES.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Phần thi</span>
            <Select value={section} onChange={(e) => setSection(e.target.value as SectionId)}>
              {SECTIONS.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.shortName}
                </option>
              ))}
            </Select>
          </label>
        </div>

        <p className="mt-3 rounded-lg border-l-4 border-l-ok bg-ok-soft p-3 text-sm leading-relaxed text-fg">
          <strong>Thao tác chống nhóm này:</strong> {guard}
        </p>

        <label className="mt-4 flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-fg">Ghi chú — đề hỏi gì, bạn đã làm gì, đọc lướt chỗ nào</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={400}
            placeholder="Đề hỏi giá trị NHỎ nhất, mình tìm giá trị lớn nhất. Bỏ qua chữ nhỏ nhất khi đọc lần đầu."
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </label>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button variant="primary" onClick={submit} disabled={!note.trim()}>
            Ghi vào sổ
          </Button>
          <span className="text-xs text-fg-subtle">{note.length}/400 ký tự</span>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Phân bố theo nhóm lỗi"
          subtitle="Phân loại được thì chống được. Nhóm cao nhất là nơi đặt quy tắc chống cho tuần sau."
        />
        <ul className="space-y-2.5">
          {stats.byClass.map((cls) => (
            <li key={cls.classId}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="text-fg">{cls.name}</span>
                <span className="tabular-nums text-fg-muted">
                  {cls.count} lỗi{cls.count > 0 ? ` · ${formatPercent(cls.share, 0)}` : ''}
                </span>
              </div>
              <Progress
                value={stats.total > 0 ? cls.share * 100 : 0}
                tone={cls.classId === stats.dominant?.classId ? 'bad' : 'brand'}
                className="mt-1.5"
                label={`Tỉ trọng nhóm ${cls.name}`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {SECTIONS.map((spec) => (
            <div key={spec.id} className="rounded-xl border border-line bg-surface-2 p-3.5">
              <p className="text-xs uppercase tracking-wide text-fg-subtle">{spec.shortName}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-fg">{stats.bySection[spec.id]}</p>
              <p className="text-xs text-fg-muted">lỗi trong 28 ngày</p>
            </div>
          ))}
        </div>
      </Card>

      {recent.length > 0 ? (
        <Card>
          <CardHeader title="Lỗi đã ghi gần đây" subtitle="Đọc lại trước mỗi lần làm đề là cách ôn hiệu quả nhất cho trụ cột này." />
          <ul className="space-y-2.5">
            {recent.map((error) => {
              const cls = ERROR_CLASSES.find((c) => c.id === error.classId);
              return (
                <li key={error.id} className="rounded-xl border border-line bg-surface-2 p-3.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-fg">{cls?.name ?? error.classId}</span>
                    <span className="text-xs text-fg-subtle">
                      {SECTION_BY_ID[error.section].shortName} ·{' '}
                      {new Date(error.at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{error.note}</p>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => dispatch({ type: 'execError/remove', id: error.id })}
                  >
                    Xóa
                  </Button>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
