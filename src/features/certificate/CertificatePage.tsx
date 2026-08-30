import { useMemo, useState } from 'react';
import { SECTIONS, SECTION_BY_ID } from '../../config';
import {
  CERT_DISCLAIMER,
  CERT_LEVELS,
  CERT_MAX_SCORE,
  EXAM_RULES,
  certificateCode,
  gradeCertification,
  sectionMax,
  type SectionScoreInput,
} from '../../data/certification';
import { cn } from '../../lib/cn';
import { formatNumber } from '../../lib/format';
import { navigate } from '../../lib/router';
import { displayNameOf } from '../../lib/storage';
import { useAppState } from '../../store/AppStore';
import { GitaMark } from '../../brand/Logo';
import { DocumentShell } from '../../components/DocumentShell';
import { Badge, Button, Card, CardHeader, Progress, Stat } from '../../components/ui/primitives';

/**
 * KY THI CAP CHUNG CHI
 *
 * Van de that ma no giai: mot hoc vien on tam thang van khong biet minh dang o
 * dau. Diem cac buoi luyen len xuong that thuong, va cau hoi "minh co on khong"
 * khong co cau tra loi nao ngoai cam giac. Nguoi hoc buoc vao phong thi that
 * lan dau voi mot thu duy nhat: hy vong.
 *
 * Man hinh nay bien cam giac thanh BANG CHUNG — va lam viec do ma khong phong
 * dai mot chu nao. Dong tuyen bo gioi han duoc in tren chinh chung chi, khong
 * giau o chan trang: day la chung chi cua HSA365, khong phai cua DHQGHN. Mot
 * to giay noi qua ve chinh no se lam hong niem tin vao moi thu con lai.
 */
export function CertificatePage() {
  const state = useAppState();
  const name = displayNameOf(state.profile);

  const latest = state.results[state.results.length - 1];
  const [manual, setManual] = useState<Record<string, number>>({});

  const sections: SectionScoreInput[] = useMemo(
    () =>
      SECTIONS.map((spec) => {
        const fromResult = latest?.sections.find((s) => s.section === spec.id)?.score;
        const value = manual[spec.id] ?? fromResult ?? 0;
        return { section: spec.id, score: Math.round(value) };
      }),
    [latest, manual],
  );

  const result = useMemo(() => gradeCertification(sections), [sections]);
  const issuedAt = latest?.submittedAt ?? Date.now();
  const code = certificateCode(name, result.total, issuedAt);

  return (
    <div className="space-y-6">
      <header className="no-print">
        <Badge tone="brand">Sát hạch</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Kỳ thi cấp chứng chỉ HSA365</h1>
        <p className="mt-2 max-w-3xl text-sm text-fg-muted">
          Một học viên ôn tám tháng vẫn có thể không biết mình đang ở đâu — điểm các buổi luyện lên
          xuống thất thường, và câu hỏi "mình có ổn không" không có câu trả lời nào ngoài cảm giác.
          Kỳ sát hạch này biến cảm giác đó thành <strong className="text-fg">bằng chứng đo được</strong>,
          trước khi bạn bước vào phòng thi thật.
        </p>
      </header>

      <Card className="no-print">
        <CardHeader
          title="Kết quả hiện tại"
          subtitle="Xếp bậc theo kết quả đề gần nhất, hoặc thử điều chỉnh để xem mỗi bậc cần bao nhiêu."
          action={
            result.level ? (
              <Button variant="primary" onClick={() => window.print()}>
                In chứng chỉ
              </Button>
            ) : (
              <Button variant="primary" onClick={() => navigate('/exam')}>
                Vào làm đề đủ 150 câu
              </Button>
            )
          }
        />

        {latest ? (
          <p className="text-sm text-fg-muted">
            Đang xếp bậc theo kết quả đề gần nhất của bạn. Muốn xem thử mức nào cần bao nhiêu điểm,
            chỉnh trực tiếp ba ô bên dưới.
          </p>
        ) : (
          <p className="text-sm text-fg-muted">
            Bạn chưa làm đề đủ 150 câu nào. Có thể nhập thử điểm ba phần để xem mình sẽ đạt bậc nào —
            nhưng chứng chỉ chỉ được cấp từ một bài làm thật.
          </p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {SECTIONS.map((spec) => {
            const value = sections.find((s) => s.section === spec.id)?.score ?? 0;
            return (
              <label key={spec.id} className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-fg">{spec.shortName}</span>
                <input
                  type="range"
                  min={0}
                  max={sectionMax(spec.id)}
                  value={value}
                  onChange={(e) => setManual((m) => ({ ...m, [spec.id]: Number(e.target.value) }))}
                  className="accent-brand"
                  aria-label={`Điểm phần ${spec.shortName}`}
                />
                <span className="tabular-nums text-xs text-fg-muted">
                  {value}/{sectionMax(spec.id)}
                </span>
              </label>
            );
          })}
        </div>
      </Card>

      <Card className="no-print">
        <CardHeader
          title="Quy chế kỳ sát hạch"
          subtitle="Mỗi điều đều kèm lý do. Một quy chế không giải thích được lý do sẽ bị coi là làm khó dễ và bị tìm cách lách."
        />
        <ol className="space-y-3">
          {EXAM_RULES.map((rule, i) => (
            <li key={rule.rule} className="flex gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-soft text-xs font-semibold text-brand">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="font-medium text-fg">{rule.rule}</span>
                <span className="mt-0.5 block text-fg-muted">{rule.why}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="no-print">
        <CardHeader
          title="Bốn bậc chứng chỉ"
          subtitle="Mỗi bậc yêu cầu CẢ tổng điểm LẪN điểm sàn từng phần — không cho bù trừ giữa các phần, vì đề thật cũng không cho."
        />
        <div className="space-y-2">
          {CERT_LEVELS.map((level) => {
            const reached = result.level?.id === level.id;
            const passedTotal = result.total >= level.minScore;
            const passedFloor = sections.every((s) => s.score >= level.minPerSection);
            return (
              <div
                key={level.id}
                className={cn(
                  'rounded-xl border p-4',
                  reached ? 'border-brand bg-brand-soft' : 'border-line bg-surface-2',
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
                    <span
                      className="size-3 rounded-full"
                      style={{ background: level.colorToken }}
                      aria-hidden="true"
                    />
                    {level.name}
                  </h3>
                  <p className="text-xs text-fg-muted">
                    Cần {level.minScore}/{CERT_MAX_SCORE} và tối thiểu {level.minPerSection} mỗi phần{' '}
                    {reached && <Badge tone="ok">Đang đạt</Badge>}
                    {!reached && passedTotal && !passedFloor && (
                      <Badge tone="warn">Đủ tổng, thiếu điểm sàn</Badge>
                    )}
                  </p>
                </div>
                <p className="mt-1.5 text-sm text-fg-muted">{level.meaning}</p>
                {reached && (
                  <p className="mt-2 rounded-lg bg-surface p-2 text-xs text-fg-muted">
                    <strong className="text-fg">Việc tiếp theo:</strong> {level.nextStep}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {result.next && (
          <p className="mt-4 rounded-lg border border-brand-line bg-brand-soft p-3 text-sm text-fg-muted">
            <strong className="text-fg">Để lên bậc {result.next.name}:</strong>{' '}
            {result.blockingSection
              ? `phần ${SECTION_BY_ID[result.blockingSection].shortName} đang kéo cả kết quả xuống — cần ít nhất ${result.next.minPerSection} điểm ở phần đó.`
              : `còn thiếu ${result.pointsToNext} điểm tổng.`}
          </p>
        )}
      </Card>

      {result.level && (
        <DocumentShell
          kind="BC"
          code={code}
          title="Chứng chỉ năng lực HSA365"
          headingLevel="h2"
          subtitle={`Bậc ${result.level.name}`}
          meta={
            <>
              {new Date(issuedAt).toLocaleDateString('vi-VN')}
              <br />
              Mã tra cứu
            </>
          }
        >
          <section className="doc-block text-center">
            <GitaMark className="mx-auto h-14 w-auto" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-fg-subtle">Chứng nhận</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-fg">{name}</p>
            <p className="mt-3 text-sm text-fg-muted">
              đã hoàn thành kỳ sát hạch năng lực theo cấu trúc đề thi Đánh giá năng lực HSA của
              ĐHQGHN và đạt
            </p>
            <p className="mt-3 text-3xl font-bold tracking-tight" style={{ color: result.level.colorToken }}>
              Bậc {result.level.name}
            </p>
            <p className="mt-2 text-sm text-fg-muted">
              {formatNumber(result.total)}/{CERT_MAX_SCORE} điểm
            </p>
          </section>

          <section className="doc-block">
            <h2 className="text-sm font-semibold text-fg">Điểm thành phần</h2>
            <div className="mt-3 space-y-3">
              {sections.map((s) => (
                <div key={s.section}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-fg">{SECTION_BY_ID[s.section].name}</span>
                    <span className="tabular-nums text-fg-muted">
                      {s.score}/{sectionMax(s.section)}
                    </span>
                  </div>
                  <Progress
                    value={s.score}
                    max={sectionMax(s.section)}
                    label={`Điểm phần ${SECTION_BY_ID[s.section].shortName}`}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="doc-block grid gap-4 sm:grid-cols-2">
            <Stat label="Mã tra cứu" value={code} hint="Đọc được qua điện thoại, không có ký tự dễ nhầm" />
            <Stat label="Bậc đạt được" value={result.level.name} tone="brand" hint={result.level.meaning} />
          </section>

          <section className="doc-block">
            <h2 className="text-sm font-semibold text-fg">Việc tiếp theo</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{result.level.nextStep}</p>
          </section>

          <p className="rounded-lg border border-line bg-surface-2 p-3 text-xs leading-relaxed text-fg-muted">
            {CERT_DISCLAIMER}
          </p>
        </DocumentShell>
      )}
    </div>
  );
}
