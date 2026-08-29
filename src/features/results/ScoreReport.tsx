/**
 * Score report.
 *
 * Reports a score the way a testing programme should: the scaled figure, the
 * measurement error around it, what it means against a published benchmark,
 * and the evidence underneath — never a bare number presented as exact.
 */

import React from 'react';
import type { Attempt } from '../../types.ts';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { domainLabel, sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { summariseIntegrity } from '../exam/useProctor.ts';
import { levelForScore, studentLevelLabel } from '../../auth/roles.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Ring } from '../../components/ui/primitives.tsx';
import { MasteryBars, PacingChart } from '../../components/charts/charts.tsx';
import { IconCheck, IconAlert, IconPrint, IconDownload } from '../../components/ui/icons.tsx';
import { download, formatClock, formatDate, isoDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

export function ScoreReport({
  attemptId,
  navigate,
}: {
  attemptId: string;
  navigate(route: Route): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, allows, audit } = useStore();

  const attempt = state.attempts.find((a) => a.id === attemptId);
  const report = attempt?.score;

  if (!attempt || !report) {
    return (
      <div className="page">
        <Empty
          title={locale === 'vi' ? 'Không tìm thấy báo cáo' : 'Report not found'}
          action={<Button onClick={() => navigate({ name: 'tests' })}>{t('nav.tests')}</Button>}
        />
      </div>
    );
  }

  const bothSections = report.sections.length === 2;
  const level = levelForScore(report.total);
  const integrity = summariseIntegrity(attempt.integrity);

  const wrongQuestions = Object.values(attempt.responses)
    .filter((r) => r.correct === false)
    .map((r) => QUESTION_BY_ID.get(r.questionId))
    .filter(Boolean);

  function exportReport() {
    download(
      `sat365-report-${attemptId}.json`,
      JSON.stringify({ attempt, report, generatedAt: new Date().toISOString() }, null, 2),
    );
    if (allows('report.export')) audit({ action: 'report.exported', targetId: attemptId });
  }

  return (
    <div className="page stack gap-6">
      <header className="page-head no-print">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{t('result.title')}</h1>
            <p className="page-sub">
              {attempt.label} · {formatDate(isoDate(new Date(attempt.submittedAt ?? attempt.startedAt)), locale)}
            </p>
          </div>
          <div className="row gap-2">
            <Button onClick={() => window.print()}>
              <IconPrint size={15} />
              {t('common.print')}
            </Button>
            <Button onClick={exportReport}>
              <IconDownload size={15} />
              {t('result.downloadReport')}
            </Button>
          </div>
        </div>
      </header>

      {/* ---- Headline ---- */}
      <div className="score-hero">
        <div className="center">
          <Ring
            value={Math.min(1, (report.total - 400) / 1200)}
            size={210}
            stroke={16}
            label={bothSections ? report.total : '—'}
            sublabel={t('result.scale')}
          />
        </div>

        <div className="stack gap-4">
          <div className="row gap-3 wrap">
            <Badge tone="primary">{studentLevelLabel(level, locale)}</Badge>
            {bothSections && <Badge tone="info">{t('result.percentile')} {report.percentile}</Badge>}
          </div>

          <div>
            <div className="text-sm muted">{t('result.band')}</div>
            <div className="text-lg semibold">
              {report.totalBand[0]} – {report.totalBand[1]}
            </div>
            <p className="text-sm muted" style={{ marginTop: 'var(--space-2)', maxWidth: '52ch' }}>
              {locale === 'vi'
                ? 'Khoảng ±1 sai số chuẩn đo lường. Điểm thi lại trong cùng điều kiện thường rơi vào khoảng này — con số đơn lẻ không bao giờ là tuyệt đối.'
                : 'A ±1 standard-error band. A retest under the same conditions typically falls inside it — a single number is never exact.'}
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {report.sections.map((section) => {
              const benchmark = report.benchmarks.find((b) => b.section === section.section);
              return (
                <div className="section-score-card" key={section.section}>
                  <div className="text-xs muted semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {sectionLabel(section.section, locale)}
                  </div>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.03em' }}>
                    {section.scaled}
                  </div>
                  <div className="text-xs muted">± {section.sem}</div>
                  <div style={{ marginTop: 'var(--space-2)' }}>
                    {benchmark?.met ? (
                      <span className="badge badge-success">
                        <IconCheck size={12} /> {t('result.benchmarkMet')}
                      </span>
                    ) : (
                      <span className="badge badge-warning">
                        <IconAlert size={12} /> {t('result.benchmarkNotMet')} ({benchmark?.benchmark})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- Section detail ---- */}
      {report.sections.map((section) => (
        <Card
          key={section.section}
          title={sectionLabel(section.section, locale)}
          subtitle={`${t('result.raw')}: ${section.rawCorrect}/${section.operationalCount} · θ = ${section.theta.toFixed(2)}`}
          action={
            <Badge tone={section.pathway === 'upper' ? 'success' : 'warning'}>
              {t('result.pathway')}: {section.pathway === 'upper' ? t('result.pathway.upper') : t('result.pathway.lower')}
            </Badge>
          }
        >
          <div className="stack gap-6">
            <div>
              <h4 className="text-sm semibold muted" style={{ marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t('result.byDomain')}
              </h4>
              <MasteryBars
                rows={section.domains.map((domain) => ({
                  label: domainLabel(domain.domain, locale),
                  value: domain.mastery,
                  meta: `${domain.correct}/${domain.attempted} ${t('common.correct').toLowerCase()}`,
                }))}
              />
            </div>

            {section.skills.length > 0 && (
              <div>
                <h4 className="text-sm semibold muted" style={{ marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {t('result.mastery')}
                </h4>
                <MasteryBars
                  rows={[...section.skills]
                    .sort((a, b) => a.mastery - b.mastery)
                    .map((skill) => ({
                      label: skillLabel(skill.skill, locale),
                      value: skill.mastery,
                      meta: `${skill.correct}/${skill.attempted} · ${formatClock(skill.meanSeconds)}/${locale === 'vi' ? 'câu' : 'q'}`,
                    }))}
                />
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* ---- Pacing ---- */}
      <Card title={t('result.pacing')}>
        <PacingChart
          description={t('a11y.chart', { desc: t('result.pacing') })}
          rows={report.pacing.map((pace) => ({
            label: sectionLabel(pace.section, locale),
            actual: pace.medianSeconds,
            target: pace.targetSeconds,
          }))}
        />
        <div className="row gap-6 wrap text-sm" style={{ marginTop: 'var(--space-4)' }}>
          {report.pacing.map((pace) => (
            <div key={pace.section}>
              <span className="muted">{sectionLabel(pace.section, locale)}: </span>
              <span className="semibold">{pace.rushedCount}</span> {t('result.rushed').toLowerCase()}
              {' · '}
              <span className="semibold">{pace.overrunCount}</span> {t('result.overrun').toLowerCase()}
            </div>
          ))}
        </div>
      </Card>

      {/* ---- Integrity ---- */}
      {attempt.integrity.length > 0 && (
        <Card
          title={locale === 'vi' ? 'Báo cáo tính toàn vẹn' : 'Integrity report'}
          subtitle={
            locale === 'vi'
              ? 'Các sự kiện quan sát được trong lúc thi. Đây là ghi nhận khách quan, không phải kết luận về hành vi.'
              : 'Events observed during delivery. This is an objective record, not a conclusion about conduct.'
          }
        >
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <Stat label={locale === 'vi' ? 'Rời cửa sổ' : 'Window blurs'} value={integrity.blurCount} />
            <Stat label={locale === 'vi' ? 'Thoát toàn màn hình' : 'Fullscreen exits'} value={integrity.fullscreenExits} />
            <Stat label={locale === 'vi' ? 'Thao tác bị chặn' : 'Blocked actions'} value={integrity.blockedActions} />
            <Stat
              label={locale === 'vi' ? 'Tổng thời gian rời màn hình' : 'Total time away'}
              value={formatClock(integrity.totalAwaySeconds)}
            />
          </div>
        </Card>
      )}

      {wrongQuestions.length > 0 && (
        <div className="row no-print">
          <Button variant="primary" onClick={() => navigate({ name: 'review' })}>
            {t('result.reviewMistakes')} ({wrongQuestions.length})
          </Button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }): React.ReactElement {
  return (
    <div>
      <div className="text-xs muted semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>{value}</div>
    </div>
  );
}

export type { Attempt };
