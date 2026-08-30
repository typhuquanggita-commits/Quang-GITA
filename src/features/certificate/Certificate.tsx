/**
 * The certificate, and the page that explains why it was or was not issued.
 *
 * A refusal gets as much of this screen as an award, and more of the words.
 * A candidate told only "not yet" learns nothing; a candidate told that their
 * score reached the band but its measurement interval did not, and that one
 * further sitting above a stated figure would settle it, has been given
 * something to do.
 *
 * The standard is published on the same page as the result. A learner should
 * be able to read what each band means before sitting, decide the certificate
 * is worth having, and check afterwards that the rule applied to them is the
 * rule they read.
 */

import React, { useMemo } from 'react';
import {
  SAT365_SCHEME,
  certify,
  describeVerification,
  isCurrent,
  type CertificationResult,
} from '../../engine/certification.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card } from '../../components/ui/primitives.tsx';
import { DocumentFrame } from '../../brand/DocumentFrame.tsx';
import { GitaMark } from '../../brand/Brandmark.tsx';
import { IconAlert, IconCheck, IconPrint, IconTarget } from '../../components/ui/icons.tsx';
import { formatDate, isoDate } from '../../lib/util.ts';

const STATUS_TONE: Record<CertificationResult['status'], 'good' | 'hold' | 'none'> = {
  awarded: 'good',
  'held-at-lower-band': 'good',
  'below-lowest-band': 'none',
  'insufficient-evidence': 'none',
  'unreliable-form': 'hold',
  'integrity-hold': 'hold',
};

const STATUS_LABEL: Record<CertificationResult['status'], { en: string; vi: string }> = {
  awarded: { en: 'Awarded', vi: 'Đã cấp' },
  'held-at-lower-band': { en: 'Awarded at the lower band', vi: 'Cấp ở bậc thấp hơn' },
  'below-lowest-band': { en: 'Not yet certified', vi: 'Chưa đủ để cấp' },
  'insufficient-evidence': { en: 'Not enough evidence', vi: 'Chưa đủ bằng chứng' },
  'unreliable-form': { en: 'Held — the form was not precise enough', vi: 'Tạm giữ — đề chưa đủ chính xác' },
  'integrity-hold': { en: 'Held for review', vi: 'Tạm giữ để rà soát' },
};

export function Certificate(): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, audit } = useStore();
  const scheme = SAT365_SCHEME;

  const result = useMemo(
    () => certify({ scheme, attempts: state.attempts }),
    [scheme, state.attempts],
  );

  const verification = describeVerification(scheme);
  const awarded = result.band !== null && result.serial !== null;

  const limits = vi
    ? scheme.disclaimerVi
    : scheme.disclaimer;

  return (
    <div className="page stack gap-5">
      <header className="page-head no-print">
        <h1 className="page-title">{vi ? 'Chứng nhận năng lực' : 'Certificate of readiness'}</h1>
        <p className="page-sub">
          {vi
            ? 'Một chuẩn nội bộ, cấp theo bậc năng lực chứ không theo thứ hạng. Toàn bộ quy tắc xét cấp nằm ngay trên trang này — đọc được trước khi thi, kiểm được sau khi thi.'
            : 'An internal standard, awarded by what a holder can do rather than by rank. The whole awarding rule is on this page — readable before sitting, checkable afterwards.'}
        </p>
      </header>

      {/* ---- The result ---- */}
      <Card
        className="no-print"
        title={vi ? 'Kết quả xét cấp' : 'The awarding decision'}
        action={
          awarded && (
            <Button
              onClick={() => {
                audit({ action: 'report.exported', detail: `certificate ${result.serial}` });
                window.print();
              }}
            >
              <IconPrint size={15} /> {vi ? 'In chứng nhận' : 'Print the certificate'}
            </Button>
          )
        }
      >
        <div className="stack gap-4">
          <div className="row gap-3 wrap" style={{ alignItems: 'center' }}>
            <Badge
              tone={
                STATUS_TONE[result.status] === 'good'
                  ? 'success'
                  : STATUS_TONE[result.status] === 'hold'
                    ? 'warning'
                    : 'default'
              }
            >
              {vi ? STATUS_LABEL[result.status].vi : STATUS_LABEL[result.status].en}
            </Badge>
            {result.band && (
              <strong className="text-xl">{vi ? result.band.nameVi : result.band.name}</strong>
            )}
            {result.score !== null && (
              <span className="muted">
                {result.score} ± {result.sem} ({result.interval![0]}–{result.interval![1]})
              </span>
            )}
          </div>

          <ul className="report-limits">
            {result.reasons.map((reason) => (
              <li key={reason.en}>
                {STATUS_TONE[result.status] === 'good' ? <IconCheck size={15} /> : <IconAlert size={15} />}
                <span>{vi ? reason.vi : reason.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* ---- The standard ---- */}
      <Card
        className="no-print"
        title={vi ? 'Bậc năng lực và điều kiện' : 'The bands, and what they require'}
        subtitle={
          vi
            ? 'Mô tả theo việc người cầm chứng nhận LÀM ĐƯỢC gì, không theo thứ hạng so với ai. Một lớp cùng tiến bộ thì cùng lên bậc — thứ hạng không diễn đạt được điều đó.'
            : 'Described by what the holder can do, never by rank. A cohort that all improves should all move up a band, and a percentile cannot express that.'
        }
      >
        <div className="stack gap-4">
          {scheme.bands.map((band) => (
            <div
              key={band.id}
              className="cert-band"
              data-current={band.id === result.band?.id || undefined}
            >
              <div className="between wrap gap-3">
                <strong>{vi ? band.nameVi : band.name}</strong>
                <Badge>{band.minScore}+</Badge>
              </div>
              <ul className="cert-descriptors">
                {band.descriptors.map((d) => (
                  <li key={d.en}>{vi ? d.vi : d.en}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="escalation" data-severity="info">
            <IconTarget size={18} />
            <div>
              <strong>{vi ? 'Vì sao chuẩn này khó đạt hơn một con số' : 'Why this is harder than a number'}</strong>
              <p>
                {vi
                  ? `Bậc chỉ được cấp khi KHOẢNG SAI SỐ của điểm nằm trọn trên mốc, không phải khi điểm số chạm mốc. Thí sinh được ${scheme.bands[1].minScore - 2} với sai số ±30 thì bằng chứng vẫn tương thích với ${scheme.bands[1].minScore - 32} — chưa chứng minh được chuẩn đó. Ngoài ra còn cần: một lượt thi trọn vẹn (đề lẻ một phần không tính), đề có độ tin cậy từ ${scheme.minReliability.toFixed(2)} trở lên, và nhật ký giám sát không có khoảng vắng mặt quá ${scheme.maxAwaySeconds} giây.`
                  : `A band is awarded when the score's measurement interval lies wholly above the boundary, not when the score touches it. A candidate on ${scheme.bands[1].minScore - 2} with an error of ±30 has evidence consistent with ${scheme.bands[1].minScore - 32}, which does not demonstrate the standard. Also required: a full-length sitting (a section paper does not certify), a delivered form reliable to at least ${scheme.minReliability.toFixed(2)}, and an integrity log with no absence beyond ${scheme.maxAwaySeconds} seconds.`}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ---- The certificate ---- */}
      {awarded && (
        <DocumentFrame
          kind={vi ? 'Chứng nhận' : 'Certificate'}
          title={vi ? scheme.nameVi : scheme.name}
          pillar="talent"
          subject={state.profile.name}
          date={formatDate(result.issuedOn ?? isoDate(), locale)}
          reference={result.serial ?? undefined}
          locale={locale}
          limits={limits}
        >
          <div className="certificate">
            <GitaMark height={56} title="" />
            <p className="certificate-preamble">
              {vi ? 'Chứng nhận rằng' : 'This certifies that'}
            </p>
            <p className="certificate-name">{state.profile.name}</p>
            <p className="certificate-preamble">
              {vi
                ? 'đã đạt chuẩn nội bộ SAT365 ở bậc'
                : 'has met the internal SAT365 standard at the level of'}
            </p>
            <p className="certificate-band">{vi ? result.band!.nameVi : result.band!.name}</p>

            <dl className="certificate-facts">
              <div>
                <dt>{vi ? 'Điểm và khoảng sai số' : 'Score and measurement interval'}</dt>
                <dd>
                  {result.score} ({result.interval![0]}–{result.interval![1]}), ±{result.sem}
                </dd>
              </div>
              <div>
                <dt>{vi ? 'Độ tin cậy của đề đã phát' : 'Reliability of the delivered form'}</dt>
                <dd>{result.reliability?.toFixed(2)}</dd>
              </div>
              <div>
                <dt>{vi ? 'Ngày cấp' : 'Issued'}</dt>
                <dd>{formatDate(result.issuedOn!, locale)}</dd>
              </div>
              <div>
                <dt>{vi ? 'Có giá trị đến' : 'Valid until'}</dt>
                <dd>
                  {formatDate(result.expiresOn!, locale)}
                  {!isCurrent(result) && (
                    <Badge tone="danger">{vi ? 'Đã hết hạn' : 'Expired'}</Badge>
                  )}
                </dd>
              </div>
              <div>
                <dt>{vi ? 'Mã tra cứu' : 'Verification code'}</dt>
                <dd className="certificate-serial">{result.serial}</dd>
              </div>
            </dl>

            <div className="certificate-descriptors">
              <strong>{vi ? 'Bậc này chứng nhận rằng người cầm:' : 'This level certifies that the holder:'}</strong>
              <ul>
                {result.band!.descriptors.map((d) => (
                  <li key={d.en}>{vi ? d.vi : d.en}</li>
                ))}
              </ul>
            </div>

            <p className="certificate-verify">{vi ? verification.vi : verification.en}</p>
          </div>
        </DocumentFrame>
      )}
    </div>
  );
}
